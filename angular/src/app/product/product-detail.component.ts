import { AuthService, PagedResultDto } from '@abp/ng.core';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../proxy/products/products.service';
import { ProductDto } from '@proxy/products';
import { forkJoin, Subject, take, takeUntil } from 'rxjs';
import { ProductCategoriesService, ProductCategoryInListDto } from '@proxy/product-categories';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManufacturersService } from '../proxy/manufacturers/manufacturers.service';
import { ManufacturerInListDto } from '@proxy/manufacturers';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UtilityService } from '../shared/services/utility.service';
import { ProductType, productTypeOptions } from '@proxy/tedu-ecommerce/products';
import { NotificationService } from '../shared/services/notification.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  blockedPanel: boolean = false;
  btnDisabled = false;
  public form: FormGroup;
  public thumbnailImage;

  //Dropdown
  productCategories: any[] = [];
  manufacturers: any[] = [];
  productTypes: any[] = [];
  selectedEntity = {} as ProductDto;

  constructor(
    private productService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
    private manufacturersService: ManufacturersService,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private utilityService: UtilityService,
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  validationMessages = {
    code: [
      {
        type: 'required',
        message: 'Bạn phải nhập mã sản phẩm duy nhất',
      },
    ],
    name: [
      {
        type: 'required',
        message: 'Bạn phải nhập tên nhóm',
      },
      {
        type: 'maxlength',
        message: 'Bạn không được nhập quá 255 ký tự',
      },
    ],
    slug: [
      {
        type: 'required',
        message: 'Bạn phải nhập URL duy nhất',
      },
    ],
    sku: [
      {
        type: 'required',
        message: 'Bạn phải nhập SKU cho sản phẩm',
      },
    ],
    manufacturerId: [
      {
        type: 'required',
        message: 'Bạn phải chọn nhà cung cấp',
      },
    ],
    categoryId: [
      {
        type: 'required',
        message: 'Bạn phải chọn danh mục cho khoá học',
      },
    ],
    productType: [
      {
        type: 'required',
        message: 'Bạn phải chọn loại sản phẩm',
      },
    ],
    sortOrder: [
      {
        type: 'required',
        message: 'Bạn phải nhập thứ tự',
      },
    ],
    sellPrice: [
      {
        type: 'required',
        message: 'Bạn phải nhập giá bán',
      },
    ],
  };

  ngOnInit(): void {
    this.buildForm();
    this.loadProductType();
    this.initFormData();
  }

  generateSlug() {
    this.form.controls['slug'].setValue(
      this.utilityService.MakeSeoTitle(this.form.get('name').value)
    );
  }

  initFormData() {
    //load data to form
    let productCategories = this.productCategoriesService.getListAll();
    let manufacturers = this.manufacturersService.getListAll();
    this.toggleBlockUI(true);
    forkJoin({
      productCategories,
      manufacturers,
    })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: any) => {
          //Push data to dropdown
          let productCategories = response.productCategories as ProductCategoryInListDto[];
          let manufacturers = response.manufacturers as ManufacturerInListDto[];
          productCategories.forEach(element => {
            this.productCategories.push({
              value: element.id,
              label: element.name,
            });
          });
          manufacturers.forEach(element => {
            this.manufacturers.push({
              value: element.id,
              label: element.name,
            });
          });
          //Load edit data to form
          if (this.utilityService.isEmpty(this.config.data?.id) == true) {
            this.getNewSuggestionCode();
            this.toggleBlockUI(false);
          } else {
            this.loadFormDetail(this.config.data?.id);
          }
        },
        error: err => {
          this.notificationService.showError(err.message);

          this.toggleBlockUI(false);
        },
      });
  }

  getNewSuggestionCode() {
    this.productService
      .getSuggestNewCode()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: string) => {
          this.form.patchValue({
            code: response,
          });
        },
        error: () => {},
      });
  }

  loadFormDetail(id: string) {
    this.toggleBlockUI(true);
    this.productService
      .get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: ProductDto) => {
          this.selectedEntity = response;
          this.loadThumbnail(this.selectedEntity.thumbnailPicture);
          this.buildForm();
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  saveChange() {
    this.toggleBlockUI(true);
    if (this.utilityService.isEmpty(this.config.data?.id) == true) {
      this.productService
        .create(this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            this.toggleBlockUI(false);
            this.ref.close(this.form.value);
          },
          error: () => {
            this.toggleBlockUI(false);
          },
        });
    } else {
      this.productService
        .update(this.config.data?.id, this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            this.toggleBlockUI(false);
            this.ref.close(this.form.value);
          },
          error: err => {
            this.notificationService.showError(err.message);
            this.toggleBlockUI(false);
          },
        });
    }
  }
  loadProductType() {
    productTypeOptions.forEach(element => {
      this.productTypes.push({
        value: element.value,
        label: element.key,
      });
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      name: new FormControl(
        this.selectedEntity.name || null,
        Validators.compose([Validators.required, Validators.maxLength(250)])
      ),
      code: new FormControl(this.selectedEntity.code || null, Validators.required),
      slug: new FormControl(this.selectedEntity.slug || null, Validators.required),
      sku: new FormControl(this.selectedEntity.sku || null, Validators.required),
      manufacturerId: new FormControl(
        this.selectedEntity.manufacturerId || null,
        Validators.required
      ),
      categoryId: new FormControl(this.selectedEntity.categoryId || null, Validators.required),
      productType: new FormControl(this.selectedEntity.productType || null, Validators.required),
      sortOrder: new FormControl(this.selectedEntity.sortOrder || null, Validators.required),
      sellPrice: new FormControl(this.selectedEntity.sellPrice || null, Validators.required),
      thumbnailPicture: new FormControl(
        this.selectedEntity.thumbnailPicture || null,
        Validators.required
      ),
      visibility: new FormControl(this.selectedEntity.visibility || true),
      isActive: new FormControl(this.selectedEntity.isActive || true),
      seoMetaDescription: new FormControl(this.selectedEntity.seoMetaDescription || null),
      description: new FormControl(this.selectedEntity.description || null),
      thumbnailPictureName: new FormControl(this.selectedEntity.description || null),
      thumbnailPictureContent: new FormControl(null),
    });
  }

  loadThumbnail(fileName: string) {
    this.productService
      .getThumbnailImage(fileName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: string) => {
          var fileExt = this.selectedEntity.thumbnailPicture?.split('.').pop();
          this.thumbnailImage = this.sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/${fileExt};base64, ${response}`
          );
        },
      });
  }

  getProductTypeName(value: number) {
    return ProductType[value];
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled === true) {
      this.blockedPanel = true;
      this.btnDisabled = true;
    } else {
      setTimeout(() => {
        this.blockedPanel = false;
        this.btnDisabled = false;
      }, 1000);
    }
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.patchValue({
          thumbnailPictureName: file.name,
          thumbnailPictureContent: reader.result,
        });
        this.cd.markForCheck();
      };
    }
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

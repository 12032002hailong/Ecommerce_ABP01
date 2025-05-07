import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManufacturerDto, ManufacturersService } from '@proxy/catalog/manufacturers';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { ProductCategoriesService, ProductCategoryDto } from '@proxy/catalog/product-categories';

@Component({
  selector: 'app-manufacture-detail',
  templateUrl: './category-detail.component.html',
})
export class ProductCategoryDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  blockedPanel: boolean = false;
  btnDisabled = false;
  public form: FormGroup;
  public thumbnailImage: any;

  //Dropdown
  selectedEntity = {} as ProductCategoryDto;

  constructor(
    private productCategoriesService: ProductCategoriesService,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private notificationService: NotificationService,
    private utilService: UtilityService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.initFormData();
  }

  validationMessages = {
    name: [
      { type: 'required', message: 'Bạn phải nhập tên' },
      { type: 'maxlength', message: 'Bạn không được nhập quá 255 kí tự' },
    ],
    code: [{ type: 'required', message: 'Bạn phải nhập mã duy nhất' }],
    slug: [{ type: 'required', message: 'Bạn phải nhập mã duy nhất' }],
    sortOrder: [{ type: 'required', message: 'Bạn phải nhập thứ tự sắp xếp' }],
    coverPicture: [{ type: 'required', message: 'Bạn phải nhập thứ tự sắp xếp' }],
    visibility: [{ type: 'required', message: 'Bạn phải nhập mã duy nhất' }],
    isActive: [{ type: 'required', message: 'Bạn phải nhập mã duy nhất' }],
    parentId: [{ type: 'required', message: 'Bạn phải nhập mã duy nhất' }],
    seoMetaDescription: [{ type: 'required', message: 'Bạn phải nhập mã duy nhất' }],
  };

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.blockedPanel = true;
      this.btnDisabled = true;
    } else {
      setTimeout(() => {
        this.blockedPanel = false;
        this.btnDisabled = false;
      }, 1000);
    }
  }

  generateSlug() {
    this.form.controls['slug'].setValue(this.utilService.MakeSeoTitle(this.form.get('name').value));
  }

  initFormData() {
    //Load data to form
    if (this.utilService.isEmpty(this.config.data?.id) == true) {
      this.toggleBlockUI(false);
    } else {
      this.loadFormDetails(this.config.data?.id);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      name: new FormControl(this.selectedEntity.name || null, Validators.required),
      code: new FormControl(this.selectedEntity.code || null, Validators.required),
      slug: new FormControl(this.selectedEntity.slug || null, Validators.required),
      sortOrder: new FormControl(this.selectedEntity.sortOrder || null, Validators.required),
      coverPicture: new FormControl(this.selectedEntity.coverPicture || null, Validators.required),
      visibility: new FormControl(this.selectedEntity.visibility || null, Validators.required),
      isActive: new FormControl(this.selectedEntity.isActive || null, Validators.required),
      parentId: new FormControl(this.selectedEntity.parentId || null, Validators.required),
      seoMetaDescription: new FormControl(
        this.selectedEntity.seoMetaDescription || null,
        Validators.required
      ),
    });
  }

  loadFormDetails(id: string) {
    this.toggleBlockUI(true);
    this.productCategoriesService
      .get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: ProductCategoryDto) => {
          this.selectedEntity = response;
          this.buildForm();
          console.log(this.selectedEntity);
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  saveChange() {
    this.toggleBlockUI(true);

    if (this.utilService.isEmpty(this.config.data?.id) == true) {
      this.productCategoriesService
        .create(this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            this.toggleBlockUI(false);
            this.ref.close(this.form.value);
          },
          error: error => {
            this.notificationService.showError(error.error.error.message);
            this.toggleBlockUI(false);
          },
        });
    } else {
      this.productCategoriesService
        .update(this.config.data?.id, this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            this.toggleBlockUI(false);
            this.ref.close(this.form.value);
          },
          error: err => {
            this.notificationService.showError(err.error.error.message);
            this.toggleBlockUI(false);
          },
        });
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

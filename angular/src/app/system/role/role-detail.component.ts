import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { RolesService } from '../../proxy/system/roles/roles.service';
import { RoleDto } from '../../proxy/system/roles/models';

@Component({
  templateUrl: 'role-detail.component.html',
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  // Default
  public blockedPanelDetail: boolean = false;
  public form: FormGroup;
  public title: string;
  public btnDisabled = false;
  public saveBtnName: string = 'Thêm mới';
  public closeBtnName: string;
  selectedEntity = {} as RoleDto;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private roleService: RolesService,
    public authService: AuthService,
    private utilService: UtilityService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    if (this.utilService.isEmpty(this.config.data.id) == false) {
      this.loadDetail(this.config.data.id);
      this.saveBtnName = 'Cập nhật';
      this.closeBtnName = 'Hủy';
    } else {
      this.saveBtnName = 'Thêm';
      this.closeBtnName = 'Đóng';
    }
  }

  buildForm() {
    this.form = this.fb.group({
      name: new FormControl(
        this?.selectedEntity?.name || null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3),
        ])
      ),
      description: new FormControl(this?.selectedEntity?.description || null),
    });
  }

  // Validate
  noSpecial: RegExp = /^[^<>*!_~]+$/;
  validationMessages = {
    name: [
      { type: 'required', message: 'Bạn phải nhập tên nhóm' },
      { type: 'minlength', message: 'Bạn phải nhập ít nhất 3 kí tự' },
      { type: 'maxlength', message: 'Bạn không được nhập quá 255 kí tự' },
    ],
    description: [{ type: 'required', message: 'Bạn phải mô tả' }],
  };

  loadDetail(id: any) {
    this.toggleBlockUI(true);
    this.roleService
      .get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: RoleDto) => {
          this.selectedEntity = response;
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
    this.saveData();
  }

  private saveData() {
    console.log(this.form.value);

    let dataRole = {
      name: this.form.value.name,
      description: this.form.value.description,
    };

    if (this.utilService.isEmpty(this.config.data?.id)) {
      this.roleService
        .create(dataRole)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          console.log(dataRole);
          this.ref.close(this.form.value);
          this.toggleBlockUI(false);
        });
    } else {
      this.roleService
        .update(this.config.data.id, dataRole)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          console.log(this.form.value);
          console.log('dataRole', dataRole);
          this.toggleBlockUI(false);
          this.ref.close(this.form.value);
        });
    }
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.btnDisabled = true;
      this.blockedPanelDetail = true;
    } else {
      setTimeout(() => {
        this.btnDisabled = false;
        this.blockedPanelDetail = false;
      }, 1000);
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

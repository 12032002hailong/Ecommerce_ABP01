import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUserDto {
  name?: string;
  surName?: string;
  email?: string;
  userName?: string;
  password?: string;
  phoneNumber?: string;
}

export interface SetPasswordDto {
  newPassword?: string;
  confirmNewPassword?: string;
}

export interface UpdateUserDto {
  name?: string;
  surName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface UserDto extends AuditedEntityDto<string> {
  name?: string;
  userName?: string;
  email?: string;
  surName?: string;
  phoneNumber?: string;
  roles: string[];
  isActive: boolean;
}

export interface UserInListDto extends AuditedEntityDto<string> {
  name?: string;
  surName?: string;
  email?: string;
  userName?: string;
  phoneNumber?: string;
}

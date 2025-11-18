import { IsEmail, IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { BloodGroup } from 'src/shared/enums/blood-group.enum';
import { MaritalStatus } from 'src/shared/enums/marital-status.enum';
// import { MaritalStatus, BloodGroup } from '../enums/user.enums';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  currentAddress?: string;

  @IsString()
  @IsOptional()
  permanentAddress?: string;

  @IsEnum(MaritalStatus)
  @IsOptional()
  maritalStatus?: MaritalStatus;

  @IsString()
  @IsOptional()
  profilePhoto?: string;

  @IsEnum(BloodGroup)
  @IsOptional()
  bloodGroup?: BloodGroup;

  @IsString()
  @IsOptional()
  emergencyContactName?: string;

  @IsString()
  @IsOptional()
  emergencyContactNumber?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  // Note: No createdAt or updatedAt in DTO - they are handled automatically
}
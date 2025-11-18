import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'current_address', type: 'text', nullable: true })
  currentAddress: string;

  @Column({ name: 'permanent_address', type: 'text', nullable: true })
  permanentAddress: string;

  @Column({ name: 'marital_status', nullable: true })
  maritalStatus: string;

  @Column({ name: 'profile_photo', nullable: true })
  profilePhoto: string;

  @Column({ name: 'blood_group', nullable: true })
  bloodGroup: string;

  @Column({ name: 'emergency_contact_name', nullable: true })
  emergencyContactName: string;

  @Column({ name: 'emergency_contact_number', nullable: true })
  emergencyContactNumber: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  // FIX: Replace UpdateDateColumn with regular Column
  @Column({
    name: 'updated_at',
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP'
    // Remove onUpdate for now to fix the error
  })
  updatedAt: Date;
}
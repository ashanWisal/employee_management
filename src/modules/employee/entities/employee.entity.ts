import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Department } from '../../department/entities/department.entity';
import { Document } from '../../documents/entities/document.entity';
import { LeaveBalance } from '../../leave-balances/entities/leave-balance.entity';
import { Leave } from '../../leaves/entities/leaf.entity';
import { PaySlip } from '../../pay-slips/entities/pay-slip.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  department: string;

  @Column({ name: 'job_title' })
  jobTitle: string;

  @Column({ name: 'employment_type' })
  employmentType: string;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'reporting_manager' })
  reportingManager: Employee;

  @Column({ name: 'employment_status' })
  employmentStatus: string;

  @Column({ name: 'basic_salary', type: 'decimal', precision: 10, scale: 2 })
  basicSalary: number;

  @Column({ name: 'house_rent_allowance', type: 'decimal', precision: 10, scale: 2, nullable: true })
  houseRentAllowance: number;

  @Column({ name: 'transport_allowance', type: 'decimal', precision: 10, scale: 2, nullable: true })
  transportAllowance: number;

  @Column({ name: 'other_allowances', type: 'decimal', precision: 10, scale: 2, nullable: true })
  otherAllowances: number;

  @OneToMany(() => Department, (department) => department.departmentHead)
  headedDepartments: Department[];

  @OneToMany(() => Document, (document) => document.employee)
  documents: Document[];

  @OneToMany(() => LeaveBalance, (leaveBalance) => leaveBalance.employee)
  leaveBalances: LeaveBalance[];

  @OneToMany(() => Leave, (leave) => leave.employee)
  leaves: Leave[];

  @OneToMany(() => Leave, (leave) => leave.approvedBy)
  approvedLeaves: Leave[];

  @OneToMany(() => PaySlip, (paySlip) => paySlip.employee)
  paySlips: PaySlip[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

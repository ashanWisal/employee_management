import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity()
export class PaySlip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'int' })
  month: number;

  @Column({ type: 'int' })
  year: number;

  @Column({ name: 'gross_salary', type: 'decimal', precision: 10, scale: 2 })
  grossSalary: number;

  @Column({ name: 'total_deductions', type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalDeductions: number;

  @Column({ name: 'net_salary', type: 'decimal', precision: 10, scale: 2 })
  netSalary: number;

  @Column({ name: 'present_days', type: 'int' })
  presentDays: number;

  @Column({ name: 'leave_days', type: 'int', default: 0 })
  leaveDays: number;

  @Column({ name: 'generated_date', type: 'date', nullable: true })
  generatedDate: Date;

  @Column({ name: 'file_url', nullable: true })
  fileUrl: string;

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

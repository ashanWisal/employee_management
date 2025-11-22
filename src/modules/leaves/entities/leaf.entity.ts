import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { LeaveStatus } from '../../../shared/enums/leave-status.enum';

@Entity('leaves')
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'leave_type' })
  leaveType: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({
    type: 'enum',
    enum: LeaveStatus,
    default: LeaveStatus.PENDING,
  })
  status: LeaveStatus;

  @Column({ name: 'applied_date', type: 'date', nullable: true })
  appliedDate: Date;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approvedBy: Employee;

  @Column({ name: 'approval_comments', type: 'text', nullable: true })
  approvalComments: string;

  @Column({ name: 'attachment_url', nullable: true })
  attachmentUrl: string;

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

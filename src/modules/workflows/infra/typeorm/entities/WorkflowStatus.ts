import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('workflow_status')
class WorkflowStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  is_error: string;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;
}

export default WorkflowStatus;

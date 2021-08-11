import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Workflow from './Workflow';

@Entity('workflow_evolutions')
class WorkflowEvolution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  workflow_id: string;

  @ManyToOne(() => Workflow, workflow => workflow.id)
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @Column()
  description: string;

  @Column()
  creater_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'creater_id' })
  creater: User;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;
}

export default WorkflowEvolution;

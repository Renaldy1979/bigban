import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';

import Attribute from '@modules/attributes/infra/typeorm/entities/Attribute';
import Workflow from './Workflow';

@Entity('workflows_attributes')
class WorkflowAttributes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  workflow_id: string;

  @ManyToOne(() => Workflow, workflow => workflow.id)
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @Column()
  attribute_id: string;

  @ManyToOne(() => Attribute, attribute => attribute.id)
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updated_at: Date;
}

export default WorkflowAttributes;

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Attribute from '@modules/attributes/infra/typeorm/entities/Attribute';
import WorkflowStatus from './WorkflowStatus';
import WorkflowType from './WorkflowType';

@Entity('workflows')
class Workflow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type_id: string;

  @ManyToOne(() => WorkflowType, type => type.id)
  @JoinColumn({ name: 'type_id' })
  type: WorkflowType;

  @Column()
  description: string;

  @Column()
  date_opened: Date;

  @Column()
  date_closed: Date;

  @Column()
  status_id: string;

  @ManyToOne(() => WorkflowStatus, status => status.id)
  @JoinColumn({ name: 'status_id' })
  status: WorkflowStatus;

  @Column()
  code_in: string;

  @Column()
  code_pb: string;

  @Column()
  code_bug: string;

  @Column()
  priority: string;

  @Column()
  requester_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @Column()
  creater_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'creater_id' })
  creater: User;

  @Column()
  updater_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'updater_id' })
  updater: User;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updated_at: Date;

  @ManyToMany(() => Attribute)
  @JoinTable({
    name: 'workflows_attributes',
    joinColumn: {
      name: 'workflow_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'attribute_id',
      referencedColumnName: 'id',
    },
  })
  attributes: Attribute[];
}

export default Workflow;

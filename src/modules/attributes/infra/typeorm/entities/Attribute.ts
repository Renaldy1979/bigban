import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import AttributeStatus from '@modules/attributes/infra/typeorm/entities/AttributeStatus';
import AttributeOrigin from '@modules/attributes/infra/typeorm/entities/AttributeOrigin';
import AttributeSegment from '@modules/attributes/infra/typeorm/entities/AttributeSegment';
import Workflow from '@modules/workflows/infra/typeorm/entities/Workflow';
import Sprint from '@modules/sprints/infra/typeorm/entities/Sprint';

@Entity('attributes')
class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  segment_id: string;

  @ManyToOne(() => AttributeSegment, segment => segment.id)
  @JoinColumn({ name: 'segment_id' })
  segment: AttributeSegment;

  @Column()
  origin_id: string;

  @ManyToOne(() => AttributeOrigin, origin => origin.id)
  @JoinColumn({ name: 'origin_id' })
  origin: AttributeOrigin;

  @Column()
  requester_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @Column()
  attribute_name: string;

  @Column()
  business_rule: string;

  @Column()
  calculation_rule: string;

  @Column()
  exception_rule: string;

  @Column()
  use_case: string;

  @Column()
  domain: string;

  @Column()
  is_null: string;

  @Column()
  in_use: string;

  @Column()
  segment_review: string;

  @Column()
  status_id: string;

  @OneToOne(() => AttributeStatus, status => status.id)
  @JoinColumn({ name: 'status_id' })
  status: AttributeStatus;

  @Column()
  details_status_mkt: string;

  @Column()
  source: string;

  @Column()
  production_date: string;

  @Column()
  no_rules: string;

  @Column()
  frequency: string;

  @Column()
  more_details: string;

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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToMany(() => Workflow, workflow => workflow.attributes)
  @JoinTable({
    name: 'workflows_attributes',
    joinColumn: {
      name: 'attribute_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'workflow_id',
      referencedColumnName: 'id',
    },
  })
  workflows: Workflow[];

  @ManyToMany(() => Sprint, sprint => sprint.attributes)
  @JoinTable({
    name: 'attributes_sprints',
    joinColumn: {
      name: 'attribute_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'sprint_id',
      referencedColumnName: 'id',
    },
  })
  sprints: Sprint[];
}

export default Attribute;

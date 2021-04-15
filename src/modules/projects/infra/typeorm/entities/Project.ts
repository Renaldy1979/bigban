import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  initiative: string;

  @Column()
  segment_priority: string;

  @Column()
  portfolio: string;

  @Column()
  effort: string;

  @Column()
  brief_description: string;

  @Column()
  justification: string;

  @Column()
  requester_id: string;

  @CreateDateColumn()
  request_date: Date;

  @CreateDateColumn()
  scope_date: Date;

  @CreateDateColumn()
  shipping_date: Date;

  @CreateDateColumn()
  post_date: Date;

  @CreateDateColumn()
  rollout_date: Date;

  @CreateDateColumn()
  expectation_date: Date;

  @Column()
  validated_scope: string;

  @Column()
  responsible_status: string;

  @Column()
  internal_status: string;

  @Column()
  internal_book: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  created_by: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creater: User;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  updated_by: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updater: User;
}

export default Project;

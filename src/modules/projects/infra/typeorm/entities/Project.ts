import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Comment from '@modules/projects/infra/typeorm/entities/Comment';

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

  @Column()
  request_date: Date;

  @Column()
  scope_date: Date;

  @Column()
  shipping_date: Date;

  @Column()
  post_date: Date;

  @Column()
  rollout_date: Date;

  @Column()
  expectation_date: Date;

  @Column()
  validated_scope: string;

  @Column()
  responsible_status: string;

  @Column()
  internal_status: string;

  @Column()
  internal_book: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  created_by: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'created_by' })
  creater: User;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  updated_by: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'updated_by' })
  updater: User;

  @OneToMany(() => Comment, comment => comment.project)
  comments: Comment[];
}

export default Project;

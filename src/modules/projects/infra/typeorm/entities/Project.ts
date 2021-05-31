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
import Status from '@modules/projects/infra/typeorm/entities/Status';

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

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @Column({ type: 'time with time zone' })
  request_date: Date;

  @Column({ type: 'time with time zone' })
  scope_date: Date;

  @Column({ type: 'time with time zone' })
  shipping_date: Date;

  @Column({ type: 'time with time zone' })
  post_date: Date;

  @Column({ type: 'time with time zone' })
  rollout_date: Date;

  @Column({ type: 'time with time zone' })
  expectation_date: Date;

  @Column()
  validated_scope: string;

  @Column()
  responsible_status: string;

  @Column()
  status_id: string;

  @ManyToOne(() => Status, status => status.id)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'created_by' })
  creater: User;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'updated_by' })
  updater: User;

  @OneToMany(() => Comment, comment => comment.project)
  comments: Comment[];
}

export default Project;

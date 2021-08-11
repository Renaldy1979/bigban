import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import CommentType from '@modules/projects/infra/typeorm/entities/CommentType';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  type_id: string;

  @OneToOne(() => CommentType, type => type.id)
  @JoinColumn({ name: 'type_id' })
  type: CommentType;

  @Column()
  project_id: string;

  @ManyToOne(() => Project, project => project.id)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  creater_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'creater_id' })
  creater: User;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}

export default Comment;

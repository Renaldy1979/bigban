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
import Project from '@modules/projects/infra/typeorm/entities/Project';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

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

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;

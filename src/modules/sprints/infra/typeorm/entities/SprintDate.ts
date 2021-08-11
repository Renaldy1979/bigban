import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Sprint from '@modules/sprints/infra/typeorm/entities/Sprint';
import Date from '@modules/sprints/infra/typeorm/entities/Date';

@Entity('sprints_dates')
class SprintDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sprint_id: string;

  @ManyToOne(() => Sprint, sprint => sprint.id)
  @JoinColumn({ name: 'sprint_id' })
  sprints: Sprint;

  @Column()
  date_id: string;

  @ManyToOne(() => Date, date => date.id)
  @JoinColumn({ name: 'date_id' })
  dates: Date;

  @Column({ type: 'timestamp with time zone' })
  date: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: string;
}

export default SprintDate;

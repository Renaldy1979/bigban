import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import Status from '@modules/sprints/infra/typeorm/entities/Status';
import SprintDate from '@modules/sprints/infra/typeorm/entities/SprintDate';
import Attribute from '@modules/attributes/infra/typeorm/entities/Attribute';

@Entity('sprints')
class Sprint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  status_id: string;

  @ManyToOne(() => Status, status => status.id)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: string;

  @ManyToMany(() => Attribute)
  @JoinTable({
    name: 'attributes_sprints',
    joinColumn: {
      name: 'sprint_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'attribute_id',
      referencedColumnName: 'id',
    },
  })
  attributes: Attribute[];

  @OneToMany(() => SprintDate, sprintDate => sprintDate.sprints)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'sprint_id',
  })
  sprintsDates: SprintDate[];
}

export default Sprint;

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
import Attribute from '@modules/attributes/infra/typeorm/entities/Attribute';
import TypeInfDatabase from '@modules/attributes/infra/typeorm/entities/TypeInfDatabase';

@Entity('attributes_inf_database')
class AttributeInfDatabase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  attribute_id: string;

  @ManyToOne(() => Attribute, attribute => attribute.id)
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @Column()
  format: string;

  @Column()
  var_name: string;

  @Column()
  type_id: string;

  @OneToOne(() => TypeInfDatabase, type => type.id)
  @JoinColumn({ name: 'type_id' })
  type: TypeInfDatabase;

  @Column()
  size: string;

  @Column()
  position: string;

  @Column()
  sprint_add: string;

  @Column()
  sprint_remove: string;

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
}

export default AttributeInfDatabase;

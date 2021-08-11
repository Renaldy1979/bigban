import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('types_attribute_database')
class TypeInfDatabase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;
}

export default TypeInfDatabase;

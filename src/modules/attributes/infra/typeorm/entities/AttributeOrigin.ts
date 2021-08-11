import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('attributes_origins')
class AttributeOrigin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;
}

export default AttributeOrigin;

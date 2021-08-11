import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('status_attribute')
class AttributeStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;
}

export default AttributeStatus;

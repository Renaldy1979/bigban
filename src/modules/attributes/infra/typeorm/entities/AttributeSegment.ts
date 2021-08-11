import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('attributes_segments')
class AttributeSegment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;
}

export default AttributeSegment;

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from '@app/share-library/entities/user/user.entity';

@Entity('t_subscribe')
@Unique(['user'])
export class SubscribeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column('boolean')
  subscribed: boolean;

  @CreateDateColumn()
  created_at: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';

@Entity('t_quiz')
export class QuizEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuizSetEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'quiz_set_id' })
  quiz_set: QuizSetEntity;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column('text', { nullable: true })
  code: string;

  @Column('text')
  description: string;

  @Column('text')
  commentary: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

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
import { QuestionEntity } from '@app/share-library/entities/question/question.entity';

@Entity('t_quiz')
export class QuizEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuestionEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;

  @Column({ nullable: false })
  question_id: number;

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

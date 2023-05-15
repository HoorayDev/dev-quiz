import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { QuizOptionEntity } from '@app/share-library/entities/question/quiz-option.entity';

@Entity('t_quiz_answer')
export class QuizAnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuizEntity, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn({ name: 'quiz_id' })
  quiz: QuizEntity;

  @ManyToOne(() => QuizOptionEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'quiz_answer_id' })
  quiz_answer: QuizOptionEntity;
}

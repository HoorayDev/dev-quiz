import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { QuizOptionEntity } from '@app/share-library/entities/question/quiz-option.entity';

@Entity('t_quiz_answer')
export class QuizAnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => QuizEntity, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn({ name: 'quiz_id' })
  quiz: QuizEntity;

  @OneToOne(() => QuizOptionEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'quiz_answer_option_id' })
  quiz_answer: QuizOptionEntity;
}

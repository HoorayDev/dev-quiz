import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from '@app/share-library/entities/question/question.entity';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { UserEntity } from '@app/share-library/entities/user/user.entity';
@Entity('t_quiz_response')
export class QuizResponseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => QuestionEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'question_id' })
  question: number;

  @ManyToOne(() => QuizEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'quiz_id' })
  quiz: number;

  @Column('int')
  quiz_option_id: number;

  @Column('boolean')
  user_is_correct: boolean;

  @CreateDateColumn()
  created_at: Date;
}

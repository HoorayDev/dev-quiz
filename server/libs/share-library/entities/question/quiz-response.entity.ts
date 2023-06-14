import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { UserEntity } from '@app/share-library/entities/user/user.entity';
import { QuizOptionEntity } from '@app/share-library/entities/question/quiz-option.entity';
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

  // @ManyToOne(() => QuizSetEntity, {
  //   createForeignKeyConstraints: false,
  //   nullable: false,
  // })
  // @JoinColumn({ name: 'quiz_set_id' })
  // quiz_set: QuizSetEntity;

  @ManyToOne(() => QuizEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'quiz_id' })
  quiz: QuizEntity;

  @ManyToOne(() => QuizOptionEntity, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'quiz_option_id' })
  quiz_option: number;

  @Column('boolean')
  user_is_correct: boolean;

  @CreateDateColumn()
  created_at: Date;
}

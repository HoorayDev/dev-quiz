import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { QuizSetCategory } from '@app/share-library/enum/quiz-set.enum';

// t_question -> t_quiz_set 명칭 변경
@Entity('t_quiz_set')
export class QuizSetEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: QuizSetCategory,
  })
  category: QuizSetCategory;

  @Column('simple-array')
  tag: string[];

  @Column()
  level: number;

  @Column('text')
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

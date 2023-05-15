import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { QuizAnswerEntity } from '@app/share-library/entities/question/quiz-answer.entity';
import { QuizOptionEntity } from '@app/share-library/entities/question/quiz-option.entity';
import { QuizResponseEntity } from '@app/share-library/entities/question/quiz-response.entity';
import { UserEntity } from '@app/share-library/entities/user/user.entity';
import { SubscribeEntity } from '@app/share-library/entities/user/subscribe.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'root',
      entities: [
        QuizSetEntity,
        QuizEntity,
        QuizAnswerEntity,
        QuizOptionEntity,
        QuizResponseEntity,
        UserEntity,
        SubscribeEntity,
      ],
      synchronize: true,
    }),
    CacheModule.register({
      ttl: 3000,
      max: 10,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({ ttl: 1, limit: 60 }),
  ],
  providers: [],
  exports: [],
})
export class ShareLibraryModule {}

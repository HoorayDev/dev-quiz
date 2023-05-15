import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShareLibraryModule } from '@app/share-library/src';
import { SubscribeModule } from './subscribe/subscribe.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { QuizSetModule } from './quiz-set/quiz-set.module';
import { AnswerModule } from './answer/answer.module';
import { APP_PROVIDER } from '@app/share-library/config/module.config';

@Module({
  imports: [ShareLibraryModule, SubscribeModule, UserModule, QuizModule, QuizSetModule, AnswerModule],
  controllers: [AppController],
  providers: [AppService, ...APP_PROVIDER],
})
export class AppModule {}

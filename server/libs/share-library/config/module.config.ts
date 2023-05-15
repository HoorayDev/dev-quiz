import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { QuizSetEntity } from '@app/share-library/entities/question/quiz-set.entity';
import { QuizEntity } from '@app/share-library/entities/question/quiz.entity';
import { QuizAnswerEntity } from '@app/share-library/entities/question/quiz-answer.entity';
import { QuizOptionEntity } from '@app/share-library/entities/question/quiz-option.entity';
import { QuizResponseEntity } from '@app/share-library/entities/question/quiz-response.entity';
import { UserEntity } from '@app/share-library/entities/user/user.entity';
import { SubscribeEntity } from '@app/share-library/entities/user/subscribe.entity';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@app/share-library/interceptor/logger.interceptor';
import { ThrottlerGuard } from '@nestjs/throttler';
import { TimeoutInterceptor } from '@app/share-library/interceptor/timeout.interceptor';
import { HttpExceptionFilter } from '@app/share-library/filter/http-exception.filter';

export const CONFIG_OPTION = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const envFilePath = isProduction ? '.env.prod' : '.env.local';

  return {
    isGlobal: true,
    envFilePath: envFilePath,
  };
};

export const TYPEORM_OPTION = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const dbHost = configService.get<string>('DB_HOST');
  const dbPort = configService.get<number>('DB_PORT');
  const dbUsername = configService.get<string>('DB_USERNAME');
  const dbPassword = configService.get<string>('DB_PASSWORD');
  const dbDatabase = configService.get<string>('DB_DATABASE');
  return {
    type: 'mysql',
    host: dbHost,
    port: dbPort,
    username: dbUsername,
    password: dbPassword,
    database: dbDatabase,
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
    poolSize: 10,
  };
};

export const CACHE_CONFIG = {
  ttl: 3000,
  max: 10,
  isGlobal: true,
};

export const THROTTLER_CONFIG = {
  ttl: 1,
  limit: 60,
};

export const APP_PROVIDER = [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TimeoutInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
];

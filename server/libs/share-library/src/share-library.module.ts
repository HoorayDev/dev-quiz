import { CacheModule } from '@nestjs/cache-manager';
import { HttpException, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
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

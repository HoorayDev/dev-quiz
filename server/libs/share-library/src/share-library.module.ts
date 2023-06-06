import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CACHE_CONFIG,
  CONFIG_OPTION,
  THROTTLER_CONFIG,
  TYPEORM_OPTION,
} from '@app/share-library/config/module.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_OPTION()),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: TYPEORM_OPTION,
    }),
    CacheModule.register(CACHE_CONFIG),
    ThrottlerModule.forRoot(THROTTLER_CONFIG),
    AuthModule,
  ],
  providers: [],
  exports: [],
})
export class ShareLibraryModule {}

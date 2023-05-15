import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShareLibraryModule } from '@app/share-library/src';
import { APP_PROVIDER } from '@app/share-library/config/module.config';

@Module({
  imports: [ShareLibraryModule],
  controllers: [AppController],
  providers: [AppService, ...APP_PROVIDER],
})
export class AppModule {}

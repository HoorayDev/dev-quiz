import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShareLibraryModule } from '@app/share-library/src';

@Module({
  imports: [ShareLibraryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

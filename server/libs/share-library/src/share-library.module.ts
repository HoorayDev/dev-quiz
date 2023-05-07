import { Module } from '@nestjs/common';
import { ShareLibraryService } from './share-library.service';

@Module({
  providers: [ShareLibraryService],
  exports: [ShareLibraryService],
})
export class ShareLibraryModule {}

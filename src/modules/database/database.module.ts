import { Module } from '@nestjs/common';
import { DatabaseProviders } from '../database/database.service'

@Module({
  imports: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class DatabaseModule {}

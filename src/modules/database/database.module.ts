import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviders } from '../database/database.service'

@Module({
  imports: [ConfigModule],
  providers: [DatabaseProviders],
  exports: [DatabaseProviders],
})
export class DatabaseModule {}

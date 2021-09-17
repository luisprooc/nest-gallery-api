import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMapper } from 'src/modules/user/user.mapper';
import { UserController } from 'src/controllers/user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),AuthModule],
  providers: [UserService, UserMapper],
  controllers: [UserController]
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './infrastructure/controllers/users.controller';
import { RegisterUserUseCase } from './application/register-user.use-case';
import { LoginUserUseCase } from './application/login-user.use-case';
import { UpdateUserUseCase } from './application/update-user.use-case';
import { UserRepositoryAdapter } from './infrastructure/adapters/user.repository.adapter';
import { USER_REPOSITORY } from './domain/user.repository';
import { UserEntity } from './infrastructure/adapters/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    UpdateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryAdapter,
    },
  ],
})
export class UsersModule {}

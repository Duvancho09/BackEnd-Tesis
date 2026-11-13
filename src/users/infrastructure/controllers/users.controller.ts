import { Controller, Param, Post, Body, Put } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/register-user.use-case';
import { LoginUserUseCase } from '../../application/login-user.use-case';
import { UpdateUserUseCase } from '../../application/update-user.use-case';

@Controller('users')
export class UsersController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase, 
    private readonly loginUserUseCase: LoginUserUseCase,
  private readonly updateUserUseCase: UpdateUserUseCase) {}

  @Post('register')
  async register(@Body() body: any) {
    return await this.registerUserUseCase.run(body);
  }

  @Post('login')
  async login(@Body() body: { identifier: string; password_hash: string }) {
    return await this.loginUserUseCase.run(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any){
    const user = await this.updateUserUseCase.run(id, body);
    return {
      message: 'Usuario actualizado con éxito',
      user,
    };
  }
}
import { Inject, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';
import { USER_REPOSITORY } from '../domain/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async run(credentials: { identifier: string; password_hash: string }): Promise<any> {
    const { identifier, password_hash } = credentials;

    if (!identifier || !password_hash) {
      throw new BadRequestException('Usuario/Email y contraseña son obligatorios.');
    }

    let user = await this.userRepository.findByUsername(identifier);
    if (!user) {
      user = await this.userRepository.findByEmail(identifier);
    }

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const { password_hash: _, ...userWithoutPassword } = user;
    return {
      message: 'Inicio de sesión exitoso',
      user: userWithoutPassword,
    };
  }
}
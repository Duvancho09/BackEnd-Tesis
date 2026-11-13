import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';
import { USER_REPOSITORY } from '../domain/user.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async run(id: number, updateData: any): Promise<any> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.userRepository.update(id, updateData);

    // 3. Retornamos el usuario actualizado sin la contraseña
    const updatedUser = await this.userRepository.findById(id);
    const { password_hash, ...userWithoutPassword } = updatedUser;
    
    return userWithoutPassword;
  }
}
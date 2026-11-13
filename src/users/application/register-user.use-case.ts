import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { USER_REPOSITORY } from "../domain/user.repository";
import type { UserRepository } from "../domain/user.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ){}

    async run(userData: any): Promise<any>{
        if (!userData.email){
            throw new BadRequestException('El correo electrónico es obligatorio.');
        }

        const existingUser = await this.userRepository.findByEmail(userData.email);
        if(existingUser){
            throw new BadRequestException('El correo electrónico ya está registrado.');
        }

        if(userData.password_hash){
            const salt = await bcrypt.genSalt(10);
            userData.password_hash = await bcrypt.hash(userData.password_hash, salt);
        }

        return await this.userRepository.createUser(userData);
    }
}
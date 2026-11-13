import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../domain/user.repository';
import { UserEntity } from './user.entity';

@Injectable( )
export class UserRepositoryAdapter implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return await this.repository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<any> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, data: any): Promise<any>{
    await this.repository.update(id, data);
    return await this.findById(id);
  }
}
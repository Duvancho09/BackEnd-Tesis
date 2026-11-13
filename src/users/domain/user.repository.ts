export interface UserRepository {
  createUser(userData: any): Promise<any>;
  findByEmail(email: string): Promise<any | null>;
  findByUsername(username: string): Promise<any | null>;
  findById(id: number): Promise<any>;
  update(id: number, data: any): Promise<any>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
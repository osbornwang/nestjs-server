import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        role: 'admin',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        role: 'user',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        role: 'user',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    const userInfo = this.users.find(user => user.username === username);
    return userInfo;
  }
}

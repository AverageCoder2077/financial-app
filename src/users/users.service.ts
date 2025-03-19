// src/users/users.service.ts
import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: '1', // Use strings for IDs consistently
      username: 'testuser',
      password: 'password', // In a real app, use bcrypt!
    },
    // Add more users as needed
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findById(userId: string): Promise<User | undefined> {
    return this.users.find(user => user.userId === userId);
  }
}
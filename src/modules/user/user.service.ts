import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
 
  // CREATE: Single responsibility - create user only
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if email already exists
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);
    return savedUser
  }

  // READ: Single responsibility - find all users
  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' }
    });

    return users
  }



  // READ: Single responsibility - find one user by ID
  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user
  }

  // READ: Single responsibility - find user by email (for auth)
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ 
      where: { email },
      select: ['id', 'email', 'password', 'fullName', 'isActive'] // Include password for auth
    });
  }

  // UPDATE: Single responsibility - update user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if email is being updated and if it already exists
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return updatedUser;
  }

  // DELETE: Single responsibility - soft delete user
  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Soft delete by setting isActive to false
    await this.usersRepository.update(id, { isActive: false });
  }

  // UTILITY: Single responsibility - check if user exists
  async exists(id: number): Promise<boolean> {
    const count = await this.usersRepository.count({ where: { id, isActive: true } });
    return count > 0;
  }
}
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@libs/shared';
import { ResponseService } from '@libs/shared';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly response: ResponseService,
  ) {}
  async create(createUser: CreateUserDto) {
    try {
      const res = await this.prisma.user.create({ data: createUser });

      return this.response.success(res);
    } catch (error) {
      console.error('Error in create user:', error);
      throw error; // Rethrow the error after logging it
    }
  }

  async findAll() {
    const test = await this.prisma.user.findMany();
    return this.response.success(test);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
    } catch (error) {
      console.error('Error in update user:', error);
      throw error; // Rethrow the error after logging it
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

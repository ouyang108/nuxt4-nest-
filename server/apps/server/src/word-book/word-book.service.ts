import { WordQuery } from '@en/common';
import { Injectable } from '@nestjs/common';
import { ResponseService, PrismaService } from '@libs/shared';
import type { Prisma } from '@libs/shared/generated/prisma/client';
@Injectable()
export class WordBookService {
  constructor(
    private readonly responseService: ResponseService,
    private readonly prismaService: PrismaService,
  ) {}
  private toBoolean(value: string | boolean): boolean | undefined {
    // 如果是false的话，会去查询false的数据，但是是undefined的话，就会忽略查询
    return value === 'true' ? true : undefined;
  }
  async findAll(query: WordQuery) {
    try {
      // console.log(query.page);
      const { page = 1, pageSize = 10, word, ...rest } = query;
      // 使用了dto就不需要再进行类型转换了，class-transformer会自动处理
      // console.log('Received query:', rest);
      const result: [string, boolean | undefined][] = Object.entries(rest).map(
        ([key, value]) => [key, this.toBoolean(value)],
      );
      const queryResult: Record<string, boolean | undefined> =
        Object.fromEntries(result);

      const where: Prisma.WordBookWhereInput = {
        word: word ? { contains: word } : undefined,
        ...queryResult,
      };
      const total = await this.prismaService.wordBook.count({ where });
      const list = await this.prismaService.wordBook.findMany({
        where,
        skip: (page - 1) * Number(pageSize),
        take: Number(pageSize),
        orderBy: { frq: 'desc' },
      });

      return this.responseService.success({ total, list });
    } catch (error) {
      console.error('Error in findAll:');
      throw error; // Rethrow the error after logging it
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} wordBook`;
  }
}

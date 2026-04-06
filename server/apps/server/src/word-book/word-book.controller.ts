import { Controller, Get, Body, Param, Query } from '@nestjs/common';
import { WordBookService } from './word-book.service';
// import type { WordQuery } from '@en/common';
// 启动dto
import { WordQueryDto } from './dto/word-book.dto';
@Controller('word-book')
export class WordBookController {
  constructor(private readonly wordBookService: WordBookService) {}

  @Get()
  findAll(@Query() query: WordQueryDto) {
    return this.wordBookService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordBookService.findOne(+id);
  }
}

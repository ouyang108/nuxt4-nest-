// @en/common/dto/word-query.dto.ts
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class WordQueryDto {
  @IsOptional()
  @Type(() => Number) // 确保从 URL 传来的字符串转为数字
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize: number = 10;

  @IsOptional()
  @IsString()
  word?: string;

  // 使用 @Type(() => Boolean) 处理 Query 中的布尔值转化
  // 因为 URL 传过来的是字符串 "true"，需要转成真正的布尔值 true
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  gk?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  zk?: boolean;

  // ... 其他字段同理 (gre, toefl, ielts 等)
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  gre?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  toefl?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  ielts?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  cet4?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  cet6?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  ky?: boolean;
}

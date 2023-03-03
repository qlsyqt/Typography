import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ArticleReqDto {
  @ApiProperty({
    description: '钱包地址',
    required: false,
  })
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: '上下文id, 视为一整次聊天的id',
    required: true,
  })
  conId: string;

  @ApiProperty({
    description: '跟踪id (每次交互时的id)',
    required: true,
  })
  traceId: string;

  @ApiProperty({
    description: '用户输入',
    required: true,
  })
  input: string;

  @ApiProperty({
    description: '文章',
    required: false,
  })
  @IsOptional()
  article: string;

  @ApiProperty({
    description: '0 或1，在哪个阶段就传哪个值',
    required: true,
  })
  phase: number;
}

export class ImageReqDto {
  @ApiProperty({
    description: '钱包地址',
    required: false,
  })
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: '上下文id, 视为一整次聊天的id',
    required: true,
  })
  conId: string;

  @ApiProperty({
    description: '跟踪id (每次交互时的id)',
    required: true,
  })
  traceId: string;

  @ApiProperty({
    description: '文章',
    required: false,
  })
  @IsOptional()
  article: string;
}

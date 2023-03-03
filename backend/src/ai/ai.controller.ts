import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ArticleReqDto, ImageReqDto } from './dto/ai.dto';
import axios, { Axios } from 'axios';
import { ConfigService } from '../config/config.service';

@Controller('api/ai')
export class AIController {
  instance: Axios;
  constructor(private readonly config: ConfigService) {
    console.log(this.config.get('AI_SERVER'));
    this.instance = axios.create({ baseURL: this.config.get('AI_SERVER') });
  }

  @Post('/article/chat')
  async chat(@Body() body: ArticleReqDto) {
    console.log(body);
    const res = (
      await this.instance.post(`/chat`, {
        user: body.address || '',
        traceId: body.traceId,
        conId: body.conId,
        input: body.input,
        article: body.article || '',
        phase: body.phase,
      })
    ).data;
    if (res.ok === 0) {
      throw new HttpException(res.error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return res.ok;
  }

  @Post('/image/chat')
  async image(@Body() body: ImageReqDto) {
    const res = (
      await this.instance.post(`/image`, {
        user: body.address || '',
        conId: body.conId,
        traceId: body.traceId,
        article: body.article,
      })
    ).data;
    if (res.ok === 0) {
      console.log(`image error:${res}`);
      throw new HttpException(res.error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return res;
  }
}

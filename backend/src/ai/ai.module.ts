import { Global, Module } from '@nestjs/common';
import { AIController } from './ai.controller';

@Global()
@Module({
  controllers: [AIController],
})
export class AIModule {}

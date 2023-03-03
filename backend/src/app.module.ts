import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { RedisModule } from './redis/redis.module';
import { AIModule } from './ai/ai.module';
import { EventsModule } from './event/events.module';
import { KafkaModule } from '@rob3000/nestjs-kafka';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    RedisModule,
    KafkaModule.registerAsync(['typography-backend'], {
      useFactory: async (config) => {
        const broker = config.get('KAFKA');
        return [
          {
            name: 'typography-backend',
            options: {
              client: {
                brokers: broker.split(','),
                clientId: 'typography-backend',
              },
              consumer: {
                groupId: 'typography-backend-group',
              },
            },
          },
        ];
      },
      inject: [ConfigService],
    }),
    AIModule,
    EventsModule,
  ],
})
export class AppModule {}

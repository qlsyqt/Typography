import { Inject } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { KafkaService, SubscribeTo } from '@rob3000/nestjs-kafka';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // 跨域设置
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server; // 所有的socket的链接都存在这里面

  constructor(@Inject('typography-backend') private client: KafkaService) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('tg_article', this);
    this.client.subscribeToResponseOf('tg_reply', this);
  }

  @SubscribeTo('tg_article')
  async getWorld(data: string): Promise<void> {
    const { token, traceId } = JSON.parse(data);
    console.log(`article消息:${token}`);
    this.server.sockets.emit(`${traceId}_article`, token);
  }

  @SubscribeTo('tg_reply')
  async reply(data: string): Promise<void> {
    const { traceId, ...props } = JSON.parse(data);
    console.log(`reply消息:${{ ...props }}`);
    this.server.sockets.emit(`${traceId}_reply`, { ...props });
  }
}

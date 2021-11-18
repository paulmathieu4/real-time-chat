import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ChannelService } from './channel/channel.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private channelService: ChannelService,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('test')
    async test(): Promise<string> {
        // await this.channelService.create();
        return 'channel created';
    }
}

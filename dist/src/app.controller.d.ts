import { AppService } from './app.service';
import { UssdDto } from './common/dto/ussd.dto';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    postUssd(ussdDto: UssdDto, res: Response): Promise<any>;
}

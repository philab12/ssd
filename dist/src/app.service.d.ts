import { UssdDto } from './common/dto/ussd.dto';
export declare class AppService {
    ussd(ussdDto: UssdDto): Promise<String>;
}

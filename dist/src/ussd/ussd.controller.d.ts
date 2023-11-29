import { UssdService } from './ussd.service';
export declare class UssdController {
    private readonly ussdService;
    constructor(ussdService: UssdService);
    create(xmlData: any): Promise<string>;
}

import { UpdateUssdDto } from './dto/update-ussd.dto';
import { HttpService } from '@nestjs/axios';
export declare class UssdService {
    private httpService;
    private requestId;
    private sessionId;
    private msisdn;
    private starCode;
    private id;
    private rspFlag;
    private tagSet;
    private noti_message;
    private error_message;
    private session_timestamp;
    constructor(httpService: HttpService);
    create(xmlData: string): Promise<string>;
    isInt(n: any): boolean;
    isFloat(n: any): boolean;
    xmlData(): string;
    xmlError(): string;
    private parseXml;
    private removeNode;
    private buildXml;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUssdDto: UpdateUssdDto): string;
    remove(id: number): string;
}

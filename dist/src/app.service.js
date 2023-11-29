"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    async ussd(ussdDto) {
        const { sessionId, serviceCode, phoneNumber, text, } = ussdDto;
        let response = "";
        if (text === "") {
            response = `CON What would you like to chcek ?
      1. My Account
      2. My phone Number`;
        }
        else if (text === "1") {
            response = `CON Choose account information you want to view
      1. Account Number
      2. Account Balance`;
        }
        else if (text === "2") {
            response = `END Your phone number is ${phoneNumber}`;
        }
        else if (text === "1*1") {
            const accountNumber = 'AC100101';
            response = `END Your account number os ${accountNumber}`;
        }
        else if (text === "1*2") {
            const balance = 'KES 10,000';
            response = `END Your balance is ${balance}`;
        }
        return response;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UssdController = void 0;
const common_1 = require("@nestjs/common");
const ussd_service_1 = require("./ussd.service");
let UssdController = class UssdController {
    constructor(ussdService) {
        this.ussdService = ussdService;
    }
    async create(xmlData) {
        const responsey = await this.ussdService.create(xmlData);
        return responsey;
    }
};
exports.UssdController = UssdController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Header)('content-type', 'text/xml'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UssdController.prototype, "create", null);
exports.UssdController = UssdController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [ussd_service_1.UssdService])
], UssdController);
//# sourceMappingURL=ussd.controller.js.map
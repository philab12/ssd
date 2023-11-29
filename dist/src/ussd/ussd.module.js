"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UssdModule = void 0;
const common_1 = require("@nestjs/common");
const ussd_service_1 = require("./ussd.service");
const ussd_controller_1 = require("./ussd.controller");
const axios_1 = require("@nestjs/axios");
const xml_middleware_1 = require("./middlewares/xml.middleware");
let UssdModule = class UssdModule {
    configure(consumer) {
        consumer.apply(xml_middleware_1.XMLMiddleware)
            .forRoutes({
            path: '/',
            method: common_1.RequestMethod.ALL
        });
    }
};
exports.UssdModule = UssdModule;
exports.UssdModule = UssdModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [ussd_controller_1.UssdController],
        providers: [ussd_service_1.UssdService],
    })
], UssdModule);
//# sourceMappingURL=ussd.module.js.map
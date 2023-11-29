"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLMiddleware = void 0;
const common_1 = require("@nestjs/common");
const bodyParser = require("body-parser");
const bodyParserXML = bodyParser.text({
    type: 'application/xml',
});
let XMLMiddleware = class XMLMiddleware {
    use(req, res, next) {
        bodyParserXML(req, res, next);
    }
};
exports.XMLMiddleware = XMLMiddleware;
exports.XMLMiddleware = XMLMiddleware = __decorate([
    (0, common_1.Injectable)()
], XMLMiddleware);
//# sourceMappingURL=xml.middleware.js.map
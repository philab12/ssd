"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUssdDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ussd_dto_1 = require("./create-ussd.dto");
class UpdateUssdDto extends (0, mapped_types_1.PartialType)(create_ussd_dto_1.CreateUssdDto) {
}
exports.UpdateUssdDto = UpdateUssdDto;
//# sourceMappingURL=update-ussd.dto.js.map
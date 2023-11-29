"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUnique = void 0;
const class_validator_1 = require("class-validator");
const is_unique_constraint_1 = require("./is-unique-constraint");
function IsUnique(options, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "is-unique",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: is_unique_constraint_1.IsUniqueConstraint,
        });
    };
}
exports.IsUnique = IsUnique;
//# sourceMappingURL=is-unique.js.map
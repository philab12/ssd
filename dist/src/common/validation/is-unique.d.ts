import { ValidationOptions } from "class-validator";
export type IsUniqueContraintInput = {
    tableName: string;
    column: string;
    column2?: string;
};
export declare function IsUnique(options: IsUniqueContraintInput, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;

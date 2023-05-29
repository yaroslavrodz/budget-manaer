import { OperationType } from "../enums/operation-type.enum";

export interface CreateOperation {
    name: string;
    amount: number;
    type: OperationType;
    categoryId: number;
    savingId: number;
}
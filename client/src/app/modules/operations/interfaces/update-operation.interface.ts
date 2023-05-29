import { OperationType } from "../enums/operation-type.enum";

export interface UpdateOperation {
    id: number;
    name: string;
    amount: number;
    type: OperationType;
    savingId: number;
    categoryId: number;
    userId: number;
}
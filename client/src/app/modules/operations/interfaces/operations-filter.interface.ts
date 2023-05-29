import { OperationType } from "../enums/operation-type.enum";

export interface OperationsFilter {
    type?: OperationType;
    categoryId?: number;
    savingId?: number;
    dateFrom?: string;
    dateTo?: string;
}
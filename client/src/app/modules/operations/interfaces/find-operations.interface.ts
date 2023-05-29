import { OperationsFilter } from "./operations-filter.interface";

export interface FindOperations {
    page: number;
    limit: number;
    filter: OperationsFilter;
}
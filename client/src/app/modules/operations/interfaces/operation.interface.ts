import { Saving } from "../../savings/interfaces/saving.interface";
import { OperationType } from "../enums/operation-type.enum";
import { Category } from "../../categories/interfaces/category.interface";

export interface Operation {
    id: number;
    name: string;
    amount: number;
    type: OperationType;
    saving: Saving;
    category: Category;
    userId: number;
    createdAt: Date;
}
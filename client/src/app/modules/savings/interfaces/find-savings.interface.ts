import { SavingType } from "../enums/saving-type.enum";

export interface FindSavings {
    page: number;
    limit: number;
    type?: SavingType;
}
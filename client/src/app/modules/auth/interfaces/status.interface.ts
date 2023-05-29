import { User } from "../../user/interfaces/user.interface";

export interface Status {
    user: User;
    token: string;
}
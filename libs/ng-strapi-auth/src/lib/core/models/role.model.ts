import { RoleTypeEnum } from "../enums/role-type.enum";

export interface RoleModel {
    id: number;
    name: string;
    description: string;
    type: RoleTypeEnum;
}

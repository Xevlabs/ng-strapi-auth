import { RoleTypeEnum } from "../enums/role-type.enum";

export interface RoleModel {
    id: string;
    name: string;
    description: string;
    type: RoleTypeEnum;
}

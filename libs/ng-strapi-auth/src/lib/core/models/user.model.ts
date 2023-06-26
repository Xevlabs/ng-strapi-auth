export interface BaseUserModel {
    id: number;
    email: string;
    username: string;
    confirmed: boolean;
    blocked: boolean;
    role: {
        [key: string]: string
    };
    userGroup?: UserGroupModel
}

export interface FeaturesModel {
    [key: string]: boolean
}

type UserGroupModel = FeaturesModel & {
    name: string
}

export interface DefaultUserModel {}

export type UserModel<T = DefaultUserModel> = T & BaseUserModel;

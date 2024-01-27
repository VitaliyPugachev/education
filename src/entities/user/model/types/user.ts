export interface User {
    id: string;
    username: string;
    avatar?: string;
    role?: UserRole[];
}

export interface UserSchema {
    authData?: User
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER'
}

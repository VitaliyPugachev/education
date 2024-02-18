import { User } from '@/entities/user';

export interface CustomComment {
    id: string;
    user: User;
    text: string;
}

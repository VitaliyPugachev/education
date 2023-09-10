import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/user';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
}

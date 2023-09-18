import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/user';
import { LoginSchema } from 'feautures/AuthByUsername/index';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    login?: LoginSchema;
}

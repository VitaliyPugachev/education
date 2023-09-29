import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/user';
import { LoginSchema } from 'feautures/AuthByUsername/index';
import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    login?: LoginSchema;
}
export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    remove: (key: StateSchemaKey) => void;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
}

export interface ReduxStoreManager extends EnhancedStore {
    reducerManager: ReducerManager
}

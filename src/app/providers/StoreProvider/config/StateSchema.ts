import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/user';
import { LoginSchema } from 'feautures/AuthByUsername/index';
import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { NavigateFunction, To } from 'react-router-dom';
import { NavigateOptions } from 'react-router';
import { ArticleDetailsSchema } from 'entities/Articles';
import { ArticleDetailsCommentSchema } from 'pages/ArticleDetailsPage';
import { addCommentFormSchema } from 'feautures/addCommentForm/index';
import { ArticlesPageSchema } from 'pages/ArticlesPage';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    login?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComment?: ArticleDetailsCommentSchema;
    addCommentForm?: addCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
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

export interface ThunkExtraArg {
    api: AxiosInstance,
    navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
    rejectedValue: T,
    extra: ThunkExtraArg,
    state: StateSchema
}

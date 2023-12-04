import {
    FC, memo, ReactNode, useEffect,
} from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreManager, StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer
}

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children?: ReactNode;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props: DynamicModuleLoaderProps) => {
    const {
        children,
        reducers,
        removeAfterUnmount,
    } = props;
    const store = useStore() as ReduxStoreManager;
    const dispatch = useDispatch();

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemaKey, reducer);
            dispatch({ type: `INIT ${name} reducer` });
        });

        if (removeAfterUnmount) {
            return () => {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `REMOVE ${name} reducer` });
                });
            };
        }
    }, [dispatch, reducers, removeAfterUnmount, store.reducerManager]);

    return (
        <>
            { children }
        </>
    );
};

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

    useEffect(() => {
        const getMountedReducers = store.reducerManager.getMountedReducers();
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = getMountedReducers[name as StateSchemaKey];
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `INIT ${name} reducer` });
            }
        }, [dispatch]);

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

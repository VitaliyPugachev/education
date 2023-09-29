import { FC, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ReduxStoreManager, StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer
}

type ReducerListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children,
        reducers,
        removeAfterUnmount,
    } = props;
    const store = useStore() as ReduxStoreManager;
    const dispatch = useDispatch();

    // eslint-disable-next-line consistent-return
    useState(() => {
        Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
            store.reducerManager.add(name, reducer);
            dispatch({ type: `INIT ${name} reducer` });
        });

        if (removeAfterUnmount) {
            return () => {
                Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
                    store.reducerManager.remove(name);
                    dispatch({ type: `REMOVE ${name} reducer` });
                });
            };
        }

        // @ts-ignore
    }, []);

    return (
        { children }
    );
};

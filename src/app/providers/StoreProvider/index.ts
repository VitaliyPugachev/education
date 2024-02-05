import type {
    StateSchema, ReduxStoreManager, ThunkExtraArg, ThunkConfig,
} from './config/StateSchema';
import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore } from './config/store';
import type {AppDispatch} from './config/store';

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    AppDispatch,
    ThunkExtraArg,
    ThunkConfig,
};

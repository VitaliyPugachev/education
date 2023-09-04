import { StateSchema } from 'app/providers/StoreProvider/index';

export const getCounter = (state: StateSchema) => state.counter;

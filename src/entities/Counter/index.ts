import { Counter } from 'entities/Counter/ui/Counter';
import type { CounterSchema } from 'entities/Counter/model/types/counterSchema';
import { counterReducer } from 'entities/Counter/model/slice/counterSlice';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export {
    counterReducer,
    Counter,
    CounterSchema,
};
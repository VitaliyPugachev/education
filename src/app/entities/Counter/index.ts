import { Counter } from 'app/entities/Counter/ui/Counter';
import type { CounterSchema } from 'app/entities/Counter/model/types/counterSchema';
import { counterReducer } from 'app/entities/Counter/model/slice/counterSlice';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export {
    counterReducer,
    Counter,
    CounterSchema,
};

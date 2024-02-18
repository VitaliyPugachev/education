import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCommentFormSchema } from '@/features/addCommentForm';

const initialState: addCommentFormSchema = {
    text: '',
    error: '',
};

export const addCommentFormSlice = createSlice({
    name: 'commentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchProfileData.pending, (state, action) => {
    //         state.error = undefined;
    //         state.isLoading = true;
    //     });
    //     builder.addCase(
    //         fetchProfileData.fulfilled,
    //         (state, action: PayloadAction<Profile>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //             state.form = action.payload;
    //         },
    //     );
    //     builder.addCase(fetchProfileData.rejected, (state, action) => {
    //         state.isLoading = false;
    //         // @ts-ignore
    //         state.error = action.payload;
    //     });
    //     builder.addCase(updateProfileData.pending, (state, action) => {
    //         state.validateError = undefined;
    //         state.isLoading = true;
    //     });
    //     builder.addCase(
    //         updateProfileData.fulfilled,
    //         (state, action: PayloadAction<Profile>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //             state.form = action.payload;
    //             state.readonly = true;
    //         },
    //     );
    //     builder.addCase(updateProfileData.rejected, (state, action) => {
    //         state.isLoading = false;
    //         // @ts-ignore
    //         state.validateError = action.payload;
    //     });
    // },
});

export const { reducer: addCommentFormReducer } = addCommentFormSlice;
export const { actions: addCommentFormActions } = addCommentFormSlice;

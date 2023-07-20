import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface SortingState {
	value: string;
}

const initialState = {
	value: '',
};

const sortingSlice = createSlice({
	name: 'sorting',
	initialState,
	reducers: {
		setSorting(state, action: PayloadAction<string>) {
			state.value = action.payload;
		},
	},
});

export const { setSorting } = sortingSlice.actions;
export default sortingSlice.reducer;
export const selectSorting = (state: RootState) => state.sorting.value;

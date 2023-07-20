import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface ModeState {
	value: string;
}

const initialState: ModeState = {
	value: 'dark',
};

const modeSlice = createSlice({
	name: 'mode',
	initialState,
	reducers: {
		toggleMode: (state) => {
			state.value === 'dark' ? (state.value = 'light') : (state.value = 'dark');
			document.body.className = state.value;
		},
	},
});

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;
export const selectMode = (state: RootState) => state.mode.value;

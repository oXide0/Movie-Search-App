import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface DrawerState {
	isOpen: boolean;
}

const initialState: DrawerState = {
	isOpen: false,
};

const drawerSlice = createSlice({
	name: 'drawer',
	initialState,
	reducers: {
		toggleDrawer: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { toggleDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
export const selectIsDrawerOpen = (state: RootState) => state.drawer.isOpen;

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { movies } from '../services/movies';
import drawerReducer from '../features/drawerSlice';
import favoriteMoviesReducer from '../features/favoriteMoviesSlice';
import modeReducer from '../features/modeSlice';
import sortingReducer from '../features/sortingSlice';

export const store = configureStore({
	reducer: {
		[movies.reducerPath]: movies.reducer,
		drawer: drawerReducer,
		favoriteMovies: favoriteMoviesReducer,
		mode: modeReducer,
		sorting: sortingReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movies.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

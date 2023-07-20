import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { IMovie } from '../types/types';

export interface FavoriteMoviesState {
	movies: IMovie[];
}

const initialState: FavoriteMoviesState = {
	movies: JSON.parse(localStorage.getItem('favoriteMovies') ?? '[]'),
};

const favoriteMoviesSlice = createSlice({
	name: 'favoriteMovies',
	initialState,
	reducers: {
		addMovie: (state, action: PayloadAction<IMovie>) => {
			state.movies.push(action.payload);
			localStorage.setItem('favoriteMovies', JSON.stringify(state.movies));
		},
		removeMovie: (state, action: PayloadAction<number>) => {
			const filteredMovies = state.movies.filter((m) => m.id !== action.payload);
			state.movies = filteredMovies;
			localStorage.setItem('favoriteMovies', JSON.stringify(filteredMovies));
		},
	},
});

export const { addMovie, removeMovie } = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;
export const selectfavoriteMovies = (state: RootState) => state.favoriteMovies.movies;

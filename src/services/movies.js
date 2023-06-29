import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const MOVIE_DB_API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY;

export const movies = createApi({
	reducerPath: 'moviesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.themoviedb.org/3/',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${MOVIE_DB_API_KEY}`,
		},
	}),
	endpoints: () => ({}),
});

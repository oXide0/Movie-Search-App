import { movies } from './movies';
import { IMovie } from '../types/types';

interface MoviesLanguage {
	language: string;
	id: number;
}

type Movies = {
	page: number;
	language: string;
};

type GetMovies = {
	results: IMovie[];
};

export const moviesApi = movies.injectEndpoints({
	endpoints: (builder) => ({
		getMoviesByPage: builder.query<GetMovies, Movies>({
			query: ({ page, language }) => `movie/popular?language=${language}&page=${page}`,
		}),
		getMoviesByRating: builder.query<GetMovies, Movies>({
			query: ({ page, language }) => `movie/top_rated?language=${language}&page=${page}`,
		}),
		getUpcomingMovies: builder.query<GetMovies, Movies>({
			query: ({ page, language }) => `movie/upcoming?language=${language}&page=${page}`,
		}),
		getMoviesByQuery: builder.query({
			query: (args) => {
				const { query, page, language } = args;
				return `search/movie?query=${query.replace(
					' ',
					'%20'
				)}&include_adult=false&language=${language}&page=${page}`;
			},
		}),
		getMovieDetailsById: builder.query<IMovie, MoviesLanguage>({
			query: (args) => {
				const { id, language } = args;
				return `movie/${id}?language=${language}`;
			},
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetMoviesByPageQuery,
	useGetMoviesByRatingQuery,
	useGetUpcomingMoviesQuery,
	useGetMoviesByQueryQuery,
	useGetMovieDetailsByIdQuery,
} = moviesApi;

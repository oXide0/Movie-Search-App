import { movies } from './movies';

export const moviesApi = movies.injectEndpoints({
	endpoints: (builder) => ({
		getMoviesByPage: builder.query({
			query: ({ page, language }) => `movie/popular?language=${language}&page=${page}`,
		}),
		getMoviesByRating: builder.query({
			query: ({ page, language }) => `movie/top_rated?language=${language}&page=${page}`,
		}),
		getUpcomingMovies: builder.query({
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
		getMovieDetailsById: builder.query({
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

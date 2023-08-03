import { useAppSelector } from './redux-hooks';
import { useTranslation } from 'react-i18next';
import { selectSorting } from '../features/sortingSlice';
import {
	useGetMoviesByQueryQuery,
	useGetMoviesByPageQuery,
	useGetMoviesByRatingQuery,
	useGetUpcomingMoviesQuery,
} from '../services/moviesApi';

export function useMovies(query: string, page: number) {
	const sorting = useAppSelector(selectSorting);
	const { i18n } = useTranslation();

	if (query) {
		const { data, error, isLoading } = useGetMoviesByQueryQuery({ query, page, language: i18n.language });
		return { data, error, isLoading };
	}

	switch (sorting) {
		case 'Popularity':
		case '':
			const {
				data: pageData,
				error: pageError,
				isLoading: pageIsLoading,
			} = useGetMoviesByPageQuery({
				page,
				language: i18n.language,
			});
			return { data: pageData, error: pageError, isLoading: pageIsLoading };
		case 'Rating':
			const {
				data: ratingData,
				error: ratingError,
				isLoading: ratingIsLoading,
			} = useGetMoviesByRatingQuery({
				page,
				language: i18n.language,
			});
			return { data: ratingData, error: ratingError, isLoading: ratingIsLoading };
		case 'Upcoming':
			const {
				data: upcomingData,
				error: upcomingError,
				isLoading: upcomingIsLoading,
			} = useGetUpcomingMoviesQuery({
				page,
				language: i18n.language,
			});
			return { data: upcomingData, error: upcomingError, isLoading: upcomingIsLoading };
		default:
			return { data: null, error: null, isLoading: false };
	}
}

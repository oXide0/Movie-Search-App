import PopularMovies from './PopularMovies';
import TopRatedMovies from './TopRatedMovies';
import UpcomingMovies from './UpcomingMovies';
import FoundMovies from './FoundMovies';
import { useAppSelector } from '../hooks/redux-hooks';
import { selectSorting } from '../features/sortingSlice';

interface MovieListProps {
	query: string;
}

function MovieList({ query }: MovieListProps) {
	const sorting = useAppSelector(selectSorting);

	if (query) {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<FoundMovies query={query} />
			</div>
		);
	}
	if (sorting === 'Popularity' || sorting === '') {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<PopularMovies />
			</div>
		);
	}

	if (sorting === 'Rating') {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<TopRatedMovies />
			</div>
		);
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<UpcomingMovies />
		</div>
	);
}

export default MovieList;

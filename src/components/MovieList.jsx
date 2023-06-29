import PopularMovies from './PopularMovies';
import TopRatingMovies from './TopRatedMovies';
import UpcomingMovies from './UpcomingMovies';
import FoundMovies from './FoundMovies';

function MovieList({ sorting, query }) {
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
				<TopRatingMovies />
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
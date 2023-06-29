import { useGetMoviesByRatingQuery } from '../services/moviesApi';
import CircularProgress from '@mui/material/CircularProgress';
import MovieCard from './MovieCard';
import ErrorText from './ErrorText';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function TopRatedMovies() {
	const [page, setPage] = useState(1);
	const { i18n } = useTranslation();
	const { data, error, isLoading } = useGetMoviesByRatingQuery({ page, language: i18n.language });
	const moviesData = useSelector((state) => state.favoriteMovies.movies);

	const handleClickScroll = () => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};

	if (isLoading) {
		return <CircularProgress />;
	}

	return error || !data.results.length ? (
		<ErrorText />
	) : (
		<>
			<div className='movies'>
				{data.results.map((m) => {
					const movie = moviesData.find((movie) => movie.id === m.id);
					if (movie) {
						return <MovieCard key={m.id} data={m} favorite={true} />;
					}
					return <MovieCard key={m.id} data={m} />;
				})}
			</div>
			<div style={{ padding: '30px 0' }}>
				<Pagination
					sx={{ background: '#adbdd4', borderRadius: '5px', padding: '5px' }}
					count={500}
					color='primary'
					page={page}
					onChange={(e, value) => {
						handleClickScroll();
						setPage(value);
					}}
				/>
			</div>
		</>
	);
}

export default TopRatedMovies;

import { useGetUpcomingMoviesQuery } from '../services/moviesApi';
import ErrorText from './ErrorText';
import CircularProgress from '@mui/material/CircularProgress';
import MovieCard from './MovieCard';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function UpcomingMovies() {
	const [page, setPage] = useState(1);
	const { i18n } = useTranslation();
	const { data, error, isSuccess } = useGetUpcomingMoviesQuery({ page, language: i18n.language });

	const handleClickScroll = () => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};

	if (!isSuccess) {
		return <CircularProgress />;
	}

	return error || !data.results.length ? (
		<ErrorText />
	) : (
		<>
			<div className='movies'>
				{data.results.map((m) => (
					<MovieCard key={m.id} data={m} />
				))}
			</div>
			<div style={{ padding: '30px 0' }}>
				<Pagination
					sx={{ background: '#adbdd4', borderRadius: '5px', padding: '5px' }}
					count={23}
					color='primary'
					page={page}
					onChange={(_, value) => {
						handleClickScroll();
						setPage(value);
					}}
				/>
			</div>
		</>
	);
}

export default UpcomingMovies;

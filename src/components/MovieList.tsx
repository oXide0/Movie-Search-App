import { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorText from './ErrorText';
import MovieCard from './MovieCard';
import { IMovie } from '../types/types';
import Pagination from '@mui/material/Pagination';

interface MovieListProps {
	query: string;
}

function MovieList({ query }: MovieListProps) {
	const [page, setPage] = useState(1);
	const { data, error, isLoading } = useMovies(query, page);

	const handleClickScroll = () => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};

	const onPaginationChange = (value: number) => {
		handleClickScroll();
		setPage(value);
	};

	if (isLoading) {
		return <CircularProgress />;
	}

	if (error || !data.results.length) {
		return <ErrorText>Movies not found</ErrorText>;
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<div className='movies'>
				{data.results.map((movie: IMovie) => (
					<MovieCard key={movie.id} data={movie} />
				))}
			</div>
			<div style={{ padding: '30px 0' }}>
				<Pagination
					sx={{ background: '#adbdd4', borderRadius: '5px', padding: '5px' }}
					count={data.total_pages > 500 ? 500 : data.total_pages}
					color='primary'
					page={page}
					onChange={(_, value) => onPaginationChange(value)}
				/>
			</div>
		</div>
	);
}

export default MovieList;

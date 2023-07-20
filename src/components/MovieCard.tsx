import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { addMovie, removeMovie, selectfavoriteMovies } from '../features/favoriteMoviesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { useState } from 'react';
import BasicModal from './BasicModal';
import CustomizedSnackbar from './Snackbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IMovie, TypeSeverity } from '../types/types';

const buttonStyles = {
	position: 'absolute',
	right: '0',
	zIndex: '10',
	background: 'rgba(255, 255, 255, 0.6)',
	margin: '5px',
};

interface MovieCardProps {
	data: IMovie;
	type?: string;
}

function MovieCard({ data, type }: MovieCardProps) {
	const [modalActive, setModalActive] = useState(false);
	const [snackbarActive, setSnackbarActive] = useState(false);
	const [snackbarType, setSnackbarType] = useState<TypeSeverity>('success');
	const moviesData = useAppSelector(selectfavoriteMovies);
	const dispatch = useAppDispatch();

	const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (type === 'favorite') {
			dispatch(removeMovie(data.id));
			return;
		}
		const movie = moviesData.find((m) => m.id === data.id);
		if (movie) {
			setSnackbarType('error');
			setSnackbarActive(true);
			return;
		}
		dispatch(addMovie(data));
		setSnackbarType('success');
		setSnackbarActive(true);
	};

	return (
		<>
			<BasicModal active={modalActive} setActive={setModalActive} id={data.id} />
			<CustomizedSnackbar active={snackbarActive} setActive={setSnackbarActive} type={snackbarType} />
			<Card className='card' onClick={() => setModalActive(true)}>
				<Chip
					label={!data.vote_average ? 'NR' : data.vote_average.toFixed(1)}
					sx={{ position: 'absolute', zIndex: '10', margin: '8px 5px' }}
					color='primary'
				/>
				<IconButton sx={buttonStyles} onClick={(e) => onClickHandler(e)}>
					{type === 'favorite' ? <DeleteIcon color='primary' /> : <AddCircleIcon color='primary' />}
				</IconButton>
				<CardActionArea>
					<CardMedia
						sx={{ width: '100%', height: '100%', maxHeight: 350, minHeight: 350 }}
						image={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
					/>
					<h1 className='card__title'>{data.title}</h1>
				</CardActionArea>
			</Card>
		</>
	);
}

export default MovieCard;

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetMovieDetailsByIdQuery } from '../services/moviesApi';
import { useTranslation } from 'react-i18next';
import ErrorText from './ErrorText';
import { modalStyles } from '../utils/styles';

interface BasicModalProps {
	active: boolean;
	setActive: (active: boolean) => void;
	id: number;
}

function BasicModal({ active, setActive, id }: BasicModalProps) {
	const handleClose = () => setActive(false);
	const { t, i18n } = useTranslation();
	const { data, error, isSuccess } = useGetMovieDetailsByIdQuery({ id, language: i18n.language });

	return (
		<Modal
			open={active}
			onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={active}>
				<Box sx={modalStyles}>
					{error && <ErrorText>Movie not found</ErrorText>}
					{!isSuccess ? (
						<CircularProgress />
					) : (
						<>
							<div>
								<img
									src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
									alt={data.title}
									style={{ maxHeight: 400 }}
								/>
							</div>
							<div>
								<Typography variant='h3' component='h1' fontWeight={600}>
									{data.title}
								</Typography>
								<Typography variant='h6' component='p'>
									{data.genres.map((genre) => genre.name).join(', ')}
								</Typography>
								<div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '20px' }}>
									<Typography variant='h6' component='p'>
										{data.vote_average.toFixed(1)}
									</Typography>
									<Rating name='read-only' value={(data.vote_average * 5) / 10} readOnly />
								</div>
								<Typography variant='h6' component='p'>
									{t('modal.releaseDate')} {data.release_date}
								</Typography>
								<Typography sx={{ paddingTop: '10px' }}>{data.overview}</Typography>
							</div>
						</>
					)}
				</Box>
			</Fade>
		</Modal>
	);
}

export default BasicModal;

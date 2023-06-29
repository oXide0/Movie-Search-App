import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetMovieDetailsByIdQuery } from '../services/moviesApi';
import { useTranslation } from 'react-i18next';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 900,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 2,
	display: 'flex',
	borderRadius: '10px',
	gap: '20px',
};

function BasicModal({ active, setActive, id }) {
	const handleClose = () => setActive(false);
	const { t, i18n } = useTranslation();
	const { data, error, isLoading } = useGetMovieDetailsByIdQuery({ id, language: i18n.language });

	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
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
				<Box sx={style}>
					{error && <Typography variant='h3'>Error: {error}</Typography>}
					{isLoading ? (
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

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MovieCard from './MovieCard';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { toggleDrawer, selectIsDrawerOpen } from '../features/drawerSlice';
import { selectfavoriteMovies } from '../features/favoriteMoviesSlice';
import { useTranslation } from 'react-i18next';

function TemporaryDrawer() {
	const drawerMode = useAppSelector(selectIsDrawerOpen);
	const moviesData = useAppSelector(selectfavoriteMovies);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const onCloseDrawer = () => {
		dispatch(toggleDrawer());
	};

	return (
		<Drawer anchor='left' open={drawerMode} onClose={() => dispatch(toggleDrawer())}>
			<Box
				sx={{ width: 600, height: '1000%', background: '#303030', padding: '10px 5px 0 10px' }}
				role='presentation'
			>
				<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant='h5' sx={{ color: '#fff' }}>
						{t('drawerLogoName')}
					</Typography>
					<IconButton sx={{ color: '#fff' }} onClick={onCloseDrawer}>
						<CloseIcon sx={{ width: '27px', height: '27px' }} />
					</IconButton>
				</header>
				<main style={{ display: 'flex', gap: '30px', padding: '30px 20px', flexWrap: 'wrap' }}>
					{moviesData.map((m) => (
						<MovieCard key={m.id} data={m} type='favorite' />
					))}
				</main>
			</Box>
		</Drawer>
	);
}

export default TemporaryDrawer;

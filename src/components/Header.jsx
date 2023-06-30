import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import { toggleDrawer } from '../features/drawer/drawerSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useSelector } from 'react-redux';
import { toggleMode } from '../features/mode/modeSlice';
import HideOnScroll from '../utils/HideOnScroll';

function Header(props) {
	const mode = useSelector((state) => state.mode.value);
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState('en');
	const dispatch = useDispatch();

	useEffect(() => {
		const language = localStorage.getItem('i18nextLng');
		setLanguage(language);
	}, []);

	const changeLanguage = (event, newLanguage) => {
		setLanguage(newLanguage);
		i18n.changeLanguage(newLanguage);
	};

	return (
		<HideOnScroll {...props}>
			<AppBar>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
						onClick={() => dispatch(toggleDrawer())}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
						{t('logoName')}
					</Typography>
					<ToggleButtonGroup
						sx={{ color: '#fff', paddingRight: '20px' }}
						value={language}
						onChange={changeLanguage}
						exclusive
						aria-label='Platform'
					>
						<ToggleButton value='en' sx={{ color: '#fff' }}>
							<img src='img/usa_icon.png' alt='' style={{ maxWidth: '35px' }} />
						</ToggleButton>
						<ToggleButton value='uk' sx={{ color: '#fff' }}>
							<img src='img/ua_icon.png' alt='' style={{ maxWidth: '35px' }} />
						</ToggleButton>
					</ToggleButtonGroup>
					<IconButton onClick={() => dispatch(toggleMode())}>
						{mode === 'dark' ? (
							<LightModeIcon sx={{ color: '#fff' }} />
						) : (
							<DarkModeIcon sx={{ color: '#fff' }} />
						)}
					</IconButton>
				</Toolbar>
			</AppBar>
		</HideOnScroll>
	);
}

export default Header;

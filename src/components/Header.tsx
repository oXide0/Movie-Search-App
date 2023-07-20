import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useEffect, useState } from 'react';
import { toggleDrawer } from '../features/drawerSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { useTranslation } from 'react-i18next';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { toggleMode, selectMode } from '../features/modeSlice';
import HideOnScroll from '../utils/HideOnScroll';

function Header() {
	const mode = useAppSelector(selectMode);
	const { t, i18n } = useTranslation();
	const [language, setLanguage] = useState('en');
	const dispatch = useAppDispatch();

	useEffect(() => {
		const mainLanguage = localStorage.getItem('i18nextLng');
		setLanguage(mainLanguage as string);
	}, []);

	const changeLanguage = (_: React.MouseEvent<HTMLElement>, newLanguage: string) => {
		setLanguage(newLanguage);
		i18n.changeLanguage(newLanguage);
	};

	return (
		<HideOnScroll>
			<AppBar>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
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

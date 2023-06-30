import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setSorting } from '../features/sorting/sortingSlice';

const boxStyle = {
	background: '#6fa2f0',
	width: '1330px',
	height: '70px',
	margin: '40px auto',
	borderRadius: '5px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '0 20px',
};

function SearchBlock({ setQuery }) {
	const [searchValue, setSearchValue] = useState('');
	const sorting = useSelector((state) => state.sorting.value);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (!searchValue.trim()) {
			return;
		}
		setQuery(searchValue);
	};

	const onClickHandler = () => {
		if (!searchValue.trim()) {
			return;
		}
		setQuery(searchValue);
	};

	return (
		<Box sx={boxStyle}>
			<Paper
				component='form'
				sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
				onSubmit={onSubmitHandler}
			>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder={t('searchBar.placeholder')}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<IconButton type='button' sx={{ p: '10px' }} onClick={onClickHandler}>
					<SearchIcon />
				</IconButton>
			</Paper>
			<FormControl sx={{ width: '200px', background: '#fff !important', borderRadius: '5px' }}>
				<InputLabel sx={{ color: '#1E1E1E !important' }}>{t('searchBar.select.title')}</InputLabel>
				<Select
					sx={{ color: '#1E1E1E !important' }}
					label={t('searchBar.select.title')}
					value={sorting}
					onChange={(e) => dispatch(setSorting(e.target.value))}
				>
					<MenuItem value='Popularity'>{t('searchBar.select.popularity')}</MenuItem>
					<MenuItem value='Rating'>{t('searchBar.select.rating')}</MenuItem>
					<MenuItem value='Upcoming'>{t('searchBar.select.upcoming')}</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}

export default SearchBlock;

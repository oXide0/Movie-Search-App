import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { setSorting, selectSorting } from '../features/sortingSlice';
import { searchBlockStyles } from '../utils/styles';

interface SearchBlockProps {
	setQuery: (query: string) => void;
}

function SearchBlock({ setQuery }: SearchBlockProps) {
	const [searchValue, setSearchValue] = useState('');
	const sorting = useAppSelector(selectSorting);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!searchValue.trim()) {
			return;
		}
		setQuery(searchValue);
	};

	const sortHandler = (e: SelectChangeEvent) => {
		setSearchValue('');
		setQuery('');
		dispatch(setSorting(e.target.value));
	};

	return (
		<Box sx={searchBlockStyles}>
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
				<IconButton type='submit' sx={{ p: '10px' }}>
					<SearchIcon />
				</IconButton>
			</Paper>
			<FormControl sx={{ width: '200px', background: '#fff !important', borderRadius: '5px' }}>
				<InputLabel sx={{ color: '#1E1E1E !important' }}>{t('searchBar.select.title')}</InputLabel>
				<Select
					sx={{ color: '#1E1E1E !important' }}
					label={t('searchBar.select.title')}
					value={sorting}
					onChange={sortHandler}
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

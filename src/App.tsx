import { useState, lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LazyHeader = lazy(() => import('./components/Header'));
const LazyDrawer = lazy(() => import('./components/Drawer'));
const LazyMovieList = lazy(() => import('./components/MovieList'));
const LazySearchBlock = lazy(() => import('./components/SearchBlock'));

function App() {
	const [query, setQuery] = useState('');

	return (
		<Suspense fallback={<CircularProgress sx={{ position: 'absolute', left: '49%', top: '49%' }} />}>
			<LazyHeader />
			<LazyDrawer />
			<main style={{ paddingTop: '100px' }}>
				<LazySearchBlock setQuery={setQuery} />
				<section className='movies'>
					<LazyMovieList query={query} />
				</section>
			</main>
		</Suspense>
	);
}

export default App;

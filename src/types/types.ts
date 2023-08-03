type TypeGenre = {
	name: string;
};

export type TypeSeverity = 'success' | 'error';

export interface IMovie {
	poster_path: string;
	id: number;
	title: string;
	vote_average: number;
	overview: string;
	release_date: string;
	genres: TypeGenre[];
}

export type TypeLanguage = 'en' | 'uk';

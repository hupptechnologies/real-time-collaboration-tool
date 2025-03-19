import { Optional } from 'sequelize';
export type TConfigEnvironments = 'development' | 'test' | 'production';
export interface IQuery {
	search: string;
	limit: number;
	offset: number;
	field: string;
	sort: string;
	type: string;
	recent: boolean;
}

export type TQuery = Optional<
	IQuery,
	'search' | 'limit' | 'offset' | 'field' | 'sort' | 'type' | 'recent'
>;

export interface ISpace {
	id?: number;
	name: string;
	description: string;
}

export interface ISpaceState {
	spaces: ISpace[];
	loading: boolean;
	error: string | null;
}

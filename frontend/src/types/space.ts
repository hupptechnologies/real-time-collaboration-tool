import React from 'react';
import { IAPIResponse } from './common';
export interface ISpace {
	id?: number;
	name?: string;
	description?: string;
}

export interface ISpaceState {
	space: ISpace;
	spaces: ISpace[];
	loading: boolean;
	error: string | null;
}

export interface ISpaceFormProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit?: (_values: ISpace) => void | Promise<void>;
}

export interface ISpaceThunkProps {
	data: ISpace;
	callback?: (_data: IAPIResponse<ISpace>) => void;
}

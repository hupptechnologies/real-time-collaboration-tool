import React from 'react';
import { IFolder, IPage } from './folder';
export interface ISpace {
	id?: number;
	name?: string;
	description?: string;
	folders?: IFolder[];
	pages?: IPage[];
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
export interface IDrawerLeftProps {
	children?: React.ReactNode;
	name: string;
	description: string;
	data: IFolder[];
}

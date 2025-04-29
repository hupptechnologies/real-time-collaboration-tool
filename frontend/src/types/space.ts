import React from 'react';
import { IAPIResponse } from './common';
import { IFolder } from './folder';
export interface ISpace {
	id?: number;
	name?: string;
	description?: string;
	folders?: IFolder[];
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

export interface IDrawerLeftProps {
	children?: React.ReactNode;
	name: string;
	description: string;
	data: IFolder[];
}

export interface IDocument {
	name: string;
	description: string;
}

export type FolderContextMenuProps = {
	open: boolean;
	position: { mouseX: number; mouseY: number } | null;
	onClose: () => void;
};

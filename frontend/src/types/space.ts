import React from 'react';
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

export interface ISpaceForm {
	name: string;
	description?: string;
}

export interface ISpaceFormProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit?: (_values: ISpaceForm) => void | Promise<any>;
}

import React from 'react';
export interface ISpace {
	id?: number;
	name: string;
	description?: string;
}

export interface ISpaceState {
	spaces: ISpace[];
	loading: boolean;
	error: string | null;
}

export interface ISpaceFormProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit?: (_values: ISpace) => void | Promise<any>;
}

export interface ISpaceThunkProps {
	data: ISpace;
	callback: (_data: any) => void;
}

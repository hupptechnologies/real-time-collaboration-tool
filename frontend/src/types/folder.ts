import React from 'react';
import { IDocument } from './space';

export interface IFolder {
	readonly id: number;
	name: string;
	description: string;
	parentFolderId: number | null;
	spaceId?: number;
	userId?: number;
	documents?: IDocument[];
	folders?: IFolder[];
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
}

export type IFolderCreationAttribute = Pick<
	IFolder,
	'name' | 'description' | 'parentFolderId' | 'spaceId'
>;

export interface IFolderForm {
	spaceId: number;
	parentFolderId: number | null;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit?: (_values: IFolderCreationAttribute) => void | Promise<void>;
}

export type TMenuOption = 'new' | 'more';

export interface IFolderListItemProps {
	folder: IFolder;
	openFolder: Record<string, boolean>;
	level?: number;
	editingFolderId: number | null;
	menuItem: IFolder | undefined | null;
	onRenameFolder: (_id: number, _newName: string) => void;
	toggleFolder: (_folder: IFolder) => void;
	openDocument: (_doc: IDocument) => void;
	handleContextMenu: (
		_e: React.MouseEvent<HTMLDivElement>,
		_item: IFolder | null,
		_type: TMenuOption
	) => void;
}

export type IFolderContextMenuProps = {
	open: boolean;
	position: { mouseX: number; mouseY: number } | null;
	menuItems: IContextMenuElement[];
	handleOnclose: () => void;
};

export interface IContextMenu {
	mouseX: number;
	mouseY: number;
	type: TMenuOption;
	target: 'folder' | 'document';
	item: IFolder | null;
}

interface IContextMenuItem {
	label: string;
	icon: React.ReactNode;
	handleOnclick?: () => void;
}

interface IContextMenuDivider {
	divider: true;
}

type IContextMenuElement = IContextMenuItem | IContextMenuDivider;

export interface IFolderState {
	loading: boolean;
	error: string | null;
}

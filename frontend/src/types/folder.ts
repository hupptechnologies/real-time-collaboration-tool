import React from 'react';
import { ISpace } from './space';
export interface IFolder {
	readonly id: number;
	name: string;
	description: string;
	parentFolderId: number | null;
	spaceId?: number;
	userId?: number;
	pages?: IPage[];
	folders?: IFolder[];
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
}

export type TPageStatus = 'draft' | 'published' | 'archived';
export interface IPage {
	readonly id?: number;
	title: string;
	content: string;
	status: TPageStatus;
	parentId?: number | null;
	folderId?: number | null;
	spaceId: number;
	userId: number;
	pages?: IPage[];
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
}

export type IPageCreationAttribute = Pick<
	IPage,
	'title' | 'content' | 'status' | 'parentId' | 'spaceId' | 'folderId'
>;

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
export type THandleContextMenuFn = (
	_e: React.MouseEvent<HTMLDivElement>,
	_item: IFolder | IPage | null,
	_type: TMenuOption
) => void;

export interface IFolderListItemProps {
	folder: IFolder;
	openFolder: Record<string, boolean>;
	level?: number;
	editingFolderId: number | null;
	menuItem: IFolder | IPage | undefined | null;
	handleRename: (_item: IFolder | IPage, _name: string, _type: 'folder' | 'page') => void;
	toggleFolder: (_folder: IFolder) => void;
	handleContextMenu: THandleContextMenuFn;
	editingPageId?: number | null;
	openPages?: Record<string, boolean>;
	selectedPageId?: number | null;
}

export interface IPageListItemProps {
	page: IPage;
	level?: number;
	menuItem: IPage | IFolder;
	handleContextMenu: THandleContextMenuFn;
	editingPageId?: number | null;
	handleRename: (_item: IFolder | IPage, _name: string, _type: 'folder' | 'page') => void;
	openPages?: Record<string, boolean>;
	selectedPageId?: number | null;
}

export interface ISelectedItem {
	type: 'folder' | 'page' | 'default';
	item: IPage | ISpace | null;
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
	target: 'folder' | 'page';
	item: IFolder | IPage | null;
}

export interface IContextMenuItem {
	label: string;
	icon: React.ReactNode;
	handleOnclick?: () => void;
}

export interface IContextMenuDivider {
	divider: true;
}

export type IContextMenuElement = IContextMenuItem | IContextMenuDivider;

export interface IFolderState {
	loading: boolean;
	error: string | null;
}
export interface IPageState {
	loading: boolean;
	error: string | null;
	page: IPage | null;
}

export interface IListItemActionButtonsProps {
	option: IFolder | IPage;
	menuItem: IFolder | IPage;
	handleContextMenu: THandleContextMenuFn;
}

export interface IDrawerMenuProps {
	selectedItem: ISelectedItem;
	setSelectedItem: (_item: ISelectedItem) => void;
}

export interface IMuiRichTextEditorProps {
	item: IPage | ISpace | null;
	onContentChange?: (_content: string) => void;
}

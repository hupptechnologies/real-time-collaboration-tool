import { IDocument } from './space';

export interface IFolder {
	readonly id: number;
	name: string;
	description: string;
	parentFolderId: number | null;
	spaceId?: number;
	userId: number;
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

export interface FolderListItemProps {
	folder: IFolder;
	openFolder: Record<string, boolean>;
	level?: number;
	toggleFolder: (_folder: IFolder) => void;
	openDocument: (_doc: IDocument) => void;
	handleContextMenu: (_e: React.MouseEvent<HTMLButtonElement>) => void;
}

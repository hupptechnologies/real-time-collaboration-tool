import { IFolder, IPage } from '@/types';

const sortFolders = (folderList: IFolder[]) => {
	folderList.sort((a, b) => a.name.localeCompare(b.name));
	folderList.forEach((folder) => {
		if (Array.isArray(folder.folders)) {
			sortFolders(folder.folders);
		}
	});
};

export const restructureFolders = (
	folders: IFolder[],
	pages: IPage[]
): { folders: IFolder[]; rootPages: IPage[] } => {
	const folderMap: { [key: number]: IFolder } = {};
	const pageMap: { [key: number]: IPage & { pages?: IPage[] } } = {};
	const result: IFolder[] = [];
	const rootPages: IPage[] = [];

	folders.forEach((folder) => {
		folderMap[folder.id] = { ...folder, folders: [], pages: [] };
	});

	// First, create a map of all pages
	pages.forEach((page) => {
		if (!page.id) {
			return;
		}
		pageMap[page.id] = { ...page, pages: [] };
	});

	// Assign pages to their parent page if parentId exists
	pages.forEach((page) => {
		if (!page.id) {
			return;
		}
		if (page.parentId && pageMap[page.parentId]) {
			if (!pageMap[page.parentId].pages) {
				pageMap[page.parentId].pages = [];
			}
			pageMap[page.parentId]?.pages?.push(pageMap[page.id]);
		}
	});

	// Assign only true root pages (no folderId, no parentId) to rootPages, and assign top-level pages to folders
	pages.forEach((page) => {
		if (!page.id) {
			return;
		}
		const isNested = !!page.parentId && pageMap[page.parentId];
		if (!isNested) {
			if (page.folderId && folderMap[page.folderId]) {
				if (!folderMap[page.folderId].pages) {
					folderMap[page.folderId].pages = [];
				}
				folderMap[page.folderId]?.pages?.push(pageMap[page.id]);
			} else if (!page.parentId) {
				rootPages.push(pageMap[page.id]);
			}
		}
	});

	// Build folder tree
	folders.forEach((folder) => {
		if (folder.parentFolderId === null) {
			result.push(folderMap[folder.id]);
		} else {
			const parentFolder = folderMap[folder.parentFolderId];
			if (parentFolder) {
				parentFolder?.folders?.push(folderMap[folder.id]);
			}
		}
	});

	sortFolders(result);
	return { folders: result, rootPages };
};

export const generateDefaultFolderName = (
	existingFolders: IFolder[],
	baseName = 'Untitled Folder'
): string => {
	const existingNames = existingFolders.map((f) => f.name);
	let index = 1;

	while (existingNames.includes(`${baseName} ${index}`)) {
		index++;
	}

	return `${baseName} ${index}`;
};

export const findPagePathInTree = (
	folders: IFolder[],
	rootPages: IPage[],
	pageId: number
): { folderPath: number[]; foundPage: IPage | null } => {
	// Helper to search pages recursively (for nested pages)
	function searchPages(
		pages: IPage[],
		parentFolderPath: number[]
	): { folderPath: number[]; foundPage: IPage | null } {
		for (const page of pages) {
			if (page.id === pageId) {
				return { folderPath: parentFolderPath, foundPage: page };
			}
			if (page.pages && page.pages.length > 0) {
				const result = searchPages(page.pages, parentFolderPath);
				if (result.foundPage) {
					return result;
				}
			}
		}
		return { folderPath: [], foundPage: null };
	}

	// Search root pages
	const rootResult = searchPages(rootPages, []);
	if (rootResult.foundPage) {
		return rootResult;
	}

	// Helper to search folders recursively
	function searchFolders(
		folders: IFolder[],
		parentPath: number[]
	): { folderPath: number[]; foundPage: IPage | null } {
		for (const folder of folders) {
			// Search pages in this folder
			if (folder.pages && folder.pages.length > 0) {
				const result = searchPages(folder.pages, [...parentPath, folder.id]);
				if (result.foundPage) {
					return result;
				}
			}
			// Search subfolders
			if (folder.folders && folder.folders.length > 0) {
				const result = searchFolders(folder.folders, [...parentPath, folder.id]);
				if (result.foundPage) {
					return result;
				}
			}
		}
		return { folderPath: [], foundPage: null };
	}

	return searchFolders(folders, []);
};

export const getParentPagePath = (
	page: any,
	acc: number[] = [],
	folders: IFolder[],
	rootPages: IPage[]
): number[] => {
	if (page && page.parentId) {
		acc.unshift(page.parentId);
		const parent = findPageById(folders, rootPages, page.parentId);
		return getParentPagePath(parent, acc, folders, rootPages);
	}
	return acc;
};

export const findPageById = (folders: IFolder[], rootPages: IPage[], id: number): IPage | null => {
	for (const page of rootPages) {
		if (page.id === id) {
			return page;
		}
		if (page.pages && page.pages.length > 0) {
			const found = findPageById([], page.pages, id);
			if (found) {
				return found;
			}
		}
	}
	for (const folder of folders) {
		if (folder.pages && folder.pages.length > 0) {
			const found = findPageById([], folder.pages, id);
			if (found) {
				return found;
			}
		}
		if (folder.folders && folder.folders.length > 0) {
			const found = findPageById(folder.folders, [], id);
			if (found) {
				return found;
			}
		}
	}
	return null;
};

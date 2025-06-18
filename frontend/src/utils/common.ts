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

export const folderOptionalData = [
	{
		id: 1,
		name: 'Folder A',
		description: 'This is Folder A folder.',
		documents: [
			{ name: 'Doc 1', description: 'This is Document 1.' },
			{ name: 'Doc 2', description: 'This is Document 2.' }
		],
		parentFolderId: null,
		userId: 1,
		folders: [
			{
				id: 3,
				name: 'Subfolder 1',
				description: 'Subfolder 1 inside Folder A.',
				documents: [{ name: 'Doc 3', description: 'Document in Subfolder 1.' }],
				parentFolderId: 1,
				userId: 1,
				folders: [
					{
						id: 4,
						name: 'subFolder 2',
						description: 'Subfolder 2 inside Folder A.',
						parentFolderId: 3,
						userId: 1
					},
					{
						id: 5,
						name: 'subFolder 2.1',
						description: 'Subfolder 2.1 inside Folder A.',
						documents: [{ name: 'Doc 4', description: 'Document in Subfolder 2.1.' }],
						parentFolderId: 3,
						userId: 1
					}
				]
			}
		]
	},
	{
		id: 2,
		name: 'Folder B',
		description: 'This is Folder B folder.',
		parentFolderId: null,
		userId: 1,

		documents: [
			{ name: 'Doc 4', description: 'This is Document 4.' },
			{ name: 'Doc 5', description: 'This is Document 5.' }
		]
	}
];

export const exampleContent =
	'<h2 style="text-align: center">Hey there 👋</h2><p>This is a <em>basic</em> example of <code>mui-tiptap</code>, which combines <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with customizable <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of additional components and extensions! Sure, there are <strong>all <em>kinds</em> of <s>text</s> <u>formatting</u> options</strong> you’d probably expect from a rich text editor. But wait until you see the <span data-type="mention" data-id="15" data-label="Axl Rose">@Axl Rose</span> mentions and lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. <strong><span style="color: #ff9900">But wait, </span><span style="color: #403101"><mark data-color="#ffd699" style="background-color: #ffd699; color: inherit">there’s more!</mark></span></strong> Let’s try a code block:</p><pre><code class="language-css">body {\n  display: none;\n}</code></pre><p></p><p>That’s only the tip of the iceberg. Feel free to add and resize images:</p><img height="auto" src="https://picsum.photos/600/400" alt="random image" width="350" style="aspect-ratio: 3 / 2"><p></p><p>Organize information in tables:</p><table><tbody><tr><th colspan="1" rowspan="1"><p>Name</p></th><th colspan="1" rowspan="1"><p>Role</p></th><th colspan="1" rowspan="1"><p>Team</p></th></tr><tr><td colspan="1" rowspan="1"><p>Alice</p></td><td colspan="1" rowspan="1"><p>PM</p></td><td colspan="1" rowspan="1"><p>Internal tools</p></td></tr><tr><td colspan="1" rowspan="1"><p>Bob</p></td><td colspan="1" rowspan="1"><p>Software</p></td><td colspan="1" rowspan="1"><p>Infrastructure</p></td></tr></tbody></table><p></p><p>Or write down your groceries:</p><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Milk</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Eggs</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Sriracha</p></div></li></ul><blockquote><p>Wow, that’s amazing. Good work! 👏 <br>— Mom</p></blockquote><p>Give it a try and click around!</p>';

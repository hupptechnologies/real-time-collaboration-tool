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

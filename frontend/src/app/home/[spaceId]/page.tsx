'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import DrawerLeft from '@/components/DrawerLeft';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchSingleSpaceAction } from '@/redux/space';
import { IFolder } from 'types/space';

const SpacePage: React.FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const { space } = useAppSelector((state: RootState) => state.space);
	const spaceId = params?.spaceId as string;

	const data: IFolder[] = [
		{
			name: 'Project A',
			description: 'This is Project A folder.',
			documents: [
				{ name: 'Doc 1', description: 'This is Document 1.' },
				{ name: 'Doc 2', description: 'This is Document 2.' }
			],
			folders: [
				{
					name: 'Subfolder 1',
					description: 'Subfolder 1 inside Project A.',
					documents: [{ name: 'Doc 3', description: 'Document in Subfolder 1.' }]
				}
			]
		},
		{
			name: 'Project B',
			description: 'This is Project B folder.',
			documents: [
				{ name: 'Doc 4', description: 'This is Document 4.' },
				{ name: 'Doc 5', description: 'This is Document 5.' }
			]
		}
	];

	useEffect(() => {
		if (spaceId) {
			dispatch(fetchSingleSpaceAction({ data: { id: Number(spaceId) } }));
		}
	}, [spaceId]);

	return (
		<div>
			<DrawerLeft
				name={space.name as string}
				description={space.description as string}
				data={data}
			/>
		</div>
	);
};

export default SpacePage;

'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import DrawerLeft from '@/components/DrawerLeft';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchSingleSpaceAction } from '@/redux/space';

const SpacePage: React.FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const { space } = useAppSelector((state: RootState) => state.space);
	const spaceId = params?.spaceId as string;

	useEffect(() => {
		if (spaceId) {
			dispatch(fetchSingleSpaceAction({ data: { id: Number(spaceId) } }));
		}
	}, [spaceId]);

	return (
		<div>
			<DrawerLeft name={space.name as string} />
		</div>
	);
};

export default SpacePage;

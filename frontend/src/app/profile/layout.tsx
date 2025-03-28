import { Metadata } from 'next';
import { TProps } from '@/types';

export const metadata: Metadata = {
	title: 'Profile'
};

const ProfileLayout: React.FC<TProps> = ({ children }: TProps) => {
	return <>{children}</>;
};

export default ProfileLayout;

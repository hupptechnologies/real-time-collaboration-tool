import { Metadata } from 'next';
import { TProps } from '@/types';

export const metadata: Metadata = {
	title: 'Home'
};

const HomeLayout: React.FC<TProps> = ({ children }) => {
	return <>{children}</>;
};

export default HomeLayout;

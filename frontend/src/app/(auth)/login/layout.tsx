import { Metadata } from 'next';
import { TProps } from '@/types';

export const metadata: Metadata = {
	title: 'Sign In'
};

const SignInLayout: React.FC<TProps> = ({ children }) => {
	return <>{children}</>;
};

export default SignInLayout;

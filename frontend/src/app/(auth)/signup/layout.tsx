import { Metadata } from 'next';
import { TProps } from '@/types';

export const metadata: Metadata = {
	title: 'Sign Up'
};

const SignInLayout: React.FC<TProps> = ({ children }) => {
	return <>{children}</>;
};

export default SignInLayout;

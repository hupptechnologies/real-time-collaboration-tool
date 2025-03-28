import ProviderLayout from '@/components/ProviderLayout';
import { TProps } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		default: 'real-time-collaboration-tool',
		template: '%s | real-time-collaboration-tool'
	},
	keywords: ['Next.js', 'TypeScript', 'SEO']
};

const RootLayout: React.FC<TProps> = ({ children }: TProps) => {
	return (
		<html lang="en">
			<body>
				<ProviderLayout>{children}</ProviderLayout>
			</body>
		</html>
	);
};

export default RootLayout;

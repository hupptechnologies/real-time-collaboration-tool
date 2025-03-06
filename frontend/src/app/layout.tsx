import ProviderLayout from '@/components/ProviderLayout';
import { TProps } from '@/types';

const RootLayout: React.FC<TProps> = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<ProviderLayout>{children}</ProviderLayout>
			</body>
		</html>
	);
};

export default RootLayout;

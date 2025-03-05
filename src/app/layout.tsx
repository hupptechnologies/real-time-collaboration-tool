import AppBar from '@/components/AppBar';
import ProviderLayout from '@/components/providerLayout';
import { TComponent } from '@/types';

const RootLayout: React.FC<TComponent> = ({ children }: TComponent) => {
	return (
		<html lang="en">
			<body>
				<AppBar />
				<ProviderLayout>{children}</ProviderLayout>
			</body>
		</html>
	);
};

export default RootLayout;

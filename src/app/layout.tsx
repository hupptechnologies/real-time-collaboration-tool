import ProviderLayout from '@/components/providerLayout';
import { TComponent } from '@/types';

const RootLayout: React.FC<TComponent> = ({ children }: TComponent) => {
	return (
		<html lang="en">
			<body>
				<ProviderLayout>{children}</ProviderLayout>
			</body>
		</html>
	);
};

export default RootLayout;

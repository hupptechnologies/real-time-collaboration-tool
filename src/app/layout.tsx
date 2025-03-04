import ThemeRegistry from '@/theme/ThemeRegistry';
import { TComponent } from '@/types';

const RootLayout: React.FC<TComponent> = ({ children }: TComponent) => {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>{children}</ThemeRegistry>
			</body>
		</html>
	);
};

export default RootLayout;

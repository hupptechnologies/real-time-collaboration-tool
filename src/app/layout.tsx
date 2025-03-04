import ThemeRegistry from '@/theme/ThemeRegistry';

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>{children}</ThemeRegistry>
			</body>
		</html>
	);
};

export default RootLayout;

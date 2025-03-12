import { useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { ToasterContext } from './ToasterContext';
import { TProps } from '@/types';

const ToasterProvider: React.FC<TProps> = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState<AlertColor>('info');

	const showToaster = (message: string, severity: AlertColor) => {
		setMessage(message);
		setSeverity(severity);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<ToasterContext.Provider value={{ showToaster }}>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
		</ToasterContext.Provider>
	);
};

export default ToasterProvider;

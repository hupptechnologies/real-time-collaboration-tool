import { SyntheticEvent, useEffect, useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { resetErrorHandler } from '@/redux/error/slice';
import { ToasterContext } from './ToasterContext';
import { TProps } from '@/types';

const ToasterProvider: React.FC<TProps> = ({ children }) => {
	const dispatch = useAppDispatch();
	const { isOpen, message: error, type } = useAppSelector((state: any) => state.error);
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState<AlertColor>('info');
	const showToaster = (message: string, severity: AlertColor) => {
		setMessage(message);
		setSeverity(severity);
		setOpen(true);
	};

	const handleClose = (_event: Event | SyntheticEvent<Element, Event>, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		dispatch(resetErrorHandler());
	};

	useEffect(() => {
		if (isOpen) {
			showToaster(error, type);
		}
	}, [isOpen]);

	return (
		<ToasterContext.Provider value={{ showToaster }}>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={3000}
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

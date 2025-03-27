import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button
} from '@mui/material';
import { IConfirmModalProps } from '@/types';

const ConfirmModal: React.FC<IConfirmModalProps> = ({ open, title, subTitle, onClose }) => {
	return (
		<Dialog open={open} onClose={() => onClose(false)}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{subTitle}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onClose(false)} color="secondary">
					Cancel
				</Button>
				<Button onClick={() => onClose(true)} color="primary" variant="contained">
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmModal;

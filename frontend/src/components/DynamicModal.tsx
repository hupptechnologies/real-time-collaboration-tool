import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IModalProps } from '@/types';
import { DialogModalTitleStyle } from '@/styles';

const DynamicModal: React.FC<IModalProps> = ({
	open,
	onClose,
	title,
	content,
	showCloseButton = true
}) => {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
			<DialogTitle sx={DialogModalTitleStyle}>
				{title && (
					<Typography variant="body1" sx={{ flexGrow: 1 }}>
						{title}
					</Typography>
				)}
				{showCloseButton && (
					<IconButton onClick={onClose} size="small" aria-label="close">
						<CloseIcon />
					</IconButton>
				)}
			</DialogTitle>
			{content && <DialogContent>{content}</DialogContent>}
		</Dialog>
	);
};

export default DynamicModal;

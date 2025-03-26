import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModalProps } from '@/types';
import { DialogModelTitleStyle } from '@/styles';

const DynamicModal: React.FC<ModalProps> = ({
	open,
	onClose,
	title,
	content,
	showCloseButton = true
}) => {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle sx={DialogModelTitleStyle}>
				{title && <Typography variant="body1">{title}</Typography>}
				<Box sx={{ flexGrow: 1 }} />
				{showCloseButton && (
					<IconButton onClick={onClose} size="small">
						<CloseIcon />
					</IconButton>
				)}
			</DialogTitle>
			<DialogContent>{content}</DialogContent>
		</Dialog>
	);
};

export default DynamicModal;

'use client';
import React from 'react';
import { Box, Button, FormControl, TextField, Container } from '@mui/material';
import { useFormik } from 'formik';
import { IFolderCreationAttribute, IFolderForm } from '@/types';
import { folderValidationSchema } from '@/utils/validation';
import { emailBoxStyles, FormButtonBox } from '@/styles';

const FolderForm: React.FC<IFolderForm> = ({
	setOpen,
	handleSubmit = () => {},
	spaceId,
	parentFolderId
}) => {
	const formik = useFormik<IFolderCreationAttribute>({
		initialValues: { name: '', description: '', parentFolderId: parentFolderId, spaceId: spaceId },
		validationSchema: folderValidationSchema,
		onSubmit: (values: IFolderCreationAttribute) => handleSubmit(values)
	});

	return (
		<Container style={{ padding: 0 }}>
			<Box component="form" onSubmit={formik.handleSubmit} noValidate sx={emailBoxStyles}>
				<FormControl>
					<TextField
						value={formik.values.name}
						onChange={formik.handleChange}
						error={formik.touched.name && !!formik.errors.name}
						helperText={formik.touched.name && formik.errors.name}
						label="Name"
						id="name"
						type="name"
						name="name"
						autoComplete="name"
						autoFocus
						required
						fullWidth
						variant="standard"
						color={formik.touched.name && !!formik.errors.name ? 'error' : 'primary'}
					/>
				</FormControl>
				<Box sx={FormButtonBox}>
					<Button sx={{ marginRight: '15px' }} variant="outlined" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button variant="contained" type="submit">
						Save
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default FolderForm;

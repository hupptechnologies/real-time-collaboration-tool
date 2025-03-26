'use client';
import React from 'react';
import { Box, Button, FormLabel, FormControl, TextField, Container } from '@mui/material';
import { useFormik } from 'formik';
import { ISpace, ISpaceFormProps } from '@/types';
import { spaceValidationSchema } from '@/utils/validation';
import { emailBoxStyles, FormButtonBox } from '@/styles';

const SpaceForm: React.FC<ISpaceFormProps> = ({ setOpen, handleSubmit = () => {} }) => {
	const formik = useFormik<ISpace>({
		initialValues: { name: '', description: '' },
		validationSchema: spaceValidationSchema,
		onSubmit: (values: ISpace) => handleSubmit(values)
	});

	return (
		<Container style={{ padding: 0 }}>
			<Box component="form" onSubmit={formik.handleSubmit} noValidate sx={emailBoxStyles}>
				<FormControl>
					<FormLabel htmlFor="name">Space Name</FormLabel>
					<TextField
						value={formik.values.name}
						onChange={formik.handleChange}
						error={formik.touched.name && !!formik.errors.name}
						helperText={formik.touched.name && formik.errors.name}
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
				<FormControl>
					<FormLabel htmlFor="description">description</FormLabel>
					<TextField
						value={formik.values.description}
						onChange={formik.handleChange}
						error={formik.touched.description && !!formik.errors.description}
						helperText={formik.touched.description && formik.errors.description}
						name="description"
						type="description"
						id="description"
						autoComplete="current-description"
						autoFocus
						required
						fullWidth
						variant="standard"
						color={formik.touched.description && !!formik.errors.description ? 'error' : 'primary'}
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

export default SpaceForm;

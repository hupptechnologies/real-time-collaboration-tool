import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
	email: Yup.string().required('Email is required'),
	password: Yup.string().required('Password is required')
});

export const signupValidationSchema = Yup.object({
	username: Yup.string()
		.required('Username is required')
		.min(3, 'Username must be at least 3 characters')
		.max(20, 'Username must be at most 20 characters')
		.matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
	email: Yup.string().required('Email is required').email('Invalid email format'),
	password: Yup.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/[0-9]/, 'Password must contain at least one number')
		.matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
});

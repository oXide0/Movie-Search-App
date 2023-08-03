import Snackbar from '@mui/material/Snackbar';
import { forwardRef } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { TypeSeverity } from '../types/types';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

interface CustomizedSnackbarProps {
	active: boolean;
	setActive: (value: boolean) => void;
	type: TypeSeverity;
}

function CustomizedSnackbar({ active, setActive, type }: CustomizedSnackbarProps) {
	const { t } = useTranslation();

	const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setActive(false);
	};

	return (
		<Snackbar open={active} autoHideDuration={2000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
				{type === 'success' ? t('snackbar.added') : t('snackbar.alreadyAdded')}
			</Alert>
		</Snackbar>
	);
}

export default CustomizedSnackbar;

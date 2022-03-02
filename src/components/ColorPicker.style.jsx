import { makeStyles } from '@mui/styles';

// eslint-disable-next-line import/prefer-default-export
export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: 'max-content',
    position: 'relative',
  },
  colorPickerButton: {
    margin: 0,
    zIndex: 2,
    top: '50%',
    right: '4px',
    position: 'absolute !important',
    transform: 'translateY(-50%)',
    minWidth: 'unset !important',
    backgroundColor: 'unset !important',
    padding: 'unset !important',
  },
});

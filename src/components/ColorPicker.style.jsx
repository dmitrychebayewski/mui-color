import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: 'max-content',
    position: 'relative',
  },
  colorPickerButton: {
    margin: 6,
    // zIndex: 2,
    top: '6px',
    right: '8px',
    // position: 'absolute !important',
    minWidth: 'unset !important',
    backgroundColor: 'unset !important',
    padding: 'unset !important',
  },
});

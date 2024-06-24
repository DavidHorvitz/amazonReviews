import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { open, onClose, data } = props;

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Filtered Data"}</DialogTitle>
            <DialogContent sx={{ width: 400 }}>
                {Array.isArray(data) ? (
                    data.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ justifyContent: 'center' }}>
                                    <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary={item.join(' - ')} />
                                </ListItemButton>
                            </ListItem>
                            {index !== data.length - 1 && <Divider />}
                        </React.Fragment>
                    ))
                ) : (
                    <ListItemText primary="No data" />
                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

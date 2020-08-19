import React from 'react';
import ResetIcon from '@material-ui/icons/RotateLeft';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ResetOptions from './ResetOptions';
import httpClient from '../provider/httpClient';
import { Config } from '../config';

class ResetMenuItem extends React.Component {
    state = {
        open: false,
        optionsValue: {
            resetTweets: false,
            resetTasksAndAnnotations: false,
            resetCategories: false,
        },
    };

    isAdmin() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return user.role == 'admin';
        }
        return false;
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleCancel = () => {
        this.setState({ open: false });
    };

    handleReset = async () => {
        try {
            const { json: data } = await httpClient(`${Config.apiUrl}/api/data/reset`, {
                method: 'POST',
                body: JSON.stringify(this.state.optionsValue),
            });
            alert(data.message);
            window.location.reload();
        } catch (e) { }
        this.setState({ open: false });
    };

    handleOptionsChange = (option) => {
        switch (option) {
            case 'tasks_and_annotations':
                this.setState((prevState) => {
                    var { optionsValue } = prevState;
                    if (!optionsValue.resetCategories && !optionsValue.resetTweets) {
                        optionsValue.resetTasksAndAnnotations = !optionsValue.resetTasksAndAnnotations;
                    }
                    return {
                        optionsValue
                    }
                });
                break;
            case 'categories':
                this.setState((prevState) => {
                    var { optionsValue } = prevState;
                    optionsValue.resetCategories = !optionsValue.resetCategories;
                    if (optionsValue.resetCategories) {
                        optionsValue.resetTasksAndAnnotations = true;
                    }
                    return {
                        optionsValue
                    }
                });
                break;
            case 'tweets':
                this.setState((prevState) => {
                    var { optionsValue } = prevState;
                    optionsValue.resetTweets = !optionsValue.resetTweets;
                    if (optionsValue.resetTweets) {
                        optionsValue.resetTasksAndAnnotations = true;
                    }
                    return {
                        optionsValue
                    }
                });
                break;
        }
    };

    render() {
        const { translate } = this.props;
        return this.isAdmin() ?
            <>
                <MenuItem onClick={this.handleOpen}>
                    <ListItemIcon>
                        <ResetIcon style={{ fill: "red" }} />
                    </ListItemIcon>
                    <ListItemText inset primary={translate('resources.general.reset')} />
                </MenuItem>
                <Dialog
                    disableEnforceFocus
                    open={this.state.open}
                    onClose={this.handleCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{translate('resources.reset.title')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {translate('resources.reset.description')}
                        </DialogContentText>
                        <ResetOptions {...this.props} value={this.state.optionsValue} onChange={this.handleOptionsChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                            {translate('resources.general.cancel')}
                        </Button>
                        <Button onClick={this.handleReset} style={{ color: 'red' }} autoFocus>
                            {translate('resources.general.reset')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
            : null;
    }
}

export default ResetMenuItem;
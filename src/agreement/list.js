import React, { Component } from 'react';
import { GET_LIST, CREATE, GET_MANY, Responsive, withDataProvider, translate } from 'react-admin';
import compose from 'recompose/compose';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Tooltip from '@material-ui/core/Tooltip';
import TweetText from '../twitter/TweetText';

const styles = theme => ({
    formControl: {
        margin: 4,
        minWidth: 120,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
});

class AgreementList extends Component {
    state = {
        users: [], agreement: [], selected: [], open: false
    };
    componentDidMount() {
        this.fetchUsers();
    }

    handleChange1 = event => {
        this.setState({ selectuser1: event.target.value });
    };

    handleChange2 = event => {
        this.setState({ selectuser2: event.target.value });
    };

    handleCompareClick = () => {
        if (this.state.selectuser1 && this.state.selectuser2) {
            this.fetchAgreement()
        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAssign = () => {
        this.SaveAssign();
    };

    handleChangePopup = event => {
        this.setState({ selectassignuser: Number(event.target.value) });
    };

    async fetchUsers() {
        const { dataProvider } = this.props;
        const { data: users } = await dataProvider(GET_LIST, 'users',
            {
                filter: { role: 30 },
                sort: { field: 'name', order: 'ASC' },
                pagination: { page: 1, perPage: 100 }
            });
        this.setState({ users });
    }
    async SaveAssign() {
        const { dataProvider } = this.props;
        dataProvider(CREATE, 'agreement', { data: { userId: this.state.selectassignuser, tweetIds: this.state.selected } })
            .then(({ data }) => {
                alert("Assigned")
                this.setState({
                    open: false
                });
            })
            .catch(error => {
                alert(error.message)
            })
            .finally(() => {
                // fetchEnd();
            });
    }
    async fetchAgreement() {
        const { dataProvider } = this.props;
        const { data: agreement } = await dataProvider(GET_LIST, 'agreement',
            {
                filter: { userid1: this.state.selectuser1, userid2: this.state.selectuser2 },
                sort: { field: 'tweetid', order: 'ASC' },
                pagination: { page: 1, perPage: 100 }
            });
        this.setState({ agreement });
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({ selected: state.agreement.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    renderAssign() {
        const { classes } = this.props;

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={this.state.open}
                onClose={this.handleClose}
            >
                <DialogTitle>Assign ({this.state.selected.length}) Tweets</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="assignuser">New User</InputLabel>
                            <Select
                                native
                                value={this.state.selectassignuser}
                                onChange={this.handleChangePopup}
                                input={<Input id="assignuser" />}
                            >
                                <option value=''></option>
                                {this.state.users.filter(x => x.id != this.state.selectuser1 && x.id != this.state.selectuser2).map(({ id, name }) => {
                                    return (
                                        <option value={id}>{name}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
            </Button>
                    <Button onClick={this.handleAssign} color="primary" variant="contained">
                        Ok
            </Button>
                </DialogActions>
            </Dialog>)
    }

    renderAgreement() {
        const { classes } = this.props;

        let rowCount = this.state.agreement.length;
        let numSelected = this.state.selected.length;
        if (this.state.agreement && this.state.agreement.length > 0)
            return <Paper style={{ marginTop: '20px' }}>
                <Button variant="outlined" color="secondary"
                    onClick={this.handleClickOpen}
                    disabled={this.state.selected.length == 0 ? 'disabled' : null}
                    style={{ 'marginTop': '30px', 'marginRight': '20px', 'marginLeft': '20px' }}>
                    Assign
                            </Button>
                {this.renderAssign()}
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                    checked={numSelected === rowCount}
                                    onChange={this.handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>TweetId</TableCell>
                            <TableCell numeric>Category Agrement</TableCell>
                            <TableCell numeric>Dimension Agrement</TableCell>
                            <TableCell numeric>Reason Agrement</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.agreement.map(row => {
                            const isSelected = this.isSelected(row.id);

                            return (
                                <TableRow
                                    key={row.id}
                                    hover
                                    onClick={event => this.handleClick(event, row.id)}
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    selected={isSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={isSelected} />
                                    </TableCell>
                                    <TableCell >
                                        <Tooltip title={<TweetText isTooltip={true} record={row} source="tweetText"></TweetText>}><Typography>{row.tweetId}</Typography></Tooltip>
                                    </TableCell>
                                    <TableCell numeric>{row.categoryAgreement}</TableCell>
                                    <TableCell numeric>{row.categoryAgreement == 0 ? 'NA' : row.dimensionAgreement }</TableCell>
                                    <TableCell numeric>{row.categoryAgreement == 0 ? 'NA' : row.reasonAgreement }</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>

        return '';
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h1>Agreement</h1>
                <div className={classes.root}>
                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="selectfirstuser">User1</InputLabel>
                            <Select
                                native
                                value={this.state.selectuser1}
                                onChange={this.handleChange1}

                                inputProps={{
                                    name: 'selectuser1',
                                    id: 'selectfirstuser',
                                }}
                            >
                                <option value=''></option>
                                {this.state.users.map(({ id, name }) => {
                                    return (
                                        <option value={id}>{name}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="select-user2">User2</InputLabel>
                            <Select
                                native
                                value={this.state.selectuser2}
                                onChange={this.handleChange2}

                                inputProps={{
                                    name: 'selectuser2',
                                    id: 'select-user2',
                                }}
                            >
                                <option value=''></option>
                                {this.state.users.map(({ id, name }) => {
                                    return (
                                        <option value={id}>{name}</option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Button variant="contained" color="primary"
                            onClick={this.handleCompareClick}
                            style={{ 'marginTop': '30px', 'marginRight': '20px', 'marginLeft': '20px' }}>
                            Compare
                            </Button>
                    </div>
                </div>
                <div>
                    {this.renderAgreement()}
                </div>
            </div>
        );
    }
}


export default compose(
    translate,
    withDataProvider
)(withStyles(styles)(AgreementList));

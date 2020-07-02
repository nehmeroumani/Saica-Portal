import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/ZoomIn';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CloseIcon from '@material-ui/icons/Close';
import AccountReferenceField from '../account/AccountReferenceField';
import dataProviderFactory from '../../provider/dataProvider';
import { ReferenceArrayField, SingleFieldList, ChipField, DELETE, UPDATE, CREATE, GET_ONE, GET_MANY, Responsive, Title, DateField } from 'react-admin';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import FormLabel from '@material-ui/core/FormLabel';
import InfoIcon from '@material-ui/icons/Info';
import TweetEmbed from 'react-tweet-embed'

const editStyles = theme => ({
    root: {
        paddingTop: 40,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1em',
    },
    form: {
        padding: '30px',
        paddingTop: '0',
        [theme.breakpoints.up('xs')]: {
            width: 800,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            marginTop: -30,
        },
    },
    inlineField: {
        display: 'inline-block',
        width: '50%',
    },
    tweet: {
        marginRight: '20px',
        width: '100%',
        color: '#5c6363',
        fontSize: '20px',
        lineHeight: 1.5,
        direction: 'rtl',

        fontFamily: "'Almarai', sans-serifv !important"
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    mypopover: {
        padding: '20px',
        width: 300
    },
    mypopoverText: {
        padding: '10px',
        direction: 'rtl',
        lineHeight: 1.5,
        fontSize: '20px',
        fontFamily: "'Almarai', sans-serifv !important"
    }
});
const IconTheme = ({ record, size }) => (
    <Tooltip title=''>
      {record &&   <Chip className="arabic" label={record.name} style={{margin:5}} />}
    </Tooltip>
);



class ItemDrawer extends Component {
    state = { item: null, factType: null };

    componentDidMount() {
        if (this.props.id)
            this.fetchData(this.props.id);
        console.log('componentDidMount' + this.props.id)
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate' + prevProps.id)

        if (this.props.id !== prevProps.id) {
            this.fetchData(this.props.id);
        }
    }
    handleMouseUp = (event) => {
        console.log(event)
        if (window.getSelection().toString().length > 0) {
            this.setState({
                openPopover: true,
                selectedText: window.getSelection().toString(),
                anchorEl: event.currentTarget, anchorLeft: event.clientX, anchorTop: event.clientY
            });
        }
    };
    handleClose = () => {
        this.setState({ openPopover: false, selectedText: '', anchorEl: null });
    };
    async fetchData(id) {
        console.log(id)
        dataProviderFactory(GET_ONE, 'tweet', { id: id })
            .then(response => { this.setState({ item: response.data }); });

    }
    deleteFactDetected = (id) => {
        dataProviderFactory(DELETE, 'factdetected', {
            id: id
        })
            .then(({ data }) => {
                this.fetchData(this.props.id);
            })
            .catch(error => {
                alert("error");
                console.log(error)
            })
            .finally(() => {
                // Dispatch an action letting react-admin know a API call has ended
                //fetchEnd();
            });
    }
    saveFactDetected = () => {
        dataProviderFactory(CREATE, 'factdetected', {
            data: {
                itemId: this.state.item.id,
                accountId: this.state.item.twitterAppId,
                accountName: this.state.item.twitterAppName,
                accountId: this.state.item.twitterAppId,
                accountType: 'Twitter',
                factTypeId: this.state.factType,
                dictionaryId: this.state.item.firstDictionaryId,
                itemDate: this.state.item.tweetCreationDate,
                text: this.state.selectedText
            }
        })
            .then(({ data }) => {
                this.setState({ openPopover: false, selectedText: '', factType: '' });
                this.fetchData(this.props.id);
            })
            .catch(error => {
                alert("error");
                console.log(error)
            })
            .finally(() => {
                // Dispatch an action letting react-admin know a API call has ended
                //fetchEnd();
            });
    }
    handleChange = event => {
        this.setState({ factType: event.target.value });
    };
    render() {
        const { classes, onCancel, basePath } = this.props;
        const { openPopover, item, selectedText, anchorEl, anchorTop, anchorLeft, factType } = this.state;
        //const openPopover = Boolean(anchorEl);
        const options = item ? item.factTypes : [];
        return (
            <div className={classes.root}>
                <div className={classes.title}>
                    <Typography variant="title"> Tweet </Typography>
                    <IconButton onClick={onCancel}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className={classes.form}>
                    {
                        !item ? (<LinearProgress />) : (
                            <div>


                                {/* <Popover
                                    id={'123'}
                                    open={openPopover}
                                    // anchorEl={anchorEl}
                                    onClose={this.handleClose}
                                    anchorReference="anchorPosition"
                                    anchorPosition={{ top: anchorTop, left: anchorLeft }}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'center',
                                        horizontal: 'left',
                                    }}
                                >
                                    <div className={classes.mypopover}>
                                        <div>
                                            <Typography className={classes.mypopoverText}>{selectedText}</Typography>

                                        </div>
                                        <div style={{ marginTop: '10px' }}>
                                            <FormControl component="fieldset" >
                                                <FormLabel component="legend">Labeling</FormLabel>
                                                <RadioGroup aria-label="factType" name="factType" value={factType} onChange={this.handleChange}>
                                                    {options.map(option => (
                                                        <FormControlLabel value={option.id} key={option.id} control={<Radio />} label={option.name} />
                                                    ))}

                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div style={{ marginTop: '10px' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={this.saveFactDetected}
                                                className={classes.button}
                                                startIcon={<SaveIcon />}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </Popover> */}

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <div style={{ marginRight: '20px' }}>
                                            <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', marginBottom: '20px' }}>
                                                {/* <Avatar
                                                    src={item.userProfileImageUrl}
                                                    size={40}
                                                    style={{ width: 40, height: 40, marginRight: '8px' }}
                                                /> */}
                                                <div>
                                                    <div>
                                                        <div>{item.userName}</div>
                                                        <div style={{ color: '#6161618a' }} >
                                                            {item.tweetCreationDate && new Date(item.tweetCreationDate).toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                            </div>


                                            <Typography variant="h1" className={classes.tweet}
                                            // onMouseUp={this.handleMouseUp}
                                            >
                                                {item.text}
                                            </Typography>

                                            <div style={{margin:20}}>
                                                <ReferenceArrayField record={item} label="Words" reference="word" source="wordIds" basePath={basePath}>
                                                    <SingleFieldList linkType={false}>
                                                        <IconTheme />
                                                    </SingleFieldList>
                                                </ReferenceArrayField>
                                            </div>

                                            <div data-ff={this.state.item.tweetId} >
                                                <TweetEmbed id={'' + this.state.item.tweetId + ''} placeholder={'loading'} />

                                            </div>
                                        </div>
                                    </Grid>
                                    {/*   <Grid item xs={12} md={4}>
                                        <div>
                                            <Typography variant="h6" className={classes.title}>
                                                Labels
                                                  </Typography>
                                            <div className={classes.demo}>


                                                <List dense={false} component="nav">
                                                    {
                                                        (!item.factsDetected || item.factsDetected.length==0) ?
                                                            <div style={{    borderRadius: '4px',
                                                                backgroundColor: 'lightgrey',
                                                                padding: '10px',
                                                                color: '#954299'}}>
                                                                <div>  <InfoIcon></InfoIcon> </div>
                                                          
                                                            <div>To label text Please select a part of the text and apply label.</div>

                                                            </div>
                                                            : (
                                                                item.factsDetected && item.factsDetected.map(fact => (
                                                                    <>    <ListItem>

                                                                        <ListItemText className="arabic"
                                                                            primary={fact.text}
                                                                            secondary={fact.factTypeName}
                                                                        />
                                                                        <ListItemSecondaryAction>
                                                                            <IconButton edge="end" aria-label="delete">
                                                                                <DeleteIcon onClick={() => this.deleteFactDetected(fact.id)} />
                                                                            </IconButton>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                        <Divider variant="inset" component="li" />
                                                                    </>
                                                                )))
                                                    }
                                                </List>

                                            </div>
                                        </div>
                                    </Grid> */}
                                </Grid>

                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(editStyles)(ItemDrawer);

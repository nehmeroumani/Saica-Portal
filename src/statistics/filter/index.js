import React, { Component } from 'react';
import compose from 'recompose/compose';
import { GET_LIST, GET_MANY, Responsive, withDataProvider } from 'react-admin';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = {
    formControl: {
        margin: 2,
        minWidth: 120,
    }
};

class Filter extends Component {

    state={
    };

    selectHandleChange = (event) => {
        const name = event.target.name;
        this.setState({
            ...this.state,
            [name]: event.target.value,
        }, ()=>{
            this.props.filterChange(this.state);
        });
    };

    renderSelectField = ({title, name, id}, options=[{value: '', title: 'choose'}] ) => {
        return (
            <FormControl variant="outlined" className={useStyles.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">{title}</InputLabel>
                <Select
                native
                value={this.state[name]}
                onChange={this.selectHandleChange}
                label={title}
                inputProps={{
                    name,
                    id: 'sp-select-'+id,
                }}
                >
                {options.map(({value, title})=>{
                    return(
                        <option value={value}>{title}</option>
                    );
                })}
                </Select>
            </FormControl>
        );
    }


    renderSeperator = () => {
        return (
            <div className={'sp-seperator'}><span></span></div>
        )
    }

    renderTimeFilter = () => {
        return (
            <div className={'sp-reportfilter-item sp-reportfilter-time'}>
                <div className={"sp-reportfilter-item-title"}>
                    الوقت
                </div>
                <div className={"sp-reportfilter-item-content"}>
                    {this.renderSelectField({
                            title: '',
                            name: 'time-option',
                            id: 'time-option-filter'
                        },
                        [
                            {value: '', title: '--اختار--'},
                            {value: 'from-to-time', title: 'وقت محدد'}
                        ]
                    )}
                </div>
            </div>
        );
    }

    renderUserFilter = () => {
        return (
            <div className={'sp-reportfilter-item sp-reportfilter-user'}>
                <div className={"sp-reportfilter-item-title"}>
                    الفرد
                </div>
                <div className={"sp-reportfilter-item-content"}>
                    {this.renderSelectField({
                            title: '',
                            name: 'user-option',
                            id: 'user-option-filter'
                        },
                        [
                            {value: '', title: '--اختار--'},
                            {value: '1234', title: 'مايك'}
                        ]
                    )}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={'sp-reportfilter-content-container'}>
                {this.renderTimeFilter()}
                {this.renderSeperator()}
                {this.renderUserFilter()}
                {this.renderSeperator()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withDataProvider
)(Filter);

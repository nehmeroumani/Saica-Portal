import React from 'react';

import { Create, SimpleForm, List, Datagrid, TextField, Filter, TextInput, BooleanField, BooleanInput } from 'react-admin';
const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="userScreenName" alwaysOn />
        <BooleanInput label="Active" source="isActive" />
    </Filter>
);
const Image = props => (
    props.record.photo &&
    <img src={props.record.photo} style={{ width: 32, height: 32, borderRadius: '50%' }}
    />
);
const AccountList = props => (
    <List {...props} filters={<UserFilter />}  sort={{ field: 'tweetsThemeCount', order: 'DESC' }} >
        <Datagrid rowClick="edit" >
            <Image label="Photo" />
            <TextField source="userScreenName" label="Account" />
            <TextField source="tweetsCount" label="Tweets" />
            <TextField source="tweetsThemeCount" label="Keywords Detected" />
            <BooleanField source="isActive" label="Active?" />
        </Datagrid>
    </List>
);
export default AccountList;


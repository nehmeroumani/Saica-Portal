import React from 'react';

import { NumberInput,Create, SimpleForm, List, Datagrid, TextField, Filter, TextInput, BooleanField, ReferenceInput, SelectInput,ReferenceField } from 'react-admin';
const UserFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="text"  label='resources.general.search' />   
        <NumberInput label="Assigned To Users" source="assignedInTasks" alwaysOn />       
    </Filter>
);

const UserList = ({ translate, ...props }) => (
    <List {...props} filters={<UserFilter />}>
        <Datagrid  rowClick="show">
        <TextField source="id" label='#' />  
        <TextField source="assignedInTasks" label='Assigned To' />  
        {/* <TextField source="accountDisplayName" label='user' /> */}
        <TextField source="text" label='text' />                   
        </Datagrid>
    </List>
);
export default UserList;


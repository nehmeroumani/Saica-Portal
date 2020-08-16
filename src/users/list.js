import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Create, SimpleForm,List, Datagrid, TextField, Filter,TextInput,BooleanField,BooleanInput } from 'react-admin';
const UserFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn  label='resources.general.search'/>        
        {/* <BooleanInput label="Active" source="isActive"  /> */}
    </Filter>
);

const AvgLevelOfConfidence = ({record, source}) => (
    <Typography>{record[source] == -1 ? 'NA' : record[source]}</Typography>
);

 const UserList = ({ translate,...props }) => (
    <List {...props}  filters={<UserFilter />}>
        <Datagrid rowClick="show" >          
            <TextField source="name" label='resources.users.username' />
            <TextField source="roleName" label='resources.users.role' />
            <AvgLevelOfConfidence source="avgLevelOfConfidence" label='resources.users.avgLevelOfConfidence' />
            <BooleanField source="isActive" label='resources.general.active' /> 
        </Datagrid>
    </List>
);
export default UserList;


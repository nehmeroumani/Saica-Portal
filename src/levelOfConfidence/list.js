import React from 'react';

import { Create, SimpleForm,List, Datagrid, TextField, Filter,TextInput,BooleanField,BooleanInput } from 'react-admin';
const UserFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn  label='resources.general.search'/>        
        {/* <BooleanInput label="Active" source="isActive"  /> */}
    </Filter>
);

 const UserList = ({ translate,...props }) => (
    <List {...props}  filters={<UserFilter />} sort={{ field: 'displayOrder', order: 'ASC' }}>
        <Datagrid rowClick="edit" >   
        <TextField source="displayOrder"  />       
            <TextField source="name"  />
            <TextField source="nameEn"  />
            <BooleanField source="isActive" label='resources.general.active' /> 
        </Datagrid>
    </List>
);
export default UserList;


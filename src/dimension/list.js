import React from 'react';

import { Create, SimpleForm, List, Datagrid, TextField, Filter, TextInput, BooleanField, ReferenceInput, SelectInput,ReferenceField } from 'react-admin';
const UserFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn label='resources.general.search' />
        <ReferenceInput source="categoryId" reference="category" label='resources.category.category' alwaysOn>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const UserList = ({ translate, ...props }) => (
    <List {...props} filters={<UserFilter />}>
        <Datagrid rowClick="edit" >
        <TextField source="displayOrder" label='resources.general.displayOrder' />  
            <TextField source="name" label='resources.category.category' />
            <TextField source="nameEn" label='resources.category.category' />
            <ReferenceField label="resources.category.category" source="categoryId" reference="category" linkType={false}>
                <TextField source="nameEn" />
            </ReferenceField>
            <BooleanField source="isActive" label='resources.general.active' />
        </Datagrid>
    </List>
);
export default UserList;


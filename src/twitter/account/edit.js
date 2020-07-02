import React from 'react';
import {  SimpleForm,TextInput,BooleanInput,Edit,DisabledInput } from 'react-admin';

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.name}"` : ''}</span>;
  };
const UserCreate = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <DisabledInput label="Id" source="id" />
            <TextInput source="userName" style={{"width":500}} />
            <TextInput source="userScreenName" style={{"width":500}} />
            <TextInput source="url" style={{"width":500}} />
            <TextInput source="photo" style={{"width":500}} />
            <BooleanInput source="isActive" />
        </SimpleForm>
    </Edit>
  );
  export default UserCreate;
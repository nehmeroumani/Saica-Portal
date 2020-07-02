import React from 'react';
import {  SimpleForm,TextInput,BooleanInput,Edit,DisabledInput } from 'react-admin';

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.name}"` : ''}</span>;
  };
const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <DisabledInput label="Id" source="id" />
            <TextInput source="name" />
            <TextInput source="userScreenName" />
            <BooleanInput source="isActive"  />
        </SimpleForm>
    </Edit>
  );
  export default UserEdit;
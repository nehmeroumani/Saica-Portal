import React from 'react';

import {required, Create, SimpleForm, TextInput, BooleanField, BooleanInput, DateInput } from 'react-admin';

const AccountCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" validate={required()} />
            <TextInput source="userName" style={{"width":500}} validate={required()} />
            <TextInput source="userScreenName" style={{"width":500}} validate={required()} />
            <TextInput source="url" style={{"width":500}} validate={required()} />
            <TextInput source="photo" style={{"width":500}} validate={required()} />
            <BooleanInput source="isActive" />
        </SimpleForm>
    </Create>
);

export default AccountCreate;


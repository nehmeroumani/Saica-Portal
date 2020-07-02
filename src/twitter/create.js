import React from 'react';

import { Create, SimpleForm,TextInput,BooleanField,BooleanInput,DateInput } from 'react-admin';

const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="username" />
            <BooleanInput source="isActive"  />
        </SimpleForm>
    </Create>
  );

export default UserCreate;


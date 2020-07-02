import React from 'react';

import { required, Create, SimpleForm, TextInput, BooleanField, BooleanInput, ReferenceInput, SelectInput } from 'react-admin';

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput source="username" validate={required()} />
      <TextInput source="password" validate={required()} />
      <ReferenceInput source="role" reference="role">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Create>
);

export default UserCreate;


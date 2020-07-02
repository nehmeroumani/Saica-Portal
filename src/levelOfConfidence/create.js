import React from 'react';

import { NumberInput,required, Create, SimpleForm, TextInput, BooleanField, BooleanInput, ReferenceInput, SelectInput } from 'react-admin';

const UserCreate = (props) => (
  <Create {...props} >
    <SimpleForm redirect="list">
    <TextInput source="name" validate={required()} />
      <TextInput source="nameEn" validate={required()} />   
      <NumberInput source="displayOrder" validate={required()} />

      <BooleanInput source="isActive" />
    </SimpleForm>
  </Create>
);

export default UserCreate;


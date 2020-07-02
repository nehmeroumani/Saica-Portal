import React from 'react';

import {required, Create, SimpleForm,TextInput,NumberInput,BooleanField,BooleanInput,ReferenceInput,SelectInput } from 'react-admin';
import { ColorInput } from 'react-admin-color-input';

const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"   validate={required()} />           
            <TextInput source="nameEn" label="English Name"   validate={required()} />           
            {/* <TextInput source="icon"   validate={required()} />     */}        
            {/* <TextInput source="color"   validate={required()} />    */}
            <ColorInput source="color" validate={required()}/>
            <NumberInput source="displayOrder" validate={required()} />
            <BooleanInput source="isActive"  />
        </SimpleForm>
    </Create>
  );

export default UserCreate;


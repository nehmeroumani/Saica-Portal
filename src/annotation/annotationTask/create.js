import React from 'react';

import { required, Create, SimpleForm, NumberInput, TextInput, BooleanField, BooleanInput, ReferenceInput, SelectInput,AutocompleteInput } from 'react-admin';

const UserCreate = (props) => (
    <Create {...props} undoable={false}>
        <SimpleForm  redirect="show">
            {/* <TextInput source="name" validate={required()} /> */}
            <ReferenceInput source="userId" reference="users" label="Users" validate={required()}    filter={{ role: 30 }} >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="startTweetId" label="Start Tweet" validate={required()} />
            <NumberInput source="endTweetId" label="End Tweet" validate={required()} />      
      
        </SimpleForm>
    </Create>
);

export default UserCreate;


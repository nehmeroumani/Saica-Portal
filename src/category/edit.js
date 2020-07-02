import React from 'react';
import {   
  Toolbar,
  SaveButton,
  DeleteButton, 
  required, SimpleForm,
  NumberInput, TextInput, BooleanInput, Edit, DisabledInput, ReferenceInput, SelectInput 
} from 'react-admin';

import { ColorInput } from 'react-admin-color-input';

import BackButton from '../layout/BackButton'
import { withStyles } from '@material-ui/core';

const toolbarStyles = {
  toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
  },
};

export const CustomEditToolbar = withStyles(toolbarStyles)(props => (
  <Toolbar {...props}>
     <BackButton/>
      <SaveButton/>
      <DeleteButton/>     
  </Toolbar>
));


const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.name}"` : ''}</span>;
};



const UserEdit = (props) => (
  <Edit title={<UserTitle />}  {...props} undoable={false}>
    <SimpleForm toolbar={<CustomEditToolbar />}>
      <DisabledInput label="Id" source="id" />
      <TextInput source="name" validate={required()} />
      <TextInput source="nameEn" label="English Name"   validate={required()} />           
      <ColorInput source="color" validate={required()}/>
      {/* <TextInput source="color" validate={required()} /> */}
      <NumberInput source="displayOrder" validate={required()} />
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Edit>
);
export default UserEdit;
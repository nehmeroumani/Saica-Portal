import React from 'react';
import { parse } from 'query-string';

import {Toolbar,
  SaveButton,NumberInput,
  DeleteButton, required, SimpleForm, TextInput, BooleanInput, Edit, DisabledInput, ReferenceInput, SelectInput } from 'react-admin';
import BackButton from '../layout/BackButton'
import { withStyles } from '@material-ui/core';
const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.name}"` : ''}</span>;
};
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

const UserEdit = props => {
  var categoryId = props.location.pathname.substring(props.location.pathname.lastIndexOf('/') + 1);
  const redirect =  `/category/${categoryId}/show/dimensions` ; 
return (
  <Edit title={<UserTitle />} {...props}  undoable={false}    >
      <SimpleForm toolbar={<CustomEditToolbar />} redirect={redirect} >
      <DisabledInput label="Id" source="id" />
      <TextInput source="name" validate={required()} />
      <TextInput source="nameEn" label="English Name"   validate={required()} />           

      <ReferenceInput source="categoryId" reference="category">
        <SelectInput optionText="nameEn" />
      </ReferenceInput>
      <NumberInput source="displayOrder" validate={required()} />

      <BooleanInput source="isActive" />
    </SimpleForm>
  </Edit>
);}
export default UserEdit;
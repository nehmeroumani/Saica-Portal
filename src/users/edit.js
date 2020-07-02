import React from 'react';
import { Toolbar,
  SaveButton,
  DeleteButton,required, SimpleForm, TextInput, BooleanInput, Edit, DisabledInput, ReferenceInput,SelectInput } from 'react-admin';
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
      <DeleteButton undoable={false}/>     
  </Toolbar>
));

const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props} undoable={false}>
    <SimpleForm toolbar={<CustomEditToolbar />}>
      <DisabledInput label="Id" source="id" />
      <TextInput source="name" validate={required()} />
      <TextInput source="username" validate={required()} />
      <TextInput source="password" />
      <ReferenceInput source="role" reference="role">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Edit>
);
export default UserEdit;
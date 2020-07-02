import React from 'react';
import {  Toolbar,
  SaveButton,
  DeleteButton,required, SimpleForm, TextInput, BooleanInput, Edit, DisabledInput, ReferenceInput, NumberInput,ReferenceArrayInput,SelectInput } from 'react-admin';

import BackButton from '../../layout/BackButton'
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

const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props} undoable={false}>
    <SimpleForm toolbar={<CustomEditToolbar />}>
    <DisabledInput label="Id" source="id" />
      {/* <TextInput source="name" validate={required()} />
      <DisabledInput source="startTweetId" validate={required()} />
      <DisabledInput source="endTweetId" validate={required()} />
      <ReferenceInput source="userId" reference="users" label="Users"     filter={{ role: 30 }} >
                <SelectInput optionText="name" />
      </ReferenceInput> */}
    </SimpleForm>
  </Edit>
);
export default UserEdit;
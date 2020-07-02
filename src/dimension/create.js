import React from 'react';
import { parse } from 'query-string';

import {DisabledInput,NumberInput, required, Create, SimpleForm, TextInput, BooleanField,TextField, BooleanInput, ReferenceField, SelectInput } from 'react-admin';
const UserCreate = props => {
    // Read the post_id from the location which is injected by React Router and passed to our component by react-admin automatically
    const { categoryId: categoryIdString } = parse(props.location.search);
    const categoryId = categoryIdString ? parseInt(categoryIdString, 10) : '';
    const redirect = categoryId ? `/category/${categoryId}/show/dimensions` : false;
  
    return (
    <Create {...props}>
        <SimpleForm   defaultValue={{ categoryId:parseInt(categoryId) }}
        redirect={redirect}>
              <ReferenceField  source="categoryId" reference="category" label='resources.category.name'>
                <TextField source="nameEn" />
            </ReferenceField>         
                        
            <TextInput source="name" validate={required()}  label='resources.dimension.nameAr'   />
            <TextInput source="nameEn" label="English Name"   label='resources.dimension.nameEn'    validate={required()} />           
           
          
            <NumberInput source="displayOrder" label='resources.general.displayOrder'   validate={required()} />

            <BooleanInput source="isActive"  label='resources.general.active' />
        </SimpleForm>
    </Create>
 );
};

export default UserCreate;


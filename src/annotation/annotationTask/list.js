import React from 'react';
import compose from 'recompose/compose';

import {translate,ShowButton,DeleteButton, Create, SimpleForm, List, Datagrid, TextField, Filter, ReferenceArrayField ,TextInput,SingleFieldList,ChipField, BooleanField, ReferenceInput, SelectInput,ReferenceField } from 'react-admin';
// const UserFilter = props => (
//     <Filter {...props}>
//         <TextInput label="Search" source="name" alwaysOn label='resources.general.search' />
//         {/* <ReferenceInput source="categoryId" reference="category" label='resources.category.category' alwaysOn>
//             <SelectInput optionText="name" />
//         </ReferenceInput> */}
//     </Filter>
// );


const UserFilter = props => (
    <Filter
        {...props}
    >
        <SelectInput label="Status" source="status" label="resources.annotations.status" alwaysOn choices={[
            { id: 10, name: 'New' },
            { id: 20, name: 'In Progress' },
            { id: 30, name: 'Done' }
        ]} />

            <ReferenceInput source="userId" reference="users" label='resources.users.user' filter={{ role: 30 }} alwaysOn>
                <SelectInput optionText="name" />
            </ReferenceInput>
        
    </Filter>
);


const Status = props => {
    if (props.record.status == 10) {
        return <span className="mh-status mh-status-gray" >{props.translate('resources.status.new')}</span>
    }
    else if (props.record.status == 20) {
        return <span className="mh-status mh-status-yellow" >{props.translate('resources.status.progress')}</span>
    }
    else if (props.record.status == 30) {
        return <span className="mh-status mh-status-green" >{props.translate('resources.status.done')}</span>
    }

    return <span>_</span>
};

const UserList = ({ translate, ...props }) => (
    <List {...props}  filters={<UserFilter />}>
         <Datagrid  >
            {/* <TextField source="name" label="resources.annotationTask.name"   /> */}
            <ReferenceField label="User" label="resources.annotationTask.user"  source="userId" reference="users" linkType={false}>
                <TextField source="name" />
            </ReferenceField>
            <TextField source="startTweetId" label="resources.annotationTask.startTweetId" />
            <TextField source="endTweetId" label="resources.annotationTask.endTweetId" />
            <TextField source="totalTweets" label="resources.annotationTask.totalTweets" />
            <TextField source="doneTweets"  label="resources.annotationTask.doneTweets" />   
       
            <Status label="Status" source="status" label="resources.annotationTask.status" options={{ width: 30 }} translate={translate} /> 
            <ShowButton />
            <DeleteButton undoable={false} />
        </Datagrid>
    </List>
);
const enhance = compose(
    translate  );
  
export default enhance(UserList);


import React from 'react';
import {
  Datagrid,ShowButton,
  EditButton,
  ReferenceField,ReferenceManyField,
  Show, DeleteButton,
  Button, Link,
  Tab,translate,
  TabbedShowLayout,
  TextField
} from 'react-admin';
import Statistics from '../statistics/overview/Statistics';

import compose from 'recompose/compose';

const Status = props => {
  if (props.record.status == 10) {
    return <span className="mh-status mh-status-gray" >New</span>
}
else if (props.record.status == 20) {
    return <span className="mh-status mh-status-yellow" >Progress</span>
}
else if (props.record.status == 30) {
    return <span className="mh-status mh-status-green" >Done</span>
}
  return <span>_</span>
};
const TaskShow = props => {
  console.log(props)
  // Read the post_id from the location which is injected by React Router and passed to our component by react-admin automatically
  // const { id: categoryIdString } = parse(props.location.search);
  const userId = props.id;
 // const redirect = `/category/${categoryId}/show/dimensions`;

  return (
    <Show {...props} >
      <TabbedShowLayout>
        <Tab label="resources.users.user">
          <TextField source="name" label="resources.general.name" />
          <ReferenceField  source="role" reference="role" label='resources.users.role'>
                <TextField source="title" />
            </ReferenceField>            
        </Tab>
        <Tab label="resources.users.statistics" path="statistics">        
            <div>
              <Statistics userId={userId}  />
                </div>     
        </Tab>
        <Tab path="annotationTasks" label="resources.users.annotations">
          <ReferenceManyField
            addLabel={false}
            reference="annotationtask"
            target="userId"
            sort={{ field: 'creationDate', order: 'DESC' }}
            perPage={100}
          >
            <Datagrid >
              {/* <TextField source="name" label='resources.annotationTask.nameItem' /> */}
              <TextField source="startTweetId" label="resources.annotationTask.startTweetId" />
            <TextField source="endTweetId" label="resources.annotationTask.endTweetId" />
              <TextField source="totalTweets" label="resources.annotationTask.totalTweets" />
              <TextField source="doneTweets"  label="resources.annotationTask.doneTweets" />     
              <TextField source="totalAnnotations" label="resources.annotations.totalAnnotations" />            
     
              <Status label="Status" source="status" label="resources.annotationTask.status" options={{ width: 30 }} translate={translate} /> 
              <ShowButton />
            </Datagrid>
          </ReferenceManyField>
          {/* <DimensionButton /> */}
        </Tab>

      </TabbedShowLayout>
    </Show>
  )
};
const enhance = compose(
  translate  );

export default enhance(TaskShow);

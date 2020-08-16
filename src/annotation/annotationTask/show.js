import React from 'react';
import {
  Datagrid,
  DateField,
  ShowButton,
  ReferenceManyField,ReferenceField,
  RichTextField,
  Show,
  Tab,translate,
  TabbedShowLayout,
  TextField
} from 'react-admin';
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
const TaskShow = props => (
  <Show {...props}>
    <TabbedShowLayout>
      {/* <Tab label="resources.annotationTask.nameItem">         
      <ReferenceField source="userId" reference="users" linkType="show">
         <TextField source="name" />
       </ReferenceField>   
       <DateField source="creationDate" />
       <TextField source="startTweetId" />
       <TextField source="endTweetId" />
      </Tab>   */}
      <Tab label="resources.annotationTask.tweets">
        <ReferenceManyField
          addLabel={false}
          reference="annotationTaskUserTweet"
          target="annotationTaskId"
          sort={{ field: 'tweetId', order: 'ASC' }}
        >
          <Datagrid>         
            <TextField source="tweetId" />
            <TextField source="taskDuration" label="resources.annotations.taskDuration" />
            <TextField source="confidenceName" label="resources.annotations.confidence" />
            {/* <TextField source="totalAnnotations" label="resources.annotations.totalAnnotations" />             */}
            <Status label="Status" source="status" label="resources.annotations.status" options={{ width: 30 }}  translate={translate} />       
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
        {/* <AddCommentButton /> */}
      </Tab>
    </TabbedShowLayout>
  </Show>
);

const enhance = compose(
  translate  );

export default enhance(TaskShow);

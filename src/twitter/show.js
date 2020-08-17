import React from 'react';
import {
  Datagrid, ShowButton,
  EditButton,
  ReferenceField, ReferenceManyField,ReferenceArrayField,SingleFieldList,
  Show, DeleteButton,
  Button, Link,
  Tab,ChipField,
  TabbedShowLayout,
  TextField
} from 'react-admin';
import TweetEmbed from 'react-tweet-embed'
import TweetText from './TweetText'
import TweetAnnotations from './TweetAnnotations'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const TaskShow = props => {

  return (
    <Show {...props} >
      <TabbedShowLayout>
        <Tab label="Tweet">
          <TweetText source="text" topSpace={true} label=""/>

          <div style={{ margin: 20 }}>
            <ReferenceArrayField  label="Words" reference="word" source="wordIds"  basePath={props.basePath} >
              <SingleFieldList >
                <TextField source="name" />
              </SingleFieldList>
            </ReferenceArrayField>
          </div>

          <TweetAnnotations tweetId={props.id}></TweetAnnotations>
          {/* <div  >
            <TweetEmbed id={ props.record.tweetId} placeholder={'loading'} />
          </div> */}
        </Tab>

      </TabbedShowLayout>
    </Show>
  )
};

export default TaskShow;

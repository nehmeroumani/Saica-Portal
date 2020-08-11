// in src/comments.js
import React from 'react';
import Typography from '@material-ui/core/Typography';
// import FactStatus from './FactStatus';
import Icon from '@material-ui/core/Icon'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/ZoomIn';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/core/Avatar';
import TweetText from './TweetText'

import { ReferenceArrayField, SingleFieldList, ChipField, List, TextField, DateField, ReferenceField, ShowButton } from "react-admin";
const cardStyle = {
    width: 300,
    minHeight: 200,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top',
    position: 'relative'
};
const AvatarField = ({ record, size }) => (
    <Avatar
        // src={`${record.photo}?size=${size}x${size}`}
        src={`${record.userProfileImageUrl}`}
        size={size}
        style={{ width: size, height: size, marginRight: '8px' }}
    />
);
const IconTheme = ({ record, size }) => (
    <Tooltip title={record.themeName}>
        <Chip className="arabic" label={record.name} />
    </Tooltip>
);

const CommentGrid = ({ ids, data, basePath }) => (
    <div style={{ margin: '0.5em' }}>
        {ids.map(id =>
            <Card key={id} style={cardStyle}>
                <CardHeader
                    title={<TextField record={data[id]} source="id" />}
                    subheader={<TextField record={data[id]} source="accountDisplayName"  style={{ color: '#6161618a' }} />}
                    //subheader={<DateField record={data[id]} source="tweetCreationDate" style={{ color: '#6161618a' }} />}
                    // avatar={<AvatarField record={data[id]} 
                    />
               
               
                {/* <Type record={data[id]}/> */}
                <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <TweetText record={data[id]} />

                </CardContent>
              
                <CardActions style={{ textAlign: 'right' }}>
                    <ShowButton resource="tweets" basePath={basePath} record={data[id]} />
                </CardActions>
            </Card>
        )}
    </div>
);
CommentGrid.defaultProps = {
    data: {},
    ids: [],
};
export default CommentGrid
// export const CommentList = (props) => (
//     <List title="All comments" {...props}>
//         <CommentGrid />
//     </List>
// );
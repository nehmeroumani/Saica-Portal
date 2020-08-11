import React from 'react';
import Typography from '@material-ui/core/Typography';
import Twemoji from 'react-twemoji';


const TweetText = ({record, source }) => (
    <Typography className="arabic-tweet"> <Twemoji options={{ className: 'twemoji' }}>{record[source] && record[source].replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')}</Twemoji> </Typography>
);

export default TweetText;
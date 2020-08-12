import React from 'react';
import Typography from '@material-ui/core/Typography';
import Twemoji from 'react-twemoji';


const TweetText = ({record, source, isTooltip}) => (
    <Typography className={{"arabic-tweet": true, "tweet-tooltip": isTooltip}}> <Twemoji options={{ className: 'twemoji' }}>{record[source] && record[source].replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')}</Twemoji> </Typography>
);

TweetText.defaultProps = {
    isTooltip: false
};

export default TweetText;
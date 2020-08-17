import React from 'react';
import Twemoji from 'react-twemoji';


const TweetText = ({ record, source, isTooltip, topSpace}) => {
    var classes = ['arabic-tweet'];
    if (isTooltip){
        classes.push('tweet-tooltip');
    }
    if (topSpace){
        classes.push('top-space');
    }
    return <div className={classes.join(' ')}> <Twemoji options={{ className: 'twemoji' }}>{record[source] && record[source].replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')}</Twemoji></div>
};

TweetText.defaultProps = {
    isTooltip: false,
    topSpace: false,
};

export default TweetText;
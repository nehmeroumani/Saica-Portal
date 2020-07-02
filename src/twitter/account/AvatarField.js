import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const AvatarField = ({ record, size }) => (
    <Avatar
        // src={`${record.photo}?size=${size}x${size}`}
        src={`${record.userProfileImageUrl}`}
        size={size}
        style={{ width: size, height: size,marginRight: '8px' }}
    />
);

AvatarField.defaultProps = {
    size: 25,
};

export default AvatarField;

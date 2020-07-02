import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const AvatarField = ({ record, size }) => (
    <Avatar
        src={`${record.userProfileImageUrl}`}
        size={size}
        style={{ width: size, height: size,marginRight: '8px' }}
    />
);

AvatarField.defaultProps = {
    size: 35,
};

export default AvatarField;

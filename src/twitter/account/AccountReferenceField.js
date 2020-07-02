import React from 'react';
import { ReferenceField } from 'react-admin';

import FullNameField from './FullNameField';

const CustomerReferenceField = props => (
    <ReferenceField source="twitterAppId" label="Account" reference="twitterApp" {...props}  linkType={false}>
        <FullNameField />
    </ReferenceField>
);

CustomerReferenceField.defaultProps = {
    source: 'twitterAppId',
    addLabel: true,
};

export default CustomerReferenceField;

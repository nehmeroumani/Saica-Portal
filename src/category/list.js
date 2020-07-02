import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';
import { stringify } from 'query-string';
import dimensions from '../dimension';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import { ShowButton,EditButton,Create, SimpleForm,List, Datagrid, TextField, Filter,TextInput,BooleanField,BooleanInput } from 'react-admin';
const UserFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn  label='resources.general.search'/>        
        {/* <BooleanInput label="Active" source="isActive"  /> */}
    </Filter>
);
const styles = {
    icon: { paddingRight: '0.5em' },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
};
const Color = props => {
    if (props.record.color) {
        return <span className={'sp-color-label'} style={{backgroundColor: props.record.color}} ></span>
    }
    return ''
};
// const LinkToDimentions= ({ classes, record, translate }) => (
//     <Button
//         size="small"
//         color="primary"
//         component={Link}
//         target="_blank"
//         to={{
//             pathname: '/dimension',
          
//             search: stringify({
//                 page: 1,
//                 perPage: 25,
//                 sort: 'displayOrder',
//                 order: 'ASC',
//                 filter: JSON.stringify({ categoryId: record.id }),
//             }),
//         }}
//         className={classes.link}
//     >
//         <dimensions.icon className={classes.icon} />
//         {translate('resources.dimension.name')}
//     </Button>
// );

 const CategoryList = ({ classes,translate,...props }) => (
    <List {...props}  filters={<UserFilter />}>
        <Datagrid  rowClick="show" >      
            <TextField source="displayOrder" label='resources.general.displayOrder' />  
            <TextField source="nameEn" label='resources.category.category'   />           
             
            <TextField source="name" label='resources.category.category' />   

            <Color source="color" label='resources.category.color' />      
                  
            <BooleanField source="isActive" label='resources.general.active' /> 
            {/* <LinkToDimentions  sortable={false} classes={classes} translate={translate} />   */}
            {/* <ShowButton />     */}
        </Datagrid>
    </List>
);
const enhance = compose(
    withStyles(styles),
    translate
);
export default enhance(CategoryList);



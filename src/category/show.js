import React from 'react';
import {
  Datagrid,
  EditButton,
  ReferenceManyField,
  Show, DeleteButton,
  Button, Link,
  Tab,
  TabbedShowLayout,
  TextField
} from 'react-admin';
import DimensionButton from './addDimensionButton';
//
const stopPropagation = e => e.stopPropagation();

const EditDimentions = (props) => (
  <Button
    size="small"
    color="primary"
    component={Link}
    onClick={stopPropagation}

    to={{
      pathname: `/dimension/${props.record.id}/${props.record.categoryId}`
    }}
  >
    <span>تعديل</span>
  </Button>
);


const TaskShow = props => {
  console.log(props)
  // Read the post_id from the location which is injected by React Router and passed to our component by react-admin automatically
  // const { id: categoryIdString } = parse(props.location.search);
  const categoryId = props.id;
  const redirect = `/category/${categoryId}/show/dimensions`;

  return (
    <Show {...props} >
      <TabbedShowLayout>
        <Tab label="resources.category.category">
          <TextField source="name" label="resources.category.category" />
          <TextField source="color" label="resources.category.color" />
        </Tab>
        <Tab path="dimensions" label="resources.dimension.name">
          <ReferenceManyField
            addLabel={false}
            reference="dimension"
            target="categoryId"
            sort={{ field: 'displayOrder', order: 'ASC' }}
          >
            <Datagrid >
              <TextField source="displayOrder" label='resources.general.displayOrder' />
              <TextField source="name" label='resources.dimension.nameitem' />
              <TextField source="nameEn" label='resources.dimension.nameitem' />
              <EditDimentions />
              <DeleteButton redirect={redirect} undoable={false} />
            </Datagrid>
          </ReferenceManyField>
          <DimensionButton />
        </Tab>

      </TabbedShowLayout>
    </Show>
  )
};

export default TaskShow;

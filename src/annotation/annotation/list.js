// import React, { Fragment } from 'react';

// import { List, WithPermissions, Datagrid, TextField, Filter, ReferenceArrayField, TextInput, SingleFieldList, ChipField, BooleanField, ReferenceInput, SelectInput, ReferenceField } from 'react-admin';
// import Divider from '@material-ui/core/Divider';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import withStyles from '@material-ui/core/styles/withStyles';

// const filterStyles = {
//     status: { width: 150 },
// };

// // const OrderFilter = withStyles(filterStyles)(({ classes, ...props }) => (
// //     <Filter {...props}>
// //         <SearchInput source="q" alwaysOn />
// //         <ReferenceInput source="customer_id" reference="customers">
// //             <AutocompleteInput
// //                 optionText={choice =>
// //                     `${choice.first_name} ${choice.last_name}`
// //                 }
// //             />
// //         </ReferenceInput>
// //         <DateInput source="date_gte" />
// //         <DateInput source="date_lte" />
// //         <TextInput source="total_gte" />
// //         <NullableBooleanInput source="returned" />
// //     </Filter>
// // ));

// const UserFilter = withStyles(filterStyles)(({ classes, permissions, ...props }) => (
//     <Filter
//         {...props}
//     // context='button'
//     >
//         {/* <SelectInput label="Status" source="status" label="resources.annotations.status" alwaysOn choices={[
//             { id: 10, name: 'New' },
//             { id: 20, name: 'In Progress' },
//             { id: 30, name: 'Done' }
//         ]} /> */}

//         {permissions === 'admin' &&
//             <ReferenceInput source="userId" reference="users" label='resources.users.user' filter={{ role: 30 }} alwaysOn>
//                 <SelectInput optionText="name" />
//             </ReferenceInput>
//         }
//     </Filter>
// ));

// const Status = props => {
//     if (props.status == 10) {
//         return <span className="mh-status-annotation mh-status-gray" >{props.translate('resources.status.new')}</span>
//       }
//       else if (props.status == 20) {
//         return <span className="mh-status-annotation mh-status-yellow" >{props.translate('resources.status.progress')}</span>
//       }
//       else if (props.status == 30) {
//         return <span className="mh-status-annotation mh-status-green" >{props.translate('resources.status.done')}</span>
//       }
//     return <span>_</span>
// };

// const TweetText = props => {
//     let text = props.record.text;
//     if (text.length > 100) {
//         text = text.substr(0, 100);
//     }
//     return <span className="arabic" style={{ height: 60, textAlign: 'right', overflow: 'hidden' }} >
//         {text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')} ...</span>
// };

// const StartDateText = props => (
//     <span>{props.record.startTime && new Date(props.record.startTime).toLocaleDateString()}</span>
// );
// const FinishDateText = props => (
//     <span>{props.record.finishTime && new Date(props.record.finishTime).toLocaleDateString()}</span>
// );


// class TabbedDatagrid extends React.Component {
//     tabs = [
//         { id: '10', name: 'جديد' },
//         { id: '20', name: 'تقدم' },
//         { id: '30', name: 'إنتهى' },
//     ];

//     state = { new: [], progress: [], done: [] };
//     static getKeyFromValue = (id) => {
      
//     }

//     static getDerivedStateFromProps(props, state) {
          
//         let s = 'new';
//         if (props.filterValues.status == '10')
//             s = 'new';
//         if (props.filterValues.status == '20')
//             s = 'progress';
//         if (props.filterValues.status == '30')
//             s = 'done';

//         if (props.ids !== state[s]) {
//             return { ...state, [s]: props.ids };
//         }
//         return null;
//     }

//     handleChange = (event, value) => {
//         const { filterValues, setFilters } = this.props;
//         setFilters({ ...filterValues, status: value });
//     };

//     render() {
//         const { classes, filterValues, ...props } = this.props;
//         console.log(filterValues);
//         return (
//             <Fragment>
//                 <Tabs
//                     fullWidth
//                     centered
//                     value={filterValues.status}
//                     indicatorColor="primary"
//                     onChange={this.handleChange}
//                 >
//                     {this.tabs.map(choice => (
//                         <Tab
//                             key={choice.id}
//                             label={choice.name}
//                             value={choice.id}
//                         />
//                     ))}
//                 </Tabs>
//                 <Divider />
//                 <div>
//                     {filterValues.status == '10' && (
//                         <Datagrid {...props} ids={this.state.new} rowClick="edit" sort={{ field: 'lastModified', order: 'DESC' }}>
//                              <Status label="Status" source="status" label="resources.annotations.status" options={{ width: 30 }}  translate={this.props.translate} /> 
//                             <TextField source="userName" label="resources.users.user" />
//                             <TextField source="tweetId" label="resources.twitter.tweet" />
//                             <TextField source="taskDuration" label="resources.annotations.taskDuration" />
//                             {/* <StartDateText source="startTime" label="resources.annotations.startTime" />
//                             <FinishDateText source="finishTime" label="resources.annotations.finishTime" /> */}
//                             <BooleanField source="isIrrelevant" label="resources.annotations.isIrrelevent" />
//                             <TextField source="confidenceName" label="resources.annotations.confidence" />
//                         </Datagrid>
//                     )}
//                     {filterValues.status == '20' && (
//                         <Datagrid {...props} ids={this.state.progress} rowClick="edit" sort={{ field: 'lastModified', order: 'DESC' }}>
//                              <Status label="Status" source="status" label="resources.annotations.status" options={{ width: 30 }} translate={this.props.translate} /> 
//                             <TextField source="userName" label="resources.users.user" />
//                             <TextField source="tweetId" label="resources.twitter.tweet" />
//                             <TextField source="taskDuration" label="resources.annotations.taskDuration" />
//                             <BooleanField source="isIrrelevant" label="resources.annotations.isIrrelevent" />
//                             <TextField source="confidenceName" label="resources.annotations.confidence" />
//                         </Datagrid>
//                     )}
//                     {filterValues.status == '30' && (
//                         <Datagrid {...props} ids={this.state.done} rowClick="edit" sort={{ field: 'lastModified', order: 'DESC' }}>
//                              <Status label="Status" source="status" label="resources.annotations.status" options={{ width: 30 }} translate={this.props.translate} /> 
//                             <TextField source="userName" label="resources.users.user" />
//                             <TextField source="tweetId" label="resources.twitter.tweet" />
//                             <TextField source="taskDuration" label="resources.annotations.taskDuration" />

//                             <BooleanField source="isIrrelevant" label="resources.annotations.isIrrelevent" />
//                             <TextField source="confidenceName" label="resources.annotations.confidence" />
//                         </Datagrid>
//                     )}
//                 </div>
//             </Fragment>
//         );
//     }
// }

// const datagridStyles = { total: { fontWeight: 'bold' }, };

// const StyledTabbedDatagrid = withStyles(datagridStyles)(TabbedDatagrid)

// const UserList = ({ permissions, translate, ...props }) => (
//     <List
//         {...props}
//         filterDefaultValues={{ status: '10' }}
//         sort={{ field: 'lastModified', order: 'DESC' }}
//         perPage={25}
//         filters={<UserFilter permissions={permissions} />}
//     >
//         <StyledTabbedDatagrid />
//     </List>
// )

// // const UserList = ({ permissions,translate, ...props }) => (
// //     <List {...props} filters={<UserFilter  permissions={permissions} />}>
// //         <Datagrid rowClick="edit" sort={{ field: 'lastModified', order: 'DESC' }} >
// //             <Status label="Status" source="status" label="resources.annotations.status" options={{ width: 30 }} />
// //             <TextField source="userName" label="resources.users.user"  />
// //             <TextField source="tweetId" label="resources.twitter.tweet" />       
// //             <StartDateText source="startTime" label="resources.annotations.startTime" />
// //             <FinishDateText source="finishTime" label="resources.annotations.finishTime" />
// //             <BooleanField source="isIrrelevant" label="resources.annotations.isIrrelevent" />    
// //             <TextField source="confidenceName" label="resources.annotations.confidence" />    
// //         </Datagrid>
// //     </List>
// // );

// const enhance = compose(
//     translate  );
  
// export default enhance(UserList);



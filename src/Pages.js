import React from 'react'
import { List, Datagrid, TextField, ReferenceField, SimpleForm, Create } from 'react-admin'
import Editor from './components/Editor'

export const PageList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <ReferenceField source="userId" reference="users">
        <TextField source="id" />
      </ReferenceField>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" />
    </Datagrid>
  </List>
)

// export const PostEdit = props => (
//   <Edit {...props}>
//     <SimpleForm>
//       <DisabledInput source="id" />
//       <ReferenceInput source="userId" reference="users">
//         <SelectInput optionText="name" />
//       </ReferenceInput>
//       <TextInput source="title" />
//       <LongTextInput source="body" />
//     </SimpleForm>
//   </Edit>
// )

export const PageCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <Editor />
    </SimpleForm>
  </Create>
)

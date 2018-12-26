import React from 'react'
import { Edit, List, Datagrid, TextField, TextInput, SimpleForm, Create } from 'react-admin'
import Editor from './components/Editor'

export const PageList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
    </Datagrid>
  </List>
)

export const PageEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <Editor source="content" />
    </SimpleForm>
  </Edit>
)

export const PageCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <Editor source="content" />
    </SimpleForm>
  </Create>
)

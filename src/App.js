import React from 'react'
import { UserList } from './Users'
import Dashboard from './Dashboard'
import authProvider from './authProvider';
import { PostList, PostEdit, PostCreate } from './Posts'
import { PageList, PageCreate } from './Pages'
import { Admin, Resource } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import PostIcon from '@material-ui/icons/Book'
import UserIcon from '@material-ui/icons/Group'


const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com')

const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="posts" icon={PostIcon} list={PostList} edit={PostEdit} create={PostCreate} />
    <Resource name="users" icon={UserIcon} list={UserList} />
    <Resource name="pages" list={PageList} create={PageCreate} />
  </Admin>
)

export default App

import React from 'react'
import Dashboard from './Dashboard'
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import { PageList, PageEdit, PageCreate } from './Pages'
import { Admin, Resource } from 'react-admin'
import PostIcon from '@material-ui/icons/Book'


const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="pages" icon={PostIcon} list={PageList} edit={PageEdit} create={PageCreate} />
  </Admin>
)

export default App

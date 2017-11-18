import AccessForm from '../dashboard/access'
import ManageForm from '../dashboard/manage'
import Login from '../dashboard/login'
import Register from '../dashboard/register'
import Dashboard from '../dashboard/index'
import Settings from '../dashboard/settings'
import Profile from '../dashboard/profile'
import UsersList from '../dashboard/users'
import UsersRoles from '../dashboard/usersRoles'
import RolesList from '../dashboard/roles'
import PostsList from '../dashboard/posts/index'
import RolesPermissions from '../dashboard/rolesPermissions'
import form from '../dashboard/form'
import Inbox from '../dashboard/inbox'


import Pages from '../dashboard/pages/index'
import PageCreate from '../dashboard/pages/create'
import PageEdit from '../dashboard/pages/edit'

import Nav from '../dashboard/nav'

export default [
	{
        path: '/dashboard', component: Dashboard,   
        children: [
            { path: '/', component: PostsList, meta: { requiresAuth: true } },
            { path: 'login', component: Login },
            { path: 'register', component: Register },
            
            { path: 'inbox', component: Inbox, meta: { requiresAuth: true, model: 'Inbox' }},
            { path: 'nav', component: Nav, meta: { requiresAuth: true, model: 'Navigation' }},

            { path: 'pages', component: Pages, meta: { requiresAuth: true, model: 'Pages' }},
            { path: 'pages/create', component: PageCreate, meta: { requiresAuth: true, model: 'Pages' }},
            { path: 'pages/:id/update', component: PageEdit, meta: { requiresAuth: true, model: 'Pages' }},
            
            { path: 'settings', component: Settings, meta: { requiresAuth: true, model: 'Settings' }},
            { path: 'profile', component: Profile, meta: { requiresAuth: true, model: 'Profile' }},
            { path: 'posts', component: PostsList, meta: { requiresAuth: true, model: 'Posts' }},
            { path: 'users', component: UsersList, meta: { requiresAuth: true, model: 'Users' }},
            { path: 'users/:id/roles', component: UsersRoles, meta: { requiresAuth: true, model: 'Users' }},
            { path: 'roles', component: RolesList, meta: { requiresAuth: true, model: 'Roles' } },
            { path: 'roles/:id/permissions', component: RolesPermissions, meta: { requiresAuth: true, model: 'Roles' }},
            { path: ':model/create', component: form, meta: {mode: 'create', requiresAuth: true} },
            { path: ':model/:id/update', component: form, meta: {mode: 'edit', requiresAuth: true} },
            { path: ':model', component: AccessForm, meta: { requiresAuth: true } },
            { path: ':model/manage', component: ManageForm, meta: { requiresAuth: true } },


    	]
    }
]
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

export default [
	{
        path: '/dashboard', component: Dashboard,   
        children: [
            { path: '/', component: PostsList, meta: { requiresAuth: true } },
            { path: 'inbox', component: Inbox },
            { path: 'login', component: Login },
            { path: 'register', component: Register },
            { path: 'settings', component: Settings, meta: { requiresAuth: true } },
            { path: 'profile', component: Profile, meta: { requiresAuth: true } },
            { path: 'posts', component: PostsList, meta: { requiresAuth: true } },
            { path: 'users', component: UsersList, meta: { requiresAuth: true } },
            { path: 'users/:id/roles', component: UsersRoles, meta: { requiresAuth: true } },
            { path: 'roles', component: RolesList, meta: { requiresAuth: true } },
            { path: 'roles/:id/permissions', component: RolesPermissions, meta: { requiresAuth: true } },
            { path: ':model/create', component: form, meta: {mode: 'create', requiresAuth: true} },
            { path: ':model/:id/update', component: form, meta: {mode: 'edit', requiresAuth: true} },
            { path: ':p', component: AccessForm, meta: { requiresAuth: true } },
            { path: ':p/manage', component: ManageForm, meta: { requiresAuth: true } },
    	]
    }
]
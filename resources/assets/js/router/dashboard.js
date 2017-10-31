import AccessForm from '../components/forms/access'
import ManageForm from '../components/forms/manage'
import Login from '../components/auth/login'
import Register from '../components/auth/register'
import Dashboard from '../dashboard/views/index'
import Settings from '../components/dashboard/settings'
import Profile from '../components/dashboard/profile'
import UsersList from '../components/dashboard/users'
import UsersRoles from '../components/dashboard/usersRoles'
import RolesList from '../components/dashboard/roles'
import PostsList from '../components/dashboard/posts/index'
import RolesPermissions from '../components/dashboard/rolesPermissions'
import form from '../dashboard/views/form'

export default [
	{
        path: '/dashboard', component: Dashboard,
        children: [
            { path: 'login', component: Login },
            { path: 'register', component: Register },
            { path: 'settings', component: Settings },
            { path: 'profile', component: Profile },
            { path: 'posts', component: PostsList },
            { path: 'users', component: UsersList },
            { path: 'users/:id/roles', component: UsersRoles },
            { path: 'roles', component: RolesList },
            { path: 'roles/:id/permissions', component: RolesPermissions },
            { path: ':model/create', component: form, meta: {mode: 'create'} },
            { path: ':model/:id/update', component: form, meta: {mode: 'edit'} },
            { path: ':p', component: AccessForm },
            { path: ':p/manage', component: ManageForm },
    	]
    }
]
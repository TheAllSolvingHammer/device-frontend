import {
    type RouteConfig,
    index,
    layout,
    route,
} from '@react-router/dev/routes'
export default [
    route('/login', 'routes/login.tsx'),
    layout('components/auth/ProtectedLayout.tsx',
        [index('routes/home.tsx')]),
] satisfies RouteConfig

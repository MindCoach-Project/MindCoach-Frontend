import { LoginLayout } from '../layouts';
import { Login } from '../pages';
import { site_path } from "../utils"

const publicRoutes = [
    {
        path: site_path.LOGIN,
        component: Login,
        layout: LoginLayout
     },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
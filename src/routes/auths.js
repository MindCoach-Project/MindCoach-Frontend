import { LoginLayout } from '../layouts';
import { Login, Register } from '../pages';
import { site_path } from "../utils"

const publicRoutes = [
    {
        path: site_path.LOGIN,
        component: Login,
        layout: LoginLayout
     },
     {
        path: site_path.REGISTER,
        component: Register,
        layout: LoginLayout
     }
     
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
import { Home } from '../pages';
import { AthUtils } from '../utils';
const files = require.context('.', false, /\.js$/);

let publicRoutes = [];
let privateRoutes = [
    {
        path: '/',
        component: Home,
        error: AthUtils.handleAuthorization
     },
];

files.keys().forEach((fileName) => {
    if (fileName === './index.js') return;

    const { publicRoutes: pub, privateRoutes: priv } = files(fileName);
 
    if (pub) {
       publicRoutes = [...publicRoutes, ...pub];
    }
    
    if (priv) {
       privateRoutes = [...privateRoutes, ...priv];
    }
 });
 
 export { publicRoutes, privateRoutes };
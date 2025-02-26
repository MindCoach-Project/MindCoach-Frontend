import { Home, Intro, ListTasks, Profile, TaskStatusPage } from "../pages";
import { AthUtils } from "../utils";
import { site_path } from "../utils";
import { LoginLayout, DefaultLayout } from "../layouts";

const files = require.context(".", false, /\.js$/);

let publicRoutes = [
  {
    path: site_path.INTRO,
    component: Intro,
    layout: LoginLayout,
  },
];
let privateRoutes = [
  {
    path: site_path.HOME,
    component: Home,
    layout: DefaultLayout,
    error: AthUtils.handleAuthorization,
  },
  {
    path: site_path.TASKS,
    component: ListTasks,
    layout: DefaultLayout,
    error: AthUtils.handleAuthorization,
  }, 
  {
    path: site_path.TASKSTATUS,
    component:TaskStatusPage,
    layout: DefaultLayout,
    error: AthUtils.handleAuthorization,
  },
  {
    path: site_path.PROFILE,
    component:Profile ,
    layout: DefaultLayout,
  }
];

files.keys().forEach((fileName) => {
  if (fileName === "./index.js") return;

  const { publicRoutes: pub, privateRoutes: priv } = files(fileName);

  if (pub) {
    publicRoutes = [...publicRoutes, ...pub];
  }

  if (priv) {
    privateRoutes = [...privateRoutes, ...priv];
  }
});

export { publicRoutes, privateRoutes };

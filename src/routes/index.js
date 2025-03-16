import { Home, Intro, ListTasks, Profile, TaskStatusPage, WorkTemplate, HouseholdTemplate, SportTemplate, RelaxTemplate, Reminder } from "../pages";
import { BlogDetail } from "../components";
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
    error: AthUtils.handleAuthorization,
  }, 
  {
    path: site_path.TEMPLATE_WORK,
    component: WorkTemplate,
    layout: DefaultLayout,
    error: AthUtils.handleAuthorization,
  },
  {
    path: site_path.TEMPLATE_HOUSEHOLD,
    component: HouseholdTemplate,
    layout: DefaultLayout,
    error: AthUtils.handleAuthorization,
  },
  {
    path: site_path.TEMPLATE_SPORT,
    component: SportTemplate,
    layout: DefaultLayout,
    error: AthUtils.handleAuthorization,
  },
  {
    path: site_path.TEMPLATE_RELAX,
    component: RelaxTemplate,
    layout: DefaultLayout,
    error: AthUtils.handleAuthorization,
  },
  {
    path: site_path.REMINDER,
    component: Reminder,
    layout: DefaultLayout,
    error: AthUtils.handleAuthorization,
  }, 
  {
    path: site_path.BLOG_DETAIL, 
    component: BlogDetail,
    layout: DefaultLayout,
    error: AthUtils.handleAuthorization,
  },
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

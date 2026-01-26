import {
  Home,
  Intro,
  ListTasks,
  Profile,
  TaskStatusPage,
  WorkTemplate,
  HouseholdTemplate,
  SportTemplate,
  RelaxTemplate,
  Reminder,
  OnBoard1,
  OnBoard2,
  OnBoard3,
  OnBoard4,
  OnBoard5,
} from "../pages";
import { BlogDetail } from "../components";
import { AthUtils } from "../utils";
import { site_path } from "../utils";
import { LoginLayout, DefaultLayout, OnboardingLayout } from "../layouts";


const files = require.context(".", false, /\.js$/);

let publicRoutes = [
  {
    path: site_path.INTRO,
    component: Intro,
    layout: LoginLayout,
  },
  {
    path: site_path.ONBOARD1,
    component: OnBoard1,
    layout: OnboardingLayout,
  },
  {
    path: site_path.ONBOARD2,
    component: OnBoard2,
    layout: OnboardingLayout,
  },
  {
    path: site_path.ONBOARD3,
    component: OnBoard3,
    layout: OnboardingLayout,
  },
  {
    path: site_path.ONBOARD4,
    component: OnBoard4,
    layout: OnboardingLayout,
  },
  {
    path: site_path.ONBOARD5,
    component: OnBoard5,
    layout: OnboardingLayout,
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
    component: TaskStatusPage,
    layout: DefaultLayout,
    error: AthUtils.handleAuthorization,
  },
  {
    path: site_path.PROFILE,
    component: Profile,
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

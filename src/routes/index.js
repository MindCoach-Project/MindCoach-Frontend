import { Home, Intro } from "../pages";
import { AthUtils } from "../utils";
import { site_path } from "../utils";
import { LoginLayout } from "../layouts";

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
    path: "/home",
    component: Home,
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

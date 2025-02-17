import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'mindcoach.test.app',
  appName: 'MindCoachApp',
  webDir: 'build',
  server: {
    allowNavigation: ["*"],
    androidScheme: "https",
    iosScheme: "https",
  }
};

export default config;

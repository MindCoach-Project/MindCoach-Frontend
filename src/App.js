import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { useGlobalState } from './global/state';
import { ProtectedRoute } from './components';
import { ReminderNotificationManager } from './components/Notification/ReminderNotificationManager';
import "./index.css";
function App() {

   const { state } = useGlobalState();

   return (
      <Router>
         <div className="App">
         {state.isLogin && <ReminderNotificationManager/>}
            <Routes>
               {publicRoutes.map((r, i) => {
                  let Layout = r.layout || DefaultLayout;
                  const Page = r.component;

                  return (
                     <Route
                        key={i}
                        path={r.path}
                        element={
                           <Layout>
                              <Page />
                           </Layout>
                        }
                     ></Route>
                  );
               })}

               {privateRoutes.map((r, i) => {
                  let Layout = r.layout || DefaultLayout;
                  const Page = r.component;

                  return (
                     <Route
                        key={i}
                        path={r.path}
                        element={
                           <ProtectedRoute
                              element={
                                 <Layout>
                                    <Page />
                                 </Layout>
                              }
                              error={r.error}
                           />
                        }
                     />
                  );
               })}
            </Routes>
         </div>
      </Router>
   );
}

export default App;

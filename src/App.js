import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { useGlobalState } from './global/state';
import { ProtectedRoute } from './components';

function App() {

   const [state, dispatch] = useGlobalState();
   console.log(state, dispatch)
   
   return (
      <Router>
         <div className="App">
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

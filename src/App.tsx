import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import MainLayout from "./MainLayout";

const Home = lazy(() => import('./Home'));
const Product = lazy(() => import('./Product'));
const SignIn = lazy(() => import('./SignIn'));
const SignUp = lazy(() => import('./SignUp'));
const CreateProduct = lazy(() => import('./CreateProduct'));
const EditProduct = lazy(() => import('./EditProduct'));
const AdsDashboard = lazy(() => import('./AdsDashboard'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={null}>
        <MainLayout>
          <Switch>
            <Route path={'/'} exact component={Home} />
            <Route path={'/product/:id'} exact component={Product} />
            <Route path={'/signin'} exact component={SignIn} />
            <Route path={'/register'} exact component={SignUp} />
            <Route path={'/new/product'} exact component={CreateProduct} />
            <Route path={'/edit/product/:id'} exact component={EditProduct} />
            <Route path={'/advertisers/dashboard'} exact component={AdsDashboard} />
          </Switch>
        </MainLayout>
      </Suspense>
    </Router>

  );
};

export default App;

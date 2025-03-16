import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";


// const Home = lazy(() => import('../pages/Home'));
// const Article = lazy(() => import('../pages/Article/Article'));
// const NewArticle = lazy(() => import('../pages/Article/NewArticle'));
// const EditArticle = lazy(() => import('../pages/Article/EditArticle'));
// const Services = lazy(() => import('../pages/Services/Services'));

import MainLayout from "./MainLayout";

const Home = lazy(() => import('./Home'));
const Product = lazy(() => import('./Product'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={null}>
        <MainLayout>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/product'} exact component={Product} />
        </Switch>
        </MainLayout>
       
      </Suspense>
    </Router>

  );
};

export default App;

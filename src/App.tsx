import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "./components/appHeader/appHeader";
import { UsersPage } from "./components/pages";
import Spinner from "./components/spinner/spinner";

const Page404 = lazy(() => import("./components/pages/404"));
const MainPage = lazy(() => import("./components/pages/mainPage"));
const ComicsPage = lazy(() => import("./components/pages/comicsPage"));
const FormComponent = lazy(() => import("./components/pages/singleFormPage"));
const SinglePage = lazy(() => import("./components/pages/singlePage"));
const SingleComicLayout = lazy(
  () => import("./components/pages/singleComicLayout/singleComicLayout")
);
const SingleCharacterLayout = lazy(
  () => import("./components/pages/singleCharacterLayout/singleCharacterLayout")
);

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:id"
                element={<SinglePage Component={SingleComicLayout} dataType="comic" />}
              />
              <Route
                path="/characters/:id"
                element={<SinglePage Component={SingleCharacterLayout} dataType="character" />}
              />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/form" element={<FormComponent />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;

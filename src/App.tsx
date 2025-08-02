import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import SingleMovie from "./pages/single-pages/SingleMovie";
import SingleBlog from "./pages/single-pages/SingleBlog";
import SingleReview from "./pages/single-pages/SingleReview";
import CreateReview from "./pages/single-pages/CreateReview";
import PublicRoute from "./components/PublicRoute";
import CreateNewBlog from "./pages/CreateNewBlog";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./Redux/usersSlice";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const Blog = lazy(() => import("./pages/Blog"));
const Review = lazy(() => import("./pages/Review"));
const Profile = lazy(() => import("./pages/Profile"));
const Admin = lazy(() => import("./pages/Admin"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/movies"
              element={
                <PrivateRoute>
                  <Movies />
                </PrivateRoute>
              }
            />
            <Route
              path="/movies/:id"
              element={
                <PrivateRoute>
                  <SingleMovie />
                </PrivateRoute>
              }
            />
            <Route
              path="/blog"
              element={
                <PrivateRoute>
                  <Blog />
                </PrivateRoute>
              }
            />
            <Route
              path="/blog/create-new-blog"
              element={
                <PrivateRoute>
                  <CreateNewBlog />
                </PrivateRoute>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <PrivateRoute>
                  <SingleBlog />
                </PrivateRoute>
              }
            />
            <Route
              path="/review"
              element={
                <PrivateRoute>
                  <Review />
                </PrivateRoute>
              }
            />
            <Route
              path="/review/:id"
              element={
                <PrivateRoute>
                  <SingleReview />
                </PrivateRoute>
              }
            />
            <Route
              path="/movies/create-review/:id"
              element={
                <PrivateRoute>
                  <CreateReview />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute requiredRole="admin">
                  <Admin />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

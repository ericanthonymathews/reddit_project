import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import Feed from "./components/Feed";
import CommunityFeed from "./components/CommunityFeed";
import PostDetailsPage from "./components/PostDetailsPage";
import DeleteForm from "./components/DeleteForm";
import CreateCommunityForm from "./components/CreateCommunityForm";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <Feed />
        </Route>
        <Route path="/communities/new" exact={true}>
          <CreateCommunityForm />
        </Route>
        <Route path="/communities/:communityId" exact={true}>
          <CommunityFeed />
        </Route>
        <Route path="/communities/:communityId/posts/:postId" exact={true}>
          <PostDetailsPage />
        </Route>
        <Route
          path="/communities/:communityId/posts/:postId/delete"
          exact={true}
        >
          <DeleteForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

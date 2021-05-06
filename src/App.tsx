import React from "react";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import LandingPage from "./landingPage/App";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import AppStateProvider, { useAppState } from './state';

export default function App() {
  const location = useLocation();

  return (
    <>
      <Router>
        <AppStateProvider>
          <Switch>
            <Route path="/event-page">
              <LandingPage />
            </Route>
            <Route path="/">
              <AdminPanel />
            </Route>
          </Switch>
        </AppStateProvider>
      </Router>

      {/* {location.pathname === "/event-page" ? <LandingPage /> : <AdminPanel />} */}
    </>
  );
}

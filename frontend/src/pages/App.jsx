import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import axios from "axios";
import HomePage from "./homePage";
import LoginPage from "./loginPage";
import EditJournal from "./editJournal";
import Journal from "./journal";
import Compose from "./compose";
import Error from "./error";
import SettingsPage from "./settings";

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("reactBlogID");
    if (token === undefined || token === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          name='home'
          path='/'
          element={
            isLoggedIn ? <HomePage /> : <LoginPage authType='login' />
          }></Route>
        <Route
          name='compose'
          path='/compose'
          element={
            isLoggedIn ? <Compose /> : <LoginPage authType='login' />
          }></Route>
        <Route name='error' path='*' element={<Error />}></Route>
        <Route
          name='editJournal'
          path='edit/:journalID'
          element={
            isLoggedIn ? <EditJournal /> : <LoginPage authType='login' />
          }></Route>
        <Route
          name='journal'
          path='journal/:journalID'
          element={
            isLoggedIn ? <Journal /> : <LoginPage authType='login' />
          }></Route>
        <Route
          name='signup'
          path='/signup'
          element={<LoginPage authType='signup' />}></Route>
        <Route
          name='login'
          path='/login'
          element={<LoginPage authType='login' />}></Route>
        <Route
          name='settings'
          path='/settings'
          element={
            isLoggedIn ? <SettingsPage /> : <LoginPage authType='login' />
          }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

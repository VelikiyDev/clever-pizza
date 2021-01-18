import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Auth from "./components/pages/Auth";
import {List} from "./components/pages/List";
import {ListAdd} from "./components/pages/ListAdd";
import {ListEdit} from "./components/pages/ListEdit";

export const useRoutes = authenticated => {
  return (
    <Switch>
      <Route path="/" exact>
        <List/>
      </Route>
      <Route path="/login" exact>
        <Auth/>
      </Route>
      <Route path="/add" exact>
        <ListAdd/>
      </Route>
      <Route path="/edit/:id">
        <ListEdit/>
      </Route>
      <Redirect to={'/'}/>
    </Switch>
  )
}
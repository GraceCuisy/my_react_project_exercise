// App组件是所有组件的壳子组件,
// 定义App组件,并暴露出去
import React,{Component} from "react";
import {Switch,Route,Redirect} from 'react-router-dom'
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";

export default class App extends Component{
  render(){
    return(
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/Admin' component={Admin}/>
        <Redirect to='/login'/>
      </Switch>
    )
  }
}

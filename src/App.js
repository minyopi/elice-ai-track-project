import React from 'react'
import { Route, useParams } from 'react-router-dom';
import UserStore from "./store/user";
// import './css/reset.css';
import './css/app.css';
import { TestExample } from './components/TestExample';
import { SetUser } from './components/SetUser';
import { Test } from './components/Test';

export const key = '43c8e52955dbc4c8d2b69e98c6d641f2';


function App() {
  
  
  return (
    <UserStore>
      <div className="App">
        <Route exact path='/'>
         <SetUser></SetUser>
        </Route>
        <Route path='/testExample'>
          <TestExample></TestExample>
        </Route>
        <Route path='/test'>
          <Test></Test>
        </Route>
        <Route path='/finishTest'></Route>
        <Route path='/result'></Route>
      </div>
    </UserStore>
  );
}

export default App;

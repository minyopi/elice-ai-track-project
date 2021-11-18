import React from 'react'
import { Route } from 'react-router-dom';
import UserStore from "./store/user";
// import './css/reset.css';
import './css/app.css';
import { TestExample } from './components/TestExample';
import { SetUser } from './components/SetUser';
import { Test } from './components/Test';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.logErrorToMyService(error, errorInfo);
  }

  logErrorToMyService(error, errorInfo) {
    console.log( `error: ${error}, errorInfo: ${JSON.stringify(errorInfo)}` )
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>페이지를 요청할 수 없습니다.</h1>;
    }

    return this.props.children; 
  }
}


function App() {
  
  
  return (
    <div className="App">
      <ErrorBoundary>
        <UserStore>
          <Route exact path='/'>
          <SetUser></SetUser>
          </Route>
          <Route path='/testExample'>
            <TestExample></TestExample>
          </Route>
          <Route path='/test/:page'>
            <Test></Test>
          </Route>
          <Route path='/finishTest'></Route>
          <Route path='/result'></Route>
        </UserStore>
      </ErrorBoundary>
    </div>
  );
}

export default App;

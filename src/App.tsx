import React from 'react';
import './App.css';
import Navbar from './Components/Home/Navbar';
import {BrowserRouter as Router} from 'react-router-dom'
import Main from './Components/Home/Main';
type tokenTypes = {
  sessionToken: string | null,
  user: string | null,
}
class App extends React.Component<{}, tokenTypes>{
  constructor(props: {}){
    super(props)
    this.state = {
      sessionToken: localStorage.getItem('token') ? localStorage.getItem('token'): '',
      user: localStorage.getItem('userRole') ? localStorage.getItem('userRole'): '',
    }
    this.updateToken = this.updateToken.bind(this);
    this.setUser = this.setUser.bind(this);
    this.clearToken = this.clearToken.bind(this);
  }
  updateToken(newToken: string){
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: newToken})
  }
  setUser(userRole: string) {
    localStorage.setItem('userRole', userRole)
    this.setState({user: userRole})
  }
  clearToken(){
    localStorage.clear();
    this.setState({sessionToken: ''})
  }
  render(){
    return(
      <div className="App">
        <Router>
          <Navbar
            updateToken={this.updateToken}
            token={this.state.sessionToken == null ? '': this.state.sessionToken}
            user={this.state.user == null ? '': this.state.user}
            setUser={this.setUser}
            clearToken={this.clearToken}
          />
          <Main
          updateToken={this.updateToken}
          token={this.state.sessionToken == null ? '': this.state.sessionToken}
          user={this.state.user == null ? '': this.state.user}
          setUser={this.setUser}
          clearToken={this.clearToken}
          />
        </Router>
      </div>
    )
  }
}
export default App;
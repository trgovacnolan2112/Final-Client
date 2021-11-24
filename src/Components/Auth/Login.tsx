import React from 'react'
import APIURL from '../../Connect/API-URL'
import {Button} from '@material-ui/core'

type userTypes = {
    user: {},
    username: string,
    userlogin: string,
    passwordlogin: string,
}
type propTypes ={
    updateToken(newToken: String): void,
    setUser( user: String): void,
}
class Login extends React.Component<propTypes, userTypes>{
    constructor(props: propTypes) {
        super(props)
        this.state = {
            user: {},
            username: '',
            userlogin: '',
            passwordlogin: '',
        }
    }

    handleSubmitLogin = (e:any) =>{
        e.preventDefault()
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({user:{username: this.state.username, password: this.state.passwordlogin}}),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        .then(res=> res.json())
        .then(data => {
            console.log('Login Success')
            this.setState({
                user:data
            })
            this.props.updateToken(data.sessionToken);
        })
        .catch(err => {
            console.log('error:', err)
        })

    }
    render(){
        return (
          <div className="container">
              <form onSubmit={(e:any)=>{this.handleSubmitLogin(e)}}className="entry">
                  <div>
                      <h2>Login</h2>
                  </div>
                  <div>
                      <label>UserName:</label>
                      <input type="text" onChange={(e) => this.setState({username: e.target.value})} name="user" value={this.state.username}></input>
                  </div>
                      <label>Password:</label>
                      <input type="password" onChange={(e) => this.setState({passwordlogin: e.target.value})} name="password" value={this.state.passwordlogin}></input>
                      <Button type='submit' style={{ backgroundColor: 'lightGray' }} >Submit</Button>
              </form>
          </div>
        )
    }
}
export default Login
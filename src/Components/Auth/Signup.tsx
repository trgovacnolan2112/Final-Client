import React from 'react'
import APIURL from '../../Connect/API-URL'
import {Button} from '@material-ui/core'

type userTypes = {
    user: string,
    username: string,
    email: string,
    usersignup: string,
    passwordsignup: string,
}
type propTypes ={
    updateToken(newToken: String): void,
    setUser( user: String): void
}
class Signup extends React.Component<propTypes, userTypes>{
    constructor(props: propTypes) {
        super(props)
        this.state = {
            user: '',
            username: '',
            email: '',
            usersignup: '',
            passwordsignup: ''
        }
    }
    handleSubmitSignup = (e:any) =>{
        e.preventDefault()
            fetch(`${APIURL}/user/register`, {
                method: 'POST',
                body: JSON.stringify({user:{email: this.state.email, username: this.state.username, password: this.state.passwordsignup}}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log('Signup Success')
                this.setState({
                    user: data
                });
                this.props.updateToken(data.sessionToken)
            })
            .catch(err => {
                console.log(err)
                })    
    }
    render(){
        return (
          <div className="container">
              <form onSubmit={(e:any)=>{this.handleSubmitSignup(e)}}className="entry">
                  <div>
                      <h2>Signup</h2>
                      <label>Email:</label>
                      <input onChange={(e) => this.setState({email: e.target.value})} name="email" value={this.state.email}></input>
                  </div>
                  <div>
                      <label>UserName:</label>
                      <input type="text" onChange={(e) => this.setState({username: e.target.value})} name="user" value={this.state.username}></input>
                  </div>
                      <label>Password:</label>
                      <input type="password" onChange={(e) => this.setState({passwordsignup: e.target.value})} name="password" value={this.state.passwordsignup}></input>
                      <Button type='submit' style={{ backgroundColor: 'lightGray' }} >Submit</Button>
              </form>
          </div>
        )
    }
}
export default Signup
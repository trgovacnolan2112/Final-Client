import React from 'react'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'

type PropTypes = {
    updateToken (newToken: string): void,
    token: string | null,
    user: string | null,
    setUser(user: string): void,
    clearToken(): void,
}


class Main extends React.Component<PropTypes , {}> {
render() {
let path
      if(this.props.token !==''){
          path='/GamerLog'
      }else{
          path='/Main'
      }
      return(
     <div>
         <Signup 
         updateToken ={this.props.updateToken}
         setUser={this.props.setUser}/>
         <Login 
        updateToken ={this.props.updateToken}
        setUser={this.props.setUser}
        />
     </div>
      )
}
}
export default Main
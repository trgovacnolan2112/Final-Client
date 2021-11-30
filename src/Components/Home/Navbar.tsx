import React from 'react'
import Gamelog from '../Gamelog/Gamelog'
import Codes from '../Codelog/Codelog'
import GamerLog from '../Apps/LogFunction/GamerLogs'
import {Route, Routes, Link} from 'react-router-dom'
import AppBar  from '@material-ui/core/AppBar'
import Toolbar  from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
type PropTypes = {
    updateToken (newToken: string): void,
    token: string,
    user: string,
    setUser(user: string): void,
    clearToken(): void,
}
const styles = {
    root: {
        width: '100%',
        backgroundColor: 'light gray',
        color: 'dark gray'
    },
    title: {
        color: 'dark gray',
        dispay: 'center',
        font: 'bold'
    }
}
class Navbar extends React.Component<PropTypes, {}> {
  render() {
      let path
      if(this.props.token !==''){
          path='/profile'
      }else{
          path='/'
      }
      return(
          <div>
              <div className='navbar-list' style={styles.root}>
                  <AppBar position='static' style={styles.root}>
                      <Toolbar>
                          <Button><Link className='link' to='/gamelog'>Gamelog</Link></Button>
                          <Button><Link className='link' to='/codelog'>Codelog</Link></Button>
                          <Typography className='title' variant='h5' style={styles.title}>
                              Personal Profile
                          </Typography>
                          <Button><Link className='link' to='/gamerlog'>Profile</Link></Button>
                          <Button onClick={this.props.clearToken} style={{borderLeft: '5px', borderColor: 'red'}}><Link className='link' to='/'>Logout</Link></Button>
                      </Toolbar>
                  </AppBar>
              </div>
              <div className='sitebar-tabs'>
                  <div>
                      <Routes>
                      <Route path='/home'></Route>
                      <Route path='/gamelog' element={<Gamelog token={this.props.token} user={this.props.user}/>} />
                      <Route path='/codelog' element={<Codes token={this.props.token} user={this.props.user}/>} />
                      <Route path='/gamerlog' element={<GamerLog token={this.props.token} user={this.props.user}/>} />
                      </Routes>
                  </div>
              </div>
          </div>
      )
  }
}
export default Navbar
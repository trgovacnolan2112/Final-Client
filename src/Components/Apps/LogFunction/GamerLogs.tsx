import React from 'react'
import GamerLogDisplay from './Display/GamerLogsDisplay'
import Button from '@material-ui/core/Button'
import CreateCodeLog from './CreateCodeLog'
import CreateGameLog from './CreateGameLog'
import APIURL from '../../../Connect/API-URL'


type propTypes= {
    token: string | null
}

type gamelogForm ={
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating: number,
    comments: string,
    id: number
}

type codelogForm ={
    cheat: string,
    code: string,
    enables: string,
    effects: string,
    id: number,
}

type userTypes ={
    user: {userName: string},
    userGamelog: Array<gamelogForm>,
    userCodelog: Array<codelogForm>,
    list: number,
}

class GamerLog extends React.Component<propTypes, userTypes>{
    constructor(props: propTypes){
        super(props)
        this.state ={
            user: {userName: ''},
            userGamelog: [],
            userCodelog: [],
            list: 0
        }
    }
    fetchUser(){
        fetch(`${APIURL}/user`,{
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                user: data,
                userGamelog: data.gamelog,
                userCodelog: data.codelog
            })
        })
    }
    deleteGamelog(id: number, token: string) {
        fetch(`${APIURL}/gamelog/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `${this.props.token}`
            }
        })
        .catch(err => console.log(err))
    }
    deleteCodelog(id: number, token: string){
        fetch(`${APIURL}/codelog/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `${this.props.token}`
            }
        })
        .catch(err => console.log(err))
    }
    componentDidMount() {
        this.fetchUser()
    }
    render(){
        return(
            <div>
                <div className='ModalDiv'>
                    <CreateGameLog token={this.props.token}/>
                    <CreateCodeLog token={this.props.token}/>
                </div>
                <div className='viewConductor' style={{display: 'flex', justifyContent: 'center'}}>
                <Button style={{border: '2px solid grey', marginRight: '2px'}} onClick={() => this.setState({list: 0})}>My Games</Button>
                <Button style={{border: '2px solid grey'}} onClick={() => this.setState({list: 1})}>My Codes</Button>  
                </div>
                <GamerLogDisplay
                 userGamelog={this.state.userGamelog}
                 userCodelog={this.state.userCodelog}
                 user={this.state.user}
                 viewConductor={this.state.list}
                 deleteGamelog={this.deleteGamelog}
                 deleteCodelog={this.deleteCodelog}
                 token={this.props.token}
                 />
            </div>
        )
    }
}
export default GamerLog
import React, {Component} from 'react'
import GamerLogDisplay from './Display/GamerLogsDisplay'
import Button from '@material-ui/core/Button'
import CreateCodeLog from './CreateCodeLog'
import CreateGameLog from './CreateGameLog'
import APIURL from '../../../Connect/API-URL'
type propTypes= {
    token: string,
    user: string,
}
type gamelogForm ={
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating: number,
    comments: string,
    id: number,
    token: string
}
type codelogForm ={
    cheat: string,
    code: string,
    enables: string,
    effects: string,
    id: number,
    token: string
}

type userTypes ={
    user: string,
    userGamelog: Array<gamelogForm>,
    userCodelog: Array<codelogForm>,
    list: number,
}

class GamerLog extends Component<propTypes, userTypes>{
    constructor(props: propTypes){
        super(props)
        this.state ={
            user: this.props.user,
            userGamelog: [],
            userCodelog: [],
            list: 0
        }
    }
    createCode(token: string,cheat: string, code: string, enables: string, effects: string, id: number){
        fetch(`${APIURL}/codelog/create`,{
            method: 'POST',
            body:JSON.stringify({
                codelog:{
                cheat: cheat,
                code: code,
                enables: enables,
                effects: effects,
                id: id}
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .catch(err => console.log(err))
    }
    getCode() {
        fetch(`${APIURL}/codelog/mine`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${this.props.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                userCodelog: data
            });
            console.log(data)
        })
    }
    fetchUser(){
        fetch(`${APIURL}/user`,{
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
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
    deleteGame(id: number, token: string) {
        fetch(`${APIURL}/gamelog/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .catch(err => console.log(err))
    }
    updateCode(id: number, cheat: string, code: string, enables: string, effects: string, token: string ){
        fetch(`${APIURL}/codelog/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                codelog: {
                cheat: cheat,
                code: code,
                enables: enables,
                effects: effects,
                }
            }),
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            })
        })
            .then(response => response.json())
    }
    deleteCode(id: number){
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
                 deleteCodelog={this.deleteCode}
                 deleteGamelog={this.deleteGame}
                 updateCode={this.updateCode}
                 getAllCodelogs={this.getCode}
                 token={this.props.token}
                 />
            </div>
        )
    }
}
export default GamerLog
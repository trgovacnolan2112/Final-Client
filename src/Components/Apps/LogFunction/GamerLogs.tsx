import React, {Component} from 'react'
import GamerLogDisplay from './Display/GamerLogsDisplay'
import Button from '@material-ui/core/Button'
import APIURL from '../../../Connect/API-URL'
import CreateGamelog from '../LogFunction/CreateGameLog'
type propTypes= {
    token: string,
    user: string,
}
type gamelogForm ={
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating: string,
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
    createCode(cheat: string, code: string, enables: string, effects: string, token: string){
        fetch(`${APIURL}/codelog/create`,{
            method: 'POST',
            body:JSON.stringify({
                codelog:{
                cheat: cheat,
                code: code,
                enables: enables,
                effects: effects,
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .catch(err => console.log(err))
    }
    createGame(title: string, hoursplayed: string, difficulty: string, rating: string, comments: string, token: string){
        fetch(`${APIURL}/gamelog/create`,{
            method: 'POST',
            body:JSON.stringify({
                gamelog :{
                title: title,
                hoursplayed: hoursplayed,
                difficulty: difficulty,
                rating: rating,
                comments: comments,
                }
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
    getGame(){
        fetch(`${APIURL}/gamelog/mine`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${this.props.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                userGamelog: data
            });
            console.log(data)
        })
    }
    updateCode(id: number, cheat: string, code: string, enables: string, effects: string){
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
                'Authorization':`Bearer ${this.props.token}`
            })
        })
            .then(response => response.json())
    }
    updateGame(id: number, title: string, hoursplayed: string, difficulty: string, rating: string, comments: string, token: string){
        fetch(`${APIURL}/gamelog/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                gamelog: {
                title: title,
                hoursplayed: hoursplayed,
                difficulty: difficulty,
                rating: rating,
                comments: comments,
                id: id}
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data=> console.log(data))
        .catch(err => console.log(err))
    }
    deleteCode(id: number){
        fetch(`${APIURL}/codelog/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }
        })
        .catch(err => console.log(err))
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
    render(){
        return(
            <div>
                <div className='ModalDiv'>
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
                 updateGame={this.updateGame}
                 getAllCodelogs={this.getCode}
                 createCode={this.createCode}
                 createGame={this.createGame}
                 token={this.props.token}
                 />
            </div>
        )
    }
}
export default GamerLog
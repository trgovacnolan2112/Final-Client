import React from "react";
import APIURL from "../../Connect/API-URL";
import DisplayGamelogForum from './DisplayGamelog/DisplayGamelogForum'
import DisplayGamelog from './DisplayGamelog/DisplayGamelog';
import CreateGameLog from "../Apps/LogFunction/CreateGameLog";
type gamelogForm ={
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating:string,
    comments: string,
    id: number
}
type stateTypes ={
    gamelog: Array<gamelogForm>
    modalOpen: boolean
}
type propTypes={
    token: string,
    user: string | null,
}
class Gamelog extends React.Component<propTypes,stateTypes>{
    constructor(props: propTypes){
        super(props)
        this.state={
            gamelog: [],
            modalOpen: false
        }
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
                gamelog: data
            });
            console.log(data)
        })
    }
    createGame(title: string, hoursplayed: string, difficulty: string, rating:string, comments: string, token: string){
        fetch(`${APIURL}/gamelog/create`,{
            method: 'POST',
            body:JSON.stringify({
                gamelog :{
                title: title,
                difficulty: difficulty,
                hoursplayed: hoursplayed,
                rating: +rating,
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
    getForumGamelogs(){
        fetch(`${APIURL}/gamelog/forum`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${this.props.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                gamelog: data
            });
            console.log(data)
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
    updateGame(id: number, title: string, hoursplayed: string, difficulty: string, rating:string, comments: string, token: string){
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
    componentDidMount(){
        this.getGame()
        this.getForumGamelogs()
        console.log(this.props.user)
    }
    render(){
        return(
            <div className='container'>
                <CreateGameLog 
                token={this.props.token}
                createGame={this.createGame}
                />
                <DisplayGamelog
                deleteGame={this.deleteGame}
                updateGame={this.updateGame}
                createGame={this.createGame}
                userRole={this.props.token}
                token={this.props.token}
                />
                {/* <DisplayGamelogForum
                gamelog={this.state.gamelog}
                deleteGame={this.deleteGame}
                userRole={this.props.token}
                token={this.props.token}
                /> */}
            </div>
        )
    }
}

export default Gamelog
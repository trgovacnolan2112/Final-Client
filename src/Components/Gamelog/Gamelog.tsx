import React from "react";
import APIURL from "../../Connect/API-URL";
import DisplayGamelogForum from './DisplayGamelog/DisplayGamelogForum'
import DisplayGamelog from './DisplayGamelog/DisplayGamelog';

type gamelogForm ={
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating: number,
    comments: string,
    id: number
}

type gamelogTypes ={
    gamelog: Array<gamelogForm>
    modalOpen: boolean
}

type propTypes={
    token: string,
    user: string | null,
}

class Gamelog extends React.Component<propTypes,gamelogTypes>{
    constructor(props: propTypes){
        super(props)
        this.state={
            gamelog: [],
            modalOpen: false
        }
    }
    getAllGamelogs(){
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
                'Authorization': `${token}`
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.getAllGamelogs()
        this.getForumGamelogs()
        console.log(this.props.user)
    }
    render(){
        return(
            <div className='container'>
                <DisplayGamelog
                gamelog={this.state.gamelog}
                deleteGame={this.deleteGame}
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
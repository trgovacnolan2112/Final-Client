import React from "react";
import APIURL from "../../Connect/API-URL";
import DisplayGamelog from './DisplayGamelog/DisplayGamelog';
import DisplayGamelogForum from './DisplayGamelog/DisplayGamelogForum'

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
    token: string | null,
    user: string | null
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
        fetch(`${APIURL}/gamelog/mine}`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
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
        fetch(`${APIURL}/gamelog/forum}`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
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
    deleteGamelog(id: number) {
        fetch(`${APIURL}/gamelog/${id}`,{
            method: 'DELETE',
            headers: {
                'Contente-Type':'application/json',
                'Authorization': `${this.props.token}`
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
                gamelogResults={this.state.gamelog}
                deleteGamelog={this.deleteGamelog}
                userRole={this.props.token}
                token={this.props.token}
                />
                <DisplayGamelogForum
                gamelogResultsForum={this.state.gamelog}
                deleteGamelog={this.deleteGamelog}
                userRole={this.props.token}
                token={this.props.token}
                />

            </div>
        )
    }
}

export default Gamelog
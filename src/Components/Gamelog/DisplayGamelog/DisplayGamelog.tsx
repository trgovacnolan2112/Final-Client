import React from 'react';
import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core/'
import {Typography} from '@material-ui/core';
import UpdateGameLog from '../../Apps/LogFunction/UpdateGamelog'
import APIURL from '../../../Connect/API-URL'
import DeleteGame from '../../Apps/LogFunction/DeleteGame'
import CreateGame from '../../Apps/LogFunction/CreateGameLog';
type gamelogForm ={
    gamelog: [],
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating:string,
    comments: string,
    id: number
}
type gamelogProps ={
    userRole: string |null,
    token: string,
    updateGame: (id: number, title: string, hoursplayed: string, difficulty: string, rating:string, comments: string, token: string)=> void,
    deleteGame: (id: number, token: string)=> void,
    createGame: (title: string, hoursplayed: string, difficulty: string, rating:string, comments: string, token: string)=> void
}
class DisplayGame extends React.Component<gamelogProps, gamelogForm>{
    constructor(props: any) {
        super(props)
        this.state={
            gamelog: [],
            title: '',
            hoursplayed: '',
            difficulty: '',
            rating: '',
            comments: '',
            id: 0
        }
    }
    componentDidMount() {
        this.getMyGamelogs();
    }
    getMyGamelogs(){
        fetch(`${APIURL}/gamelog/mine`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${this.props.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                gamelog: data,
                title: data.title,
                hoursplayed: data.hoursplayed,
                difficulty: data.difficulty,
                rating: data.rating,
                comments: data.comments
            });
            console.log(data)
        })
    } 
gameLogMap(){
    return this.state.gamelog.map((gamelog: gamelogForm, index: number) =>(
                    <div className='container' key={index}>
                        <Card className='main'>
                            <CardContent>
                                <Typography className='title' color='textPrimary' gutterBottom>
                                    Game Name:
                                </Typography>
                                <Typography variant='h5' component='h2'>
                                    {gamelog.title}
                                </Typography>
                                <Typography className='second' color="textSecondary">
                                    {gamelog.difficulty}
                                </Typography>
                                <Typography className='second' color="textSecondary">
                                    {gamelog.hoursplayed}
                                </Typography>
                                <Typography className='second' color="textSecondary">
                                    {gamelog.rating}
                                </Typography>
                                <Typography className='second' color="textSecondary">
                                    {gamelog.comments}
                                </Typography>
                                <div className='modalDiv'>
                                    <UpdateGameLog
                                    updateGame={this.props.updateGame}
                                    token={this.props.token}
                                    id={gamelog.id}
                                    gamelog={gamelog}
                                    />
                                    <DeleteGame
                                    id={gamelog.id}
                                    deleteGame={this.props.deleteGame}
                                    token={this.props.token}
                                    />
                                    <CreateGame
                                    createGame={this.props.createGame}
                                    token={this.props.token}/>
                                </div>
                            </CardContent>
                        </Card>
                        </div>
    ))
    }
render() {
    return (
        <div>
            {this.gameLogMap()}
        </div>
    )
}
}

export default DisplayGame
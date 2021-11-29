import React from 'react';
import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core/'
import {Typography} from '@material-ui/core';
import UpdateGameLog from '../../Apps/LogFunction/UpdateGamelog'
import APIURL from '../../../Connect/API-URL'
import DeleteGame from '../../Apps/LogFunction/DeleteGame'
type gamelogForm ={
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating: number,
    comments: string,
    id: number
}
type gamelogProps ={
    userRole: string |null,
    token: string,
    deleteGame: (id: number, token: string)=> void,
    gamelog: gamelogForm[]
}
type stateType = {
    gamelogs:[]
}
class DisplayGame extends React.Component<gamelogProps, stateType>{
    constructor(props: any) {
        super(props)
        this.state={
            gamelogs: []
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
                gamelogs: data
            });
            console.log(data)
        })
    } 
gameLogMap(){
    return this.state.gamelogs.map((gamelog: gamelogForm, index: number) =>(
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
                                    token={this.props.token}
                                    />
                                    <DeleteGame
                                    id={gamelog.id}
                                    deleteGame={this.props.deleteGame}
                                    token={this.props.token}
                                    />
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
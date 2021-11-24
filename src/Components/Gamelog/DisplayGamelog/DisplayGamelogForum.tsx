import React from 'react';
import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core/'
import {Typography} from '@material-ui/core';
import UpdateGameLog from '../../Apps/LogFunction/UpdateGamelog'

type gamelogForm ={
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating: number,
    comments: string,
    id: number
}

type gamelogAdminProps ={
    gamelogResultsForum: Array<gamelogForm>,
    deleteGamelog(id: number): void,
    userRole: string |null,
    token: string | null,
} 

type modalType ={
    modalOpen: boolean
}

type modalProps ={
    id: number,
    deleteGamelog(id: number): void
}


class Modal extends React.Component<modalProps, modalType>{
    constructor(props: modalProps) {
        super(props)
        this.state={
            modalOpen: false
        }
    }
    handleOpen(){
        this.setState({modalOpen: true})
    }
    handleClose(){
        this.setState({modalOpen: false})
    }
    render(){
        return(
            <div>
                <button style ={{border: '1px solid grey'}} onClick={()=> this.handleOpen()}>Delete Log</button>
                <dialog
                open={this.state.modalOpen}>
                    <div style={{padding: '10px'}}>
                        <h2>Confirm</h2>
                        <button style={{border: '2px solid red'}} onClick={() =>this.props.deleteGamelog(this.props.id)}>YES</button>
                        <button style={{border: '2px solid red'}} onClick={() =>this.handleOpen}>NO</button>
                    </div>
                </dialog>
            </div>
        )
    }
}


const DisplayGamelogForum = (props: gamelogAdminProps) => {
    return(
        <div>
            {props.gamelogResultsForum.map((gamelog: gamelogForm, index: number) =>{
                return(
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
                                    token={props.token}
                                    id={gamelog.id}/>
                                    <Modal
                                    id={gamelog.id}
                                    deleteGamelog={props.deleteGamelog}>
                                    </Modal>
                                </div>
                            </CardContent>
                        </Card>
                        </div>
                )
            })}
        </div>
    )
}

export default DisplayGamelogForum
import React from 'react'
import {Dialog, PropTypes} from '@material-ui/core'
import {Button} from '@material-ui/core'
import APIURL from '../../../Connect/API-URL'

type propTypes ={
    token: string | null,
    id: number
}

type updateGameLogTypes = {
    modalOpen: boolean,
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating: number,
    comments: string,
    logID: number
}

class UpdateGameLog extends React.Component<propTypes, updateGameLogTypes>{
    constructor(props: propTypes){
        super(props)
        this.state={
            modalOpen: false,
            title: '',
            hoursplayed: '',
            difficulty: '',
            rating: 0,
            comments: '',
            logID: 0
        }
    }
    updateGameLogFetch(id: number){
        fetch(`${APIURL}/gamelog/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: this.state.title,
                hoursplayed: this.state.hoursplayed,
                difficulty: this.state.difficulty,
                rating: this.state.rating,
                comments: this.state.comments
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`${this.props.token}`
            }
        })
    }
    handleOpen(id: number){
        this.setState({modalOpen: true})
        this.setState({logID: id})
    }
    handleCLose(){
        this.setState({modalOpen: false})
    }
    handleClick(id: number){
        this.setState({logID: id})
    }
    render(){
        return(
            <div className= 'updateModal'>
                <Button type='button' style={{border: '2px solid black'}} onClick={() => this.handleOpen(this.props.id)}>
                    Update Log
                </Button>
                <Dialog
                open={this.state.modalOpen}
                onClose={() => this.handleCLose()}>
                    <div style ={{padding: '10px'}}>
                        <h2>Update Current Gamelog</h2>
                        <p>
                            Fill In and Submit Update
                        </p>
                        <form className='modalForm' onSubmit={() => this.updateGameLogFetch(this.props.id)}>
                        <label>Name of Game Played</label>
                        <input type ='text' onChange={(e) => this.setState({title: e.target.value})} />
                           <label>Title of Game</label>
                        <input type ='text' onChange={(e) => this.setState({hoursplayed: e.target.value})} />
                           <label>Total Hours Logged</label>
                        <input type ='text' onChange={(e) => this.setState({difficulty: e.target.value})} />
                           <label>Level Of Difficulty</label>
                        <input type ='number' onChange={(e) => this.setState({rating:parseInt(e.target.value)})} />
                           <label>Overall Rating</label>
                        <input type ='text' onChange={(e) => this.setState({comments: e.target.value})} />
                           <label>Comments On Gameplay</label>
                        </form>
                    </div>
                </Dialog>
            </div>
        )
    }
}
export default UpdateGameLog
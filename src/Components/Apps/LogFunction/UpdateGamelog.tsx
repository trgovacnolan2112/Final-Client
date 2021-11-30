import React from 'react'
import {Dialog, PropTypes} from '@material-ui/core'
import {Button} from '@material-ui/core'
import APIURL from '../../../Connect/API-URL'
type updateGameLogTypes = {
    modalOpen: boolean,
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating: string,
    comments: string,
    id: number
}
type propTypes ={
    token: string,
    updateGame: (id: number, title: string, hoursplayed: string, difficulty: string, rating: string, comments: string, token: string)=> void,
    id: number,
    gamelog: any
}
class UpdateGameLog extends React.Component<propTypes,updateGameLogTypes>{
    constructor(props: propTypes){
        super(props)
        this.state={
            modalOpen: false,
            title: this.props.gamelog.title,
            hoursplayed: this.props.gamelog.hoursplayed,
            difficulty: this.props.gamelog.difficulty,
            rating: this.props.gamelog.rating, 
            comments: this.props.gamelog.comments,
            id: this.props.id
        }
    }
    handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        console.log('inside handle submit')
        this.props.updateGame(this.props.id, this.state.title, this.state.hoursplayed, this.state.difficulty, this.state.rating, this.state.comments, this.props.token)
        this.handleCLose()
    }
    handleOpen(){
        this.setState({modalOpen: true})

    }
    handleCLose(){
        this.setState({modalOpen: false})
    }
    render(){
        return(
            <div className= 'updateModal'>
                <Button type='button' style={{border: '2px solid black'}} onClick={() => this.handleOpen()}>
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
                        <form className='modalForm' onSubmit={(e) => this.handleSubmit(e)}>
                        <label>Name of Game Played</label>
                        <input type ='text' value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
                           <label>Title of Game</label>
                        <input type ='text' value={this.state.hoursplayed} onChange={(e) => this.setState({hoursplayed: e.target.value})} />
                           <label>Total Hours Logged</label>
                        <input type ='text' value={this.state.difficulty} onChange={(e) => this.setState({difficulty: e.target.value})} />
                           <label>Level Of Difficulty</label>
                        <input type ='text' value={this.state.rating} onChange={(e) => this.setState({rating: e.target.value})} />
                           <label>Overall Rating</label>
                        <input type ='text' value={this.state.comments} onChange={(e) => this.setState({comments: e.target.value})} />
                           <label>Comments On Gameplay</label>
                           <Button type='submit' style={{margin: '10px', border: '2px solid grey'}}>Submit Update</Button>
                        </form>
                    </div>
                </Dialog>
            </div>
        )
    }
}
export default UpdateGameLog
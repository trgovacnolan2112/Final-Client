import React from 'react'
import {Dialog, PropTypes} from '@material-ui/core'
import {Button} from '@material-ui/core'
import APIURL from '../../../Connect/API-URL'
type updateGameLogTypes = {
    modalOpen: boolean,
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating: number,
    comments: string,
    id: string
}
type propTypes ={
    token: string,
}
class UpdateGameLog extends React.Component<propTypes,updateGameLogTypes>{
    constructor(props: propTypes){
        super(props)
        this.state={
            modalOpen: false,
            title: this.state.title,
            hoursplayed: this.state.hoursplayed,
            difficulty: this.state.difficulty,
            rating: this.state.rating, 
            comments: this.state.comments,
            id: this.state.id
        }
    }
    updateGameLog(){
        fetch(`${APIURL}/gamelog/update/${this.state.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                gamelog: {
                title: this.state.title,
                hoursplayed: this.state.hoursplayed,
                difficulty: this.state.difficulty,
                rating: this.state.rating,
                comments: this.state.comments,
                id: this.state.id}
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`${this.props.token}`
            }
        })
    }
    handleSubmit(){
        this.updateGameLog()
    }
    handleOpen(){
        this.setState({modalOpen: true})

    }
    handleCLose(){
        this.setState({modalOpen: false})
    }
    handleClick(id: string){
        this.setState({id: ''})
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
                        <form className='modalForm' onSubmit={() => this.updateGameLog()}>
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
                           <Button type='submit' style={{margin: '10px', border: '2px solid grey'}}>Submit Update</Button>
                        </form>
                    </div>
                </Dialog>
            </div>
        )
    }
}
export default UpdateGameLog
import React,{Component} from 'react'
type createGamelogEntry ={
    modalOpen: boolean,
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating: string,
    comments: string,
}
type propTypes ={
    token: string
    createGame: (title: string, hoursplayed: string, difficulty: string, rating: string, comments: string, token: string)=> void,
}
class CreateGameLog extends Component<propTypes, createGamelogEntry>{
    constructor(props: propTypes) {
        super(props)
        this.state ={
            modalOpen: false,
            title: '',
            hoursplayed: '',
            difficulty: '',
            rating: '',
            comments: '',
        }
    }
    handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e. preventDefault()
        console.log('inside handle submit')
        this.props.createGame(this.state.title, this.state.hoursplayed,this.state.difficulty,this.state.rating,this.state.comments,this.props.token)
        this.handleClose()
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
                <button type='button' style={{marginTop: '10px', border: '2px solid grey'}} onClick={() => this.handleOpen()}>
                    Create Log
                </button>
                <dialog
                  open={this.state.modalOpen}
                  onSubmit={() => this.handleClose()}>
                    <div style={{padding: '10px'}}>
                       <h2> Enter Your Gamelog</h2>
                       <p>
                           Fill in the Required Sections For Later Use
                       </p>
                       <form onSubmit={(e) => this.handleSubmit(e)}>
                           <label>Name Of Game</label>
                           <input type ='text' onChange={(e) => this.setState({title: e.target.value})} />
                           <label>Hours Played</label>
                           <input type ='text' onChange={(e) => this.setState({hoursplayed: e.target.value})} />
                           <label>Highest Difficulty</label>
                           <input type ='text' onChange={(e) => this.setState({difficulty: e.target.value})} />
                           <label>Rating of Game</label>
                           <input type ='number' onChange={(e) => this.setState({rating: e.target.value})} />
                           <label>Other Comments</label>
                           <input type ='text' onChange={(e) => this.setState({comments: e.target.value})} />
                           <button type='submit'>Submit Game Log</button>
                        </form>
                    </div>
                  </dialog>
            </div>
        )
    }
}

export default CreateGameLog
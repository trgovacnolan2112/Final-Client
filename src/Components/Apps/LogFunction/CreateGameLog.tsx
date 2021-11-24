import React from 'react'
import APIURL from '../../../Connect/API-URL'

type propTypes ={
    token: string | null
}

type createGamelogEntry ={
    modalOpen: boolean,
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating: string,
    comments: string,
}

class CreateGameLog extends React.Component<propTypes, createGamelogEntry>{
    constructor(props: propTypes) {
        super(props)
        this.state ={
            modalOpen: false,
            title: '',
            hoursplayed: '',
            difficulty: '',
            rating: '',
            comments: ''
        }
    }
    createGamelogFetch(){
        fetch(`${APIURL}/codelog/create`,{
            method: 'POST',
            body:JSON.stringify({
                modalOpen: false,
                title: '',
                hoursplayed: '',
                rating: '',
                comments: ''
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`${this.props.token}`
            }
        })
        .catch(err => console.log(err))
    }
    handleSubmit(event: React.FormEvent<HTMLFormElement>){
        this.createGamelogFetch()
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
                           <input type ='text' onChange={(e) => this.setState({rating: e.target.value})} />
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
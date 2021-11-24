import React from 'react'
import APIURL from '../../../Connect/API-URL'

type propTypes ={
    token: string | null
}

type createCodelogEntry ={
    modalOpen: boolean,
    cheat: String,
    code: String,
    enables: String,
    effects: String,
}

class CreateCodeLog extends React.Component<propTypes, createCodelogEntry>{
    constructor(props: propTypes) {
        super(props)
        this.state ={
            modalOpen: false,
            cheat: '',
            code: '',
            enables: '',
            effects: ''

        }
    }
    createCodelogFetch(){
        fetch(`${APIURL}/codelog/create`,{
            method: 'POST',
            body:JSON.stringify({
                modalOpen: false,
                cheat: '',
                code: '',
                enables: '',
                effects: ''
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`${this.props.token}`
            }
        })
        .catch(err => console.log(err))
    }
    handleSubmit(event: React.FormEvent<HTMLFormElement>){
        this.createCodelogFetch()
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
                       <h2> Enter Your Cheats</h2>
                       <p>
                           Fill in the Required Sections For Later Use
                       </p>
                       <form onSubmit={(e) => this.handleSubmit(e)}>
                           <label>Name Of Game For Cheat</label>
                           <input type ='text' onChange={(e) => this.setState({cheat: e.target.value})} />
                           <label>Code To Enter</label>
                           <input type ='text' onChange={(e) => this.setState({code: e.target.value})} />
                           <label>Unlocked Abilities</label>
                           <input type ='text' onChange={(e) => this.setState({enables: e.target.value})} />
                           <label>Side Effects and Other Info</label>
                           <input type ='text' onChange={(e) => this.setState({effects: e.target.value})} />
                           <button type='submit'>Submit Code</button>
                        </form>
                    </div>
                  </dialog>
            </div>
        )
    }
}

export default CreateCodeLog
import React, {Component} from 'react'
type createCodelogEntry ={
    modalOpen: boolean,
    cheat: string,
    code: string,
    enables: string,
    effects: string,
}
type propTypes ={
    token: string,
    createCode: (cheat: string, code: string, enables: string, effects: string, token:string) => void,
}
class CreateCodeLog extends Component<propTypes, createCodelogEntry>{
    constructor(props: propTypes) {
        super(props)
        this.state ={
            modalOpen: false,
            cheat: '',
            code: '',
            enables: '',
            effects: '',
        }
    }
    handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        console.log('inside handle submit')
        this.props.createCode(this.state.cheat,this.state.code,this.state.enables,this.state.effects, this.props.token)
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
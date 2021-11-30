import React, {Component} from 'react'
import {Dialog} from '@material-ui/core'
import {Button} from '@material-ui/core/'
type updateCodeLogForm = {
    modalOpen: boolean,
    cheat: string,
    code: string,
    enables: string,
    effects: string,
    id: number
}
type codelogProps ={
    token: string,
    updateCode: (id: number, cheat: string, code: string, enables: string, effects: string, token: string) => void,
    id: number,
    codelog: any
}
class UpdateCodeLog extends Component<codelogProps, updateCodeLogForm> {
    constructor(props: codelogProps){
        super(props)
        this.state={
            modalOpen: false,
            cheat: this.props.codelog.cheat,
            code: this.props.codelog.code,
            enables: this.props.codelog.enables,
            effects: this.props.codelog.effects,
            id: this.props.id
        }
    }
    handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        console.log('inside handle submit')
        this.props.updateCode(this.props.id,this.state.cheat,this.state.code,this.state.enables,this.state.effects, this.props.token)
        this.handleClose()
    }
    handleOpen(){
        this.setState({modalOpen: true})
    }
    handleClose(){
        this.setState({modalOpen: false})
    }
    setCheat(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({cheat: e.target.value})
        console.log(this.state.cheat)
    }
    render(){
        return(
            <div className='updateModal'>
                <Button type='button' style={{border: '2px solid black'}} onClick={() => this.handleOpen()}>
                    Update Log
                </Button>
                <Dialog
                open={this.state.modalOpen}>
                    <div style={{padding: '10px'}}>
                        <h2>Update Current Codelog</h2>
                        <p>
                            Fill In and Submit Update
                        </p>
                        <form className='modalForm' onSubmit={(e) => this.handleSubmit(e)}>
                        <label>Name Of Game For Cheat</label>
                           <input type ='text' value= {this.state.cheat} onChange={(e) => this.setCheat(e)} />
                           <label>Code To Enter</label>
                           <input type ='text' value={this.state.code} onChange={(e) => this.setState({code: e.target.value})} />
                           <label>Unlocked Abilities</label>
                           <input type ='text' value={this.state.enables} onChange={(e) => this.setState({enables: e.target.value})} />
                           <label>Side Effects and Other Info</label>
                           <input type ='text' value={this.state.effects} onChange={(e) => this.setState({effects: e.target.value})} />
                           <button type='submit' style={{margin: '10px', border: '2px solid grey'}}>Submit Update</button>
                        </form>
                    </div>
                </Dialog>
            </div>
        )
    }
}
export default UpdateCodeLog
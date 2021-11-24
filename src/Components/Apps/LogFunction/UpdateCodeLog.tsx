import React from 'react'
import {Dialog} from '@material-ui/core'
import {Button} from '@material-ui/core/'
import APIURL from '../../../Connect/API-URL'

type propTypes = {
    token: string | null,
    id: number
}

type updateCodeLogTypes = {
    modalOpen: boolean,
    cheat: string,
    code: string,
    enables: string,
    effects: string,
    logID: number
}

class UpdateCodeLog extends React.Component<propTypes, updateCodeLogTypes> {
    constructor(props: propTypes){
        super(props)
        this.state={
            modalOpen: false,
            cheat: '',
            code: '',
            enables: '',
            effects: '',
            logID: 0
        }
    }

    updateCodeLogFetch(id: number){
        fetch(`${APIURL}/codelog/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                cheat: this.state.cheat,
                code: this.state.code,
                enables: this.state.enables,
                effects: this.state.effects
            }),
            headers: {
                'Content-Type':'application/json',
                'Authorization':`${this.props.token}`
            }
        })
    }
    handleOpen(id: number){
        this.setState({modalOpen: true})
        this.setState({logID: id})
    }
    handleClose(){
        this.setState({modalOpen: false})
    }
    handleClick(id: number){
        this.setState({logID: id})
    }
    render(){
        return(
            <div className='updateModal'>
                <Button type='button' style={{border: '2px solid black'}} onClick={() => this.handleOpen(this.props.id)}>
                    Update Log
                </Button>
                <Dialog
                open={this.state.modalOpen}
                onClose={() =>this.handleClose()}>
                    <div style={{padding: '10px'}}>
                        <h2>Update Current Codelog</h2>
                        <p>
                            Fill In and Submit Update
                        </p>
                        <form className='modalForm' onSubmit={() => this.updateCodeLogFetch(this.props.id)}>
                        <label>Name Of Game For Cheat</label>
                           <input type ='text' onChange={(e) => this.setState({cheat: e.target.value})} />
                           <label>Code To Enter</label>
                           <input type ='text' onChange={(e) => this.setState({code: e.target.value})} />
                           <label>Unlocked Abilities</label>
                           <input type ='text' onChange={(e) => this.setState({enables: e.target.value})} />
                           <label>Side Effects and Other Info</label>
                           <input type ='text' onChange={(e) => this.setState({effects: e.target.value})} />
                           <Button type='submit' style={{margin: '10px', border: '2px solid grey'}}>Submit Update</Button>
                        </form>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default UpdateCodeLog
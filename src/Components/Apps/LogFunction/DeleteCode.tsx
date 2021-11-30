import React, {Component} from 'react'
type modalType ={
    modalOpen: boolean
}
type modalProps ={
    id: number,
    deleteCode:(id: number, token: string)=>void,
    token: string
}
class DeleteCode extends Component<modalProps, modalType>{
    constructor(props: modalProps) {
        super(props)
        this.state = {
            modalOpen: false,
        }
    }
    handleOpen(){
        this.setState({modalOpen: true})
    }
    handleClose(){
        this.setState({modalOpen: false})
    }
    deleteCodelog(){
        this.props.deleteCode(this.props.id, this.props.token)
        console.log('im here')
    }
    render(){
        return(
            <div>
                <button style={{border: '1px solid grey'}} onClick={()=>this.handleOpen()}>Delete Code</button>
                <dialog
                 open={this.state.modalOpen}>
                     <div style={{padding: '10px'}}>
                         <h2>Confirm</h2>
                         <button type='submit'style={{border: '2px solid red'}} onClick={() =>this.deleteCodelog()}>YES</button>
                         <button type='submit'style={{border: '2px solid red'}} onClick={() =>this.handleClose()}>NO</button>
                     </div>
                 </dialog>
            </div>
        )
    }
}
export default DeleteCode
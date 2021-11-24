import React from 'react'
type modalType ={
    modalOpen: boolean
}

type modalProps ={
    id: number,
    deleteCode(id: number): void
}
class DeleteCode extends React.Component<modalProps, modalType>{
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
    render(){
        return(
            <div>
                <button style={{border: '1px solid grey'}} onClick={() => this.handleOpen()}>Delete Code</button>
                <dialog
                 open={this.state.modalOpen}>
                     <div style={{padding: '10px'}}>
                         <h2>Confirm</h2>
                         <button style={{border: '2px solid red'}} onClick={() =>this.props.deleteCode(this.props.id)}>YES</button>
                         <button style={{border: '2px solid red'}} onClick={() =>this.handleOpen}>NO</button>
                     </div>
                 </dialog>
            </div>
        )
    }
}
export default DeleteCode
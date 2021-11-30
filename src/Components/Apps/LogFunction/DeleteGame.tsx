import React from 'react'
type modalType ={
    modalOpen: boolean
}
type modalProps ={
    id: number,
    deleteGame: (id: number, token: string)=>void,
    token: string
}
class DeleteGame extends React.Component<modalProps, modalType>{
    constructor(props: modalProps) {
        super(props)
        this.state={
            modalOpen: false,
        }
    }
    handleOpen(){
        this.setState({modalOpen: true})
    }
    handleClose(){
        this.setState({modalOpen: false})
    }
    deleteGamelog(){
        this.props.deleteGame(this.props.id,this.props.token)
    }
    render(){
        return(
            <div>
                <button style={{border: '1px solid grey'}}onClick={()=>this.handleOpen()}>Delete Game</button>
                <dialog
                open={this.state.modalOpen}>
                    <div style={{padding: '10px'}}>
                        <h2>Confirm</h2>
                        <button type='submit'style={{border: '2px solid red'}} onClick={() =>this.deleteGamelog()}>YES</button>
                        <button type='submit'style={{border: '2px solid red'}} onClick={() =>this.handleClose()}>NO</button>
                    </div>
                </dialog>
            </div>
        )
    }
}
export default DeleteGame
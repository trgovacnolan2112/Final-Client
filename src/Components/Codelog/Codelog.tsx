import React from "react";
import APIURL from "../../Connect/API-URL";
import DisplayCodeForum from '../Codelog/DisplayCodes/DisplayCodeForum'
import DisplayCodes from './DisplayCodes/DisplayCodes'

type codelogForm ={
    cheat: string,
    code: string,
    enables: string,
    effects: string,
    id: number,
}
type codelogTypes ={
    codelog: Array<codelogForm>
    modalOpen: boolean
}
type propTypes ={
  token: string | null,
  user: string | null
}
class Codes extends React.Component<propTypes,codelogTypes>{
    constructor(props: propTypes){
        super(props)
        this.state={
            codelog: [],
            modalOpen: false
        }
    }
    getAllCodelogs() {
        fetch(`${APIURL}/codelog/mine`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${this.props.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                codelog: data
            });
            console.log(data)
        })
    }
    getForumCodelogs(){
        fetch(`${APIURL}/codelog/forum`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${this.props.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                codelog: data
            });
            console.log(data)
        })
    }
    deleteCodelog(id: number) {
        fetch(`${APIURL}/codelog/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `${this.props.token}`
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.getAllCodelogs()
        this.getForumCodelogs()
        console.log(this.props.user)
    }
    render(){
        return(
            <div className='container'>
                <DisplayCodes
                  codelog={this.state.codelog}
                  deleteCode={this.deleteCodelog}
                  userRole={this.props.token}
                  token={this.props.token}
                  /> 
                <DisplayCodeForum
                 codelog={this.state.codelog}
                 deleteCodelog={this.deleteCodelog}
                 userRole={this.props.token}
                 token={this.props.token}
                 />
            </div>
        )
    }
}

export default Codes
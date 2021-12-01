import React from "react";
import APIURL from "../../Connect/environment";
import CreateCodeLog from "../Apps/LogFunction/CreateCodeLog";
import DisplayCodeForum from '../Codelog/DisplayCodes/DisplayCodeForum'
import DisplayCodes from './DisplayCodes/DisplayCodes'
type codelogTypes ={
    codelog: {cheat:string, code:string, enables:string, effects: string, id: number}
    modalOpen: boolean
}
type propTypes ={
  token: string,
  user: string | null
}
class Codes extends React.Component<propTypes,codelogTypes>{
    constructor(props: propTypes){
        super(props)
        this.state={
            codelog: {
                cheat: '',
                code: '',
                enables: '',
                effects: '',
                id: 0
            },
            modalOpen: false,
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
    createCode(cheat: string, code: string, enables: string, effects: string, token: string){
        fetch(`${APIURL}/codelog/create`,{
            method: 'POST',
            body:JSON.stringify({
                codelog:{
                cheat: cheat,
                code: code,
                enables: enables,
                effects: effects,
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data=> console.log(data))
        .catch(err => console.log(err))
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
    deleteCodelog(id: number, token: string) {
        console.log(id, APIURL)
        fetch(`${APIURL}/codelog/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data=> console.log(data))
        .catch(err => console.log(err))
    }
    updateCode(id: number, cheat: string, code: string, enables: string, effects: string, token: string){
        console.log(id, APIURL)
        fetch(`${APIURL}/codelog/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                codelog: {
                cheat: cheat,
                code: code,
                enables: enables,
                effects: effects
                }
            }),
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            })
        })
            .then(response => response.json())
            .then(data=> console.log(data))
            .catch(err => console.log(err))
    }
    componentDidMount(){
        this.getAllCodelogs()
        this.getForumCodelogs()
        console.log(this.props.user)
    }
    render(){
        console.log(this.state)
        return(
            <div className='container'>
                <CreateCodeLog
                token={this.props.token}
                createCode={this.createCode}
                />
                <DisplayCodes
                  updateCode={this.updateCode}
                  deleteCode={this.deleteCodelog}
                  userRole={this.props.user}
                  token={this.props.token}
                  /> 
                {/* <DisplayCodeForum
                 deleteCode={this.deleteCodelog}
                 userRole={this.props.user}
                 token={this.props.token}
                 /> */}
            </div>
        )
    }
}
export default Codes
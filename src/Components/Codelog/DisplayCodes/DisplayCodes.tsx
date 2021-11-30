import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core/';
import {Typography} from '@material-ui/core/'
import UpdateCodeLog from '../../Apps/LogFunction/UpdateCodeLog';
import APIURL from '../../../Connect/API-URL';
import DeleteCode from '../../Apps/LogFunction/DeleteCode'
import CreateCode from'../../Apps/LogFunction/CreateCodeLog'
type States ={
    codelog: [],
    cheat: string,
    code: string,
    enables: string,
    effects: string,
    id: number,
}
type codelogForm ={
    codelog: [],
    cheat: string,
    code: string,
    enables: string,
    effects: string,
    id: number,
} 
type codelogProps ={
    userRole: string | null,
    token: string,
    updateCode: (id:number, cheat: string, code: string, enables: string, effects: string, token: string )=>void,
    deleteCode: (id:number, token: string)=> void,
}
class DisplayCode extends Component<codelogProps, States>{
    constructor(props: codelogProps){
        super(props);
        this.state ={
            codelog: [],
                 cheat: '',
                 code: '',
                 enables: '',
                 effects: '',
                 id: 0
             }
    }
    componentDidMount() {
        this.getAllCodelogs();
    }
    getAllCodelogs(){
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
                codelog: data,
                cheat: data.cheat,
                code: data.code,
                effects: data.effects,
                enables: data.enables,
            });
            console.log(data)
        })
    } 
    codeLogMap(){
        return this.state.codelog.map((codelog: codelogForm, index: number) =>(
            <div className='container' key={index}>
                       <Card className='main'>
                           <CardContent>
                               <Typography className='title' color="textPrimary" gutterBottom>
                                   Code Name:
                               </Typography>
                               <Typography variant='h5' component='h2'>
                                   {codelog.cheat}
                               </Typography>
                               <Typography className='second' color="textSecondary">
                                   {codelog.code}
                               </Typography>
                               <Typography className='second' color="textSecondary">
                                   {codelog.enables}
                               </Typography>
                               <Typography className='second' color="textSecondary">
                                   {codelog.effects}
                               </Typography>
                               <div className='modalDiv'>
                                   <UpdateCodeLog
                                    updateCode={this.props.updateCode}
                                    id={codelog.id}
                                    token={this.props.token}
                                    codelog={codelog}
                                   />
                                   <DeleteCode
                                    id={codelog.id}
                                    deleteCode={this.props.deleteCode}
                                    token={this.props.token}
                                    />
                               </div>
                           </CardContent>
                       </Card>
                       </div>
            ))
    }                          
render() {
    return(
        <div>
            {this.codeLogMap()}
        </div>
    )
 }
}



export default DisplayCode
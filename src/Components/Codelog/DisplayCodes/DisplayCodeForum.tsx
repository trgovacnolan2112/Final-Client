import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core/';
import {Typography} from '@material-ui/core/'
import UpdateCodeLog from '../../Apps/LogFunction/UpdateCodeLog';
import DeleteCode from '../../Apps/LogFunction/DeleteCode';
import APIURL from '../../../Connect/API-URL';
type codelogForm ={
    cheat: string,
    code: string,
    enables: string,
    effects: string,
    id: number,
}
type codelogAdminProps ={
    userRole: string | null,
    token: string,
    deleteCode: (id: number)=> void,
    updateCode: (id: number, token: string)=> void,
    codelog: codelogForm[]
}
type stateType={
    codelogforum: []
}
class DisplayForumCode extends Component<codelogAdminProps, stateType>{
    constructor(props: any){
        super(props);
        this.state ={
            codelogforum: [],
        }
    }
    componentDidMount() {
        this.getForumCodelogs();
    }
    getForumCodelogs(){
        fetch(`${APIURL}/codelog/forum`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${this.props.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                codelogforum: data
            });
            console.log(data)
        })
    }
 codeForum(){
    return this.state.codelogforum.map((codelog: codelogForm, index: number)=>(
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
                                     codelog={codelog}
                                     id={codelog.id}
                                     token={this.props.token}
                                     updateCode={this.props.updateCode}
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
    return (
        <div>
            {this.codeForum()}
        </div>
    )
}
}

export default DisplayForumCode
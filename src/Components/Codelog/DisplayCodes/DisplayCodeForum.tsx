import React from 'react';
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
    token: string | null,
    deleteCodelog: (id: number)=> void,
    codelog: codelogForm[]
}
class DisplayForumCode extends React.Component<codelogAdminProps, {}>{
    constructor(props: any){
        super(props);
        this.state ={
            codelog: [],
        }
    }
    componentDidMount() {
        this.getAllCodelogs();
    }
    getAllCodelogs(){
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
                codelog: data
            });
            console.log(data)
        })
    }


CodeForum(){
    return this.props.codelog.map((codelog: codelogForm, index: number) =>{
                return(
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
                                     token={this.props.token}
                                     id={codelog.id}/>
                                     <DeleteCode
                                     id={codelog.id}
                                     deleteCode={this.props.deleteCodelog}
                                     />
                                </div>
                            </CardContent>
                        </Card>
                        </div>
                )
            })
    }
render() {
    return (
        <div>
            {this.CodeForum()}
        </div>
    )
}
}

export default DisplayForumCode
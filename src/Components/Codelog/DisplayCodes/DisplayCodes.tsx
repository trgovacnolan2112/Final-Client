import React from 'react';
import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core/';
import {Typography} from '@material-ui/core/'
import UpdateCodeLog from '../../Apps/LogFunction/UpdateCodeLog';
import APIURL from '../../../Connect/API-URL';
import DeleteCode from '../../Apps/LogFunction/DeleteCode'
type codelogForm ={
    cheat: string,
    code: string,
    enables: string,
    effects: string,
    id: number,
} 
type codelogProps ={
    userRole: string | null,
    token: string | null ,
    deleteCode: (id:number)=> void,
    codelog: codelogForm[],
}
class DisplayCode extends React.Component<codelogProps, {}>{
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
        let token = localStorage.getItem('token')
        fetch(`${APIURL}/codelog/mine`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
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
render() {
    return this.props.codelog.map((codelog: codelogForm, index: number) =>(
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
                                     id={codelog.id}
                                    />
                                    <DeleteCode
                                     id={codelog.id}
                                     deleteCode={this.props.deleteCode}
                                     />
                                </div>
                            </CardContent>
                        </Card>
                        </div>
             ))}
}



export default DisplayCode
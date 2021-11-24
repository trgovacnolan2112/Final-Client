import React from 'react'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import UpdateGameLog from '../UpdateGamelog'
import UpdateCodeLog from '../UpdateCodeLog'

const useStyles= makeStyles({
    divContain: {
        display: 'flex',
        justifyContent: 'center'
    },
    root: {
        minWidth: 475,
        maxWidth: 476,
        border: '3px solid Grey',
        marginTop: '10px',
        marginBottom: '20px'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
})

type gamelogForm ={
    title: string,
    hoursplayed: string,
    difficulty: string,
    rating: number,
    comments: string,
    id: number
}
type codelogForm ={
    cheat: string,
    code: string,
    enables: string,
    effects: string,
    id: number,
}
type PropsForm ={
    user: {userName: string},
    userGamelog: Array<gamelogForm>,
    userCodelog: Array<codelogForm>,
    viewConductor: number,
    deleteGamelog(id: number, token: string | null): void,
    deleteCodelog(id: number, token: string | null): void,
    token: string | null
}
const GamerLogDisplay = (props: PropsForm) => {
    let sortedGamelog = props.userGamelog.sort((n1, n2) => {
        if(n1.id< n2.id){
            return 1
        }
        if(n1.id > n2.id){
            return -1;
        }
        return 0;
    })
    let sortedCodelog = props.userCodelog.sort((n1, n2) => {
        if(n1.id< n2.id){
            return 1
        }
        if(n1.id > n2.id){
            return -1;
        }
        return 0
    })

    return(
        <div className='container'>
            <div className='Gamemap'>
                {sortedGamelog.length > 0 && sortedGamelog.map((gamelog: gamelogForm, index: number) =>{
                    if(props.viewConductor === 0){
                        return(
                            <div className='containerGamelog' key={index}>
                                <Card className='main'>
                                    <CardContent>
                                        <Typography className='Title' color='textPrimary' gutterBottom>
                                          Title:
                                        </Typography>
                                        <Typography variant='h3' component='h2'>
                                            {gamelog.title}
                                        </Typography>
                                        <Typography className='secondary' color='textSecondary'>
                                             {gamelog.hoursplayed}
                                        </Typography>
                                        <Typography className='secondary' color='textSecondary'>
                                             {gamelog.difficulty}
                                        </Typography>
                                        <Typography className='secondary' color='textSecondary'>
                                             {gamelog.rating}
                                        </Typography>
                                        <Typography className='secondary' color='textSecondary'>
                                             {gamelog.comments}
                                        </Typography>
                                        <UpdateGameLog token={props.token} id={gamelog.id}/>
                                        <Button style={{border: '2px solid grey'}} type='submit' onClick={() => props.deleteGamelog(gamelog.id, props.token)}>DELETE</Button>
                                    </CardContent>
                                </Card>
                                </div>
                        )}
                })}
            </div>
            <div className='codeMap'>
                {sortedCodelog.length > 0 && sortedCodelog.map((code: codelogForm, index: number) =>{
                    if(props.viewConductor === 0){
                        return(
                            <div className='containerCodelog' key={index}>
                                <Card className='main'>
                                    <CardContent>
                                        <Typography className='Title' color='textPrimary' gutterBottom>
                                          Title:
                                        </Typography>
                                        <Typography variant='h3' component='h2'>
                                            {code.cheat}
                                        </Typography>
                                        <Typography className='secondary' color='textSecondary'>
                                             {code.code}
                                        </Typography>
                                        <Typography className='secondary' color='textSecondary'>
                                             {code.enables}
                                        </Typography>
                                        <Typography className='secondary' color='textSecondary'>
                                             {code.effects}
                                        </Typography>
                                        <UpdateCodeLog token={props.token} id={code.id}/>
                                        <Button style={{border: '2px solid grey'}} type='submit' onClick={() => props.deleteCodelog(code.id, props.token)}>DELETE</Button>
                                    </CardContent>
                                </Card>
                                </div>
                        )}
                })}
            </div>
        </div>
    )
    
}
export default GamerLogDisplay
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import UpdateGameLog from '../UpdateGamelog'
import UpdateCodeLog from '../UpdateCodeLog'
import CreateCodeLog from '../CreateCodeLog'
import CreateGameLog from '../CreateGameLog'
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
    rating:string,
    comments: string,
    id: number,
    token: string
}
type codelogForm ={
    cheat: string,
    code: string,
    enables: string,
    effects: string,
    id: number,
    token: string
}
type PropsForm ={
    user: string,
    userGamelog: Array<gamelogForm>,
    userCodelog: Array<codelogForm>,
    viewConductor: number,
    deleteGamelog(id: number, token: string): void,
    deleteCodelog(id: number, token: string): void,
    getAllCodelogs(id: number, token: string): void,
    updateGame:(id: number, title: string, hoursplayed: string, difficulty: string, rating: string, comments: string, token: string) => void,
    createGame:(title: string, hoursplayed: string, difficulty: string, rating: string, comments: string, token: string) => void,
    updateCode:(id: number, cheat: string, code: string, enables: string, effects: string, token: string)=>void,
    createCode:(cheat: string, code: string, enables: string, effects: string, token: string)=>void,
    token: string,
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
                                        <UpdateGameLog 
                                        updateGame={props.updateGame}
                                        gamelog={gamelog}
                                        id={gamelog.id}
                                        token={props.token}/>
                                        <CreateGameLog
                                        createGame={props.createGame}
                                        token={props.token}/>
                                        <Button style={{border: '2px solid grey'}} type='submit' onClick={() => props.deleteGamelog(gamelog.id, props.token)}>DELETE</Button>
                                    </CardContent>
                                </Card>
                                </div>
                        )}
                })}
            </div>
            <div className='codeMap'>
                {sortedCodelog.length > 0 && sortedCodelog.map((codelog: codelogForm, index: number) =>{
                    if(props.viewConductor === 0){
                        return(
                            <div className='containerCodelog' key={index}>
                                <Card className='main'>
                                    <CardContent>
                                        <Typography className='Title' color='textPrimary' gutterBottom>
                                          Title:
                                        </Typography>
                                        <Typography variant='h3' component='h2'>
                                            {codelog.cheat}
                                        </Typography>
                                        <Typography className='secondary' color='textSecondary'>
                                             {codelog.code}
                                        </Typography>
                                        <Typography className='secondary' color='textSecondary'>
                                             {codelog.enables}
                                        </Typography>
                                        <Typography className='secondary' color='textSecondary'>
                                             {codelog.effects}
                                        </Typography>
                                        <UpdateCodeLog
                                        codelog={codelog}
                                        id={codelog.id}
                                        token={props.token}
                                        updateCode={props.updateCode}
                                        />
                                       <CreateCodeLog
                                       token={props.token}
                                       createCode={props.createCode}
                                       />
                                        <Button style={{border: '2px solid grey'}} type='submit' onClick={() => props.deleteCodelog(codelog.id, props.token)}>DELETE</Button>
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
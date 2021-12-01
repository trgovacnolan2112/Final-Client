let APIURL= ''
switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3001';
    break;
 case'nctfinal2345.herokuapp.com':
 APIURL='https://nctfinal2345.herokuapp.com'
break;
}

export default APIURL
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import 'fontsource-roboto';
import { useHistory } from "react-router-dom";
import UserProfile from './UserProfile';

const { Component } = require("react");



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const redirectUri = "http://surveyapp-env.eba-r92ervxm.us-east-1.elasticbeanstalk.com/";
const APP_SECRET_BASE64 = "TERRcXJndjJtbUZNUVE6VGdtTmRON1FDb1Y2MURnRFV3ZmdvanF3eVAyY1lR";

class Login extends Component {
    constructor(props) {
        super(props);
        this.startSurvey = this.startSurvey.bind(this);
        this.redditAuthentication = this.redditAuthentication.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        //temp for demo
        // console.log('In(constructor), user code and state');
        // if (this.props.match.hasOwnProperty('code')) {
        //     console.log('In(constructor), if');
        //     var code = this.props.match.code;
        //     // var state = this.props.match.state;
        //     console.log(code);
        //     UserProfile.setCode(code);
        //     this.startSurvey();
        // }
        
        // UserProfile.setState(state);
        // var token = this.fetchToken(code);
        // UserProfile.setToken(token);

        // proceed without token
        

    }
    
    startSurvey() {
        console.log('In(startSurvey())');
        let path = "/questionnaire";
        this.props.history.push(path);
    }

    componentDidMount() {
        console.log("IN ComponentDidMount: this.props change 7")
        console.log(this.props)
        const urlParams = new URLSearchParams(redirectUri + this.props.location.search);
        console.log("IN ComponentDidMount: URLParams");
        console.log(urlParams);
        console.log(urlParams.get('code'));
        // console.log(this.props)
        // var queryCode = this.props.history.query.code;
        // error happened
        if (this.props.match.hasOwnProperty('error')) {
            alert(this.props.match.error)
        }
        // being redirected from auth page,fetch Token
        if (urlParams.get('code') != undefined) {
            console.log('In(hasOwnProperty(code)), user code created');
            var code = urlParams.get('code');
            var state = urlParams.get('state');
            UserProfile.setCode(code);
            UserProfile.setState(state);
            var token = this.fetchToken(code);
            UserProfile.setToken(token);
            var userName = this.fetchUserName(token);
            UserProfile.setName(userName);
            console.log('token', token);
            // proceed without token
            this.startSurvey();
        }
        // // proceed if has token
        // if (UserProfile.isLoggedIn()) {
        //     this.startSurvey();
        // }
    }

    // post to get token after getting the code from reddit
    fetchToken(userCode) {
        // var requestOption = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //         'Authorization': 'Basic ' + APP_SECRET_BASE64
        //     },
        //     body: {
        //         grant_type: 'authorization_code',
        //         code: userCode,
        //         redirect_uri: redirectUri
        //     }
        // };
        // fetch('https://www.reddit.com/api/v1/access_token', requestOption)
        // .then(
        //     function(response) {
        //         console.log("response token", response)
        //         return response.access_token;
        //     }
        // );

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic TERRcXJndjJtbUZNUVE6VGdtTmRON1FDb1Y2MURnRFV3ZmdvanF3eVAyY1lR");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        // myHeaders.append("Cookie", "loid=000000000095eq616g.2.1607007962711.Z0FBQUFBQmZ5UDdhUEJMUmtKdURWNkIxYUtvUmJ6WkZ6QWNQeWVET1NrN0FNQU9oR1d1czhFNjFhVzdQZTd3NGRwbzJDU3REdnE2TWpKTjBUZkd4UlYwZXdPMHd1ejE5RmUtc3BUaU1SaHViUlZrVlVYN3pVSGVONmh1enFxRTZ0Um9yOVNKT2R6bnI; csv=1; edgebucket=eBgGiE6J7DpkHtaKp0");

        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("code", userCode);
        urlencoded.append("redirect_uri", "http://surveyapp-env.eba-r92ervxm.us-east-1.elasticbeanstalk.com/");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://www.reddit.com/api/v1/access_token", requestOptions)
        .then(
            function(response) {
            console.log("token response", response);
            console.log("token response text", response.text())
            return response.text()["access_token"];
        });
    }

    fetchUserName(token) {
        var requestOption = {
            params: {
                token: token
            },
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + APP_SECRET_BASE64
            },
            body: {
                grant_type: 'authorization_code',
                // code: userCode,
                redirect_uri: redirectUri
            }
        };
        fetch('https://www.reddit.com/api/v1/me',requestOption)
        .then(
            function(response) {
                return response;
            }
        )
    }

    // Direct to reddit login and authentication
    redditAuthentication() {
        const authUrl = 'https://www.reddit.com/api/v1/authorize?client_id=LDQqrgv2mmFMQQ&response_type=code&state=some_state&redirect_uri=' 
            + redirectUri 
            + '&duration=temporary&scope=identity';
        window.location.assign(authUrl);
    }

    
    render() {
        return (
            <div>
                <Typography variant="h1" component="h2" gutterBottom>
                    Welcome to the survey
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Please use your reddit account to get started
                </Typography>
                
                {/* for test checking
                <form className={useStyles.root} id="usernameForm" noValidate autoComplete="off">
                    <TextField id="outlined-basic" name="username" label="Reddit Username" variant="outlined" />
                    <br />
                    <br />
                        <Button type="submit" variant="contained" color="primary" onClick={this.startSurvey}>
                            Start
                        </Button>
                    
                </form> */}
                <br />
                <Button variant="contained" color="primary" onClick={this.redditAuthentication}>
                            get started with reddit
                </Button>
                

            </div>
        );
    }
}

export default Login;
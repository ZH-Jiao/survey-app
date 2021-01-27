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

export const REDIRECT_URI = "http://surveyapp-env.eba-r92ervxm.us-east-1.elasticbeanstalk.com/questionnaire";
export const APP_SECRET_BASE64 = "TERRcXJndjJtbUZNUVE6VGdtTmRON1FDb1Y2MURnRFV3ZmdvanF3eVAyY1lR";

class Login extends Component {
    constructor(props) {
        super(props);
        this.startSurvey = this.startSurvey.bind(this);
        this.redditAuthentication = this.redditAuthentication.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);

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



    // Direct to reddit login and authentication
    redditAuthentication() {
        const authUrl = 'https://www.reddit.com/api/v1/authorize?client_id=LDQqrgv2mmFMQQ&response_type=code&state=some_state&redirect_uri=' 
            + REDIRECT_URI 
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
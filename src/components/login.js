import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import 'fontsource-roboto';
import { useHistory } from "react-router-dom";

const { Component } = require("react");


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



class Login extends Component {
    constructor(props) {
        super(props);
        this.startSurvey = this.startSurvey.bind(this);
    }
    
    startSurvey() {
        let path = "/questionnaire";
        this.props.history.push(path);
    }

    
    render() {
        return (
            <div>
                <Typography variant="h1" component="h2" gutterBottom>
                    Welcome to the survey
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Please type in your Reddit username to get started
                </Typography>
                {/* for test checking */}
                <form className={useStyles.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Reddit Username" variant="outlined" />
                    <br />
                    <br />
                        <Button variant="contained" color="primary" onClick={this.startSurvey}>
                            Start
                        </Button>
                    
                </form>

            </div>
        );
    }
}

export default Login;
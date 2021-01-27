import * as Survey from "survey-react";
import { Redirect } from 'react-router';
import "survey-react/survey.css";
import {withRouter} from 'react-router-dom';
import UserProfile from './UserProfile';
import {REDIRECT_URI, APP_SECRET_BASE64} from './login';

const fs = require("fs");
const { Component } = require("react");
const react = require("react");

//Survey.StylesManager.applyTheme("modern");

class Questionnaire extends Component {
    constructor(props) {
        super(props);

        var surveyJson = buildSurveyJson(rawCSV);
        this.state = {"surveyJson": surveyJson};
        this.sendData = this.sendData.bind(this);
        window.questionComponent = this;
        console.log(this.state);
        console.log('UserProfile in Questionnaire');
        console.log(UserProfile.getName(), UserProfile.getToken(),UserProfile.getCode());
        
    }

    componentDidMount() {
        // console.log("IN ComponentDidMount: this.props change 11")
        // console.log(this.props)
        // const urlParams = new URLSearchParams(REDIRECT_URI + this.props.location.search);
        // console.log("IN ComponentDidMount: URLParams");
        // console.log(urlParams);
        // console.log(urlParams.get('code'));
        // // console.log(this.props)
        // // var queryCode = this.props.history.query.code;
        // // error happened
        // if (this.props.match.hasOwnProperty('error')) {
        //     alert(this.props.match.error)
        // }
        // being redirected from auth page,fetch Token
        if (UserProfile.getCode() != undefined) {
            console.log('In(Questionnaire with user code), user code created');
            // var funcs = [this.fetchToken, this.fetchUserName];
            // this.series(funcs);
            this.fetchToken();
            this.fetchUserName();
            // this.startSurvey();
            // let promise = new Promise(function(resolve, reject) {
            //     this.fetchToken(code);
            //     this.fetchUserName(UserProfile.getToken());
            //     console.log("finish fetching");
            //     if (true) {
            //         resolve('success');
            //     } else {
            //         reject(' ');
            //     }
            // });
            // promise.then(
            //     function(result) {
            //     console.log('Start survey', result);
            //     this.startSurvey();
            //     },
            //     function(error) {
            //         console.log('Rejected in promise', error);
            //     }
            // );
            

            // var promise = new Promise((resolve) => {
            //     this.fetchToken(code);
            //     resolve(UserProfile.getToken());
            // });
            // promise.then((token) => {
            //     console.log('Promise token', token);
            //     this.fetchUserName(token);
            //     return new Promise((resolve) => {
            //         resolve('fetch finish');
            //     });
            //     // resolve('fetch finish');
            // })
            // .then((message) => {
            //     console.log(message);
            //     this.startSurvey();
            // });
            
            
            // var userName = this.fetchUserName(token);
            // UserProfile.setName(userName);
            // console.log('token', token);
            // proceed without token
            
        }
        // // proceed if has token
        // if (UserProfile.isLoggedIn()) {
        //     this.startSurvey();
        // }
    }

    series(funcs) {
        if (funcs) {
            // excecute func
            funcs[0]();
            funcs.shift();
            return this.series(funcs);
        } else {
            this.startSurvey();
        }
    }

    // post to get token after getting the code from reddit
    fetchToken() {
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
        var userCode = UserProfile.getCode();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + APP_SECRET_BASE64);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        // myHeaders.append("Cookie", "loid=000000000095eq616g.2.1607007962711.Z0FBQUFBQmZ5UDdhUEJMUmtKdURWNkIxYUtvUmJ6WkZ6QWNQeWVET1NrN0FNQU9oR1d1czhFNjFhVzdQZTd3NGRwbzJDU3REdnE2TWpKTjBUZkd4UlYwZXdPMHd1ejE5RmUtc3BUaU1SaHViUlZrVlVYN3pVSGVONmh1enFxRTZ0Um9yOVNKT2R6bnI; csv=1; edgebucket=eBgGiE6J7DpkHtaKp0");

        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("code", userCode);
        urlencoded.append("redirect_uri", REDIRECT_URI);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://www.reddit.com/api/v1/access_token", requestOptions)
        .then((response) => {
            var responseJson = response.json();
            console.log("token response", responseJson);
            console.log("token response json", responseJson['access_token']);
            responseJson.then((result) => {
                console.log("token response then", result);
                var token = result['access_token'];
                
                console.log("token response text", token);
                UserProfile.setToken(token);

            });
            
        });
    }

    /*
    * Fetch the username by the given token, and update it in UserProfile
    */
    fetchUserName() {
        var token = UserProfile.getToken();
        var requestOption = {
            params: {
                token: token
            },
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + token
            },
        };
        fetch('https://oauth.reddit.com/api/v1/me',requestOption)
        .then((response) => {
                var username = response.json()['name'];
                console.log('username', username)
                UserProfile.setName(username);
            }
        );
    }

    sendData(survey) {
        this.props.updateData(survey.data);
        //sendDataToServer(survey);
        var surveyResult = {
            
        }

        this.props.history.push('/result');
    }

    render() {
        console.log("UserProfile");
        console.log(UserProfile);
        var model = new Survey.Model(this.state.surveyJson)
        //model.onComplete.add(this.sendData(survey))
        model
        .onUpdateQuestionCssClasses
        .add(function (model, options) {
            var classes = options.cssClasses

            classes.mainRoot += " sv_qstn";
            classes.title += " sq-title"
        });
        return (
             <div> 
                 <Survey.Survey model={model} onComplete={this.sendData}/>
             </div>
             );
    }
}


function buildSurveyJson(file) {
    var lines = file.split("\n");
    var questions = [[]];
    var index = 0;
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        // NO COMMA ALLOWED IN CSV
        var curLine = lines[i].split(",");
        var obj = {   
            "type": "radiogroup",
            "name": "question" + curLine[1],
            "title": curLine[2],
            "trait": curLine[0],
            //"columnLayout": "vertical",
            //"columnMinWidth": "130px",

            "choices": [
                {
                    "value": curLine[3],
                    "text": headers[3],
                },
                {
                    "value": curLine[4],
                    "text": headers[4]
                },
                {
                    "value": curLine[5],
                    "text": headers[5]
                },
                {
                    "value": curLine[6],
                    "text": headers[6]
                },
                {
                    "value": curLine[7],
                    "text": headers[7]
                },
                {
                    "value": curLine[8],
                    "text": headers[8]
                },
                {
                    "value": curLine[9],
                    "text": headers[9]
                }
            ],
        };
        
        questions[index].push(obj);
        if (i % 10 == 0) {
            index += 1;
            questions.push([]);
        }
    }
    console.log(questions);

    var result = {
        "title": "Know your personality",
        "showProgressBar": "top",
        "pages": [
            {
                "name": "page1",
                "elements": questions[0]
            },
            {
                "name": "page2",
                "elements": questions[1]
            },
            {
                "name": "page3",
                "elements": questions[2]
            },
            {
                "name": "page4",
                "elements": questions[3]
            },
            {
                "name": "page5",
                "elements": questions[4]
            }
        ],
        completedHtml: "<p>What</p>"//"<meta http-equiv=\"refresh\" content=\"0; URL=/#/result\" />",
    }
    return result
}

var rawCSV = "Trait,Number,Item,Strongly Disagree,Disagree,Somewhat Disagree,Neither Agree Nor Disagree,Somewhat Agree,Agree,Strongly Agree\n\
Extraversion,1,Am the life of the party.,1,2,3,4,5,6,7\n\
Extraversion,2,Feel comfortable around people.,1,2,3,4,5,6,7\n\
Extraversion,3,Start conversations.,1,2,3,4,5,6,7\n\
Extraversion,4,Talk to a lot of different people at parties.,1,2,3,4,5,6,7\n\
Extraversion,5,Don't mind being the center of attention.,1,2,3,4,5,6,7\n\
Extraversion,6,Don't talk a lot.,7,6,5,4,3,2,1\n\
Extraversion,7,Keep in the background.,7,6,5,4,3,2,1\n\
Extraversion,8,Have little to say.,7,6,5,4,3,2,1\n\
Extraversion,9,Don't like to draw attention to myself.,7,6,5,4,3,2,1\n\
Extraversion,10,Am quiet around strangers.,7,6,5,4,3,2,1\n\
Agreeableness,11,Am interested in people.,1,2,3,4,5,6,7\n\
Agreeableness,12,Sympathize with others' feelings.,1,2,3,4,5,6,7\n\
Agreeableness,13,Have a soft heart.,1,2,3,4,5,6,7\n\
Agreeableness,14,Take time out for others.,1,2,3,4,5,6,7\n\
Agreeableness,15,Feel others' emotions.,1,2,3,4,5,6,7\n\
Agreeableness,16,Make people feel at ease.,1,2,3,4,5,6,7\n\
Agreeableness,17,Am not really interested in others.,7,6,5,4,3,2,1\n\
Agreeableness,18,Insult people.,7,6,5,4,3,2,1\n\
Agreeableness,19,Am not interested in other people's problems.,7,6,5,4,3,2,1\n\
Agreeableness,20,Feel little concern for others.,7,6,5,4,3,2,1\n\
Conscientiousness,21,Am always prepared.,1,2,3,4,5,6,7\n\
Conscientiousness,22,Pay attention to details.,1,2,3,4,5,6,7\n\
Conscientiousness,23,Get chores done right away.,1,2,3,4,5,6,7\n\
Conscientiousness,24,Like order.,1,2,3,4,5,6,7\n\
Conscientiousness,25,Follow a schedule.,1,2,3,4,5,6,7\n\
Conscientiousness,26,Am exacting in my work.,1,2,3,4,5,6,7\n\
Conscientiousness,27,Leave my belongings around.,7,6,5,4,3,2,1\n\
Conscientiousness,28,Make a mess of things.,7,6,5,4,3,2,1\n\
Conscientiousness,29,Often forget to put things back in their proper place.,7,6,5,4,3,2,1\n\
Conscientiousness,30,Shirk my duties.,7,6,5,4,3,2,1\n\
Emotional Stability,31,Am relaxed most of the time.,1,2,3,4,5,6,7\n\
Emotional Stability,32,Seldom feel blue.,1,2,3,4,5,6,7\n\
Emotional Stability,33,Get stressed out easily.,7,6,5,4,3,2,1\n\
Emotional Stability,34,Worry about things.,7,6,5,4,3,2,1\n\
Emotional Stability,35,Am easily disturbed.,7,6,5,4,3,2,1\n\
Emotional Stability,36,Get upset easily.,7,6,5,4,3,2,1\n\
Emotional Stability,37,Change my mood a lot.,7,6,5,4,3,2,1\n\
Emotional Stability,38,Have frequent mood swings.,7,6,5,4,3,2,1\n\
Emotional Stability,39,Get irritated easily.,7,6,5,4,3,2,1\n\
Emotional Stability,40,Often feel blue.,7,6,5,4,3,2,1\n\
Intellect,41,Have a rich vocabulary.,1,2,3,4,5,6,7\n\
Intellect,42,Have a vivid imagination.,1,2,3,4,5,6,7\n\
Intellect,43,Have excellent ideas.,1,2,3,4,5,6,7\n\
Intellect,44,Am quick to understand things.,1,2,3,4,5,6,7\n\
Intellect,45,Use difficult words.,1,2,3,4,5,6,7\n\
Intellect,46,Spend time reflecting on things.,1,2,3,4,5,6,7\n\
Intellect,47,Am full of ideas.,1,2,3,4,5,6,7\n\
Intellect,48,Have difficulty understanding abstract ideas.,7,6,5,4,3,2,1\n\
Intellect,49,Am not interested in abstract ideas.,7,6,5,4,3,2,1\n\
Intellect,50,Do not have a good imagination.,7,6,5,4,3,2,1"

export default withRouter(Questionnaire);
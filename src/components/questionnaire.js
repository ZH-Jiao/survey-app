import * as Survey from "survey-react";
import { Redirect } from 'react-router';
import "survey-react/survey.css";
import {withRouter} from 'react-router-dom';

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
    }

    sendData(survey) {
        this.props.updateData(survey.data);
        //sendDataToServer(survey);
        var surveyResult = {
            
        }

        this.props.history.push('/result');
    }

    render() {
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
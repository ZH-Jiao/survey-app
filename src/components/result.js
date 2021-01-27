import { Redirect } from 'react-router';
import AWSConnection from './DynamoDbConnection';
import UserProfile from './UserProfile';

const { Component } = require("react");
const react = require("react");
const TABLE_NAME = "reddit-user";


class Result extends Component {
    constructor(props) {
        super(props)
        this.retreiveData = this.retreiveData.bind(this);
        this.state = {
                        data: this.retreiveData()
                     }
        console.log("UserProfile in Result");
        console.log(UserProfile.getName());
        console.log(UserProfile.getToken());
    }

    retreiveData() {
        return this.props.getData(); 
    }

    uploadResult(resultList) {
        var item = {
            "user": UserProfile.getName(),
            "score1": resultList[0],
            "score2": resultList[1],
            "score3": resultList[2],
            "score4": resultList[3],
            "score5": resultList[4],
        };
        var dynamoDBClient = new AWSConnection();
        dynamoDBClient.addItem(TABLE_NAME, item);

    }

    render() {
        var t1 = 0;
        var t2 = 0;
        var t3 = 0;
        var t4 = 0;
        var t5 = 0;
        var txt1 = "";
        var txt2 = "";
        var txt3 = "";
        var txt4 = "";
        var txt5 = "";
        
        for (var i = 1; i <= 10; i++) {
            if (this.state.data["question" + i] != null) {
                t1 += parseInt(this.state.data["question"+ i]);
            }
        }

        for (var i = 11; i <= 20; i++) {
            if (this.state.data["question" + i] != null) {
                t2 += parseInt(this.state.data["question"+ i]);
            }
        }

        for (var i = 21; i <= 30; i++) {
            if (this.state.data["question" + i] != null) {
                t3 += parseInt(this.state.data["question"+ i]);
            }
        }

        for (var i = 31; i <= 40; i++) {
            if (this.state.data["question" + i] != null) {
                t4 += parseInt(this.state.data["question"+ i]);
            }
        }

        for (var i = 41; i <= 50; i++) {
            if (this.state.data["question" + i] != null) {
                t5 += parseInt(this.state.data["question"+ i]);
            }
        }

        // Send result scores to DB here
        var resultList = [];
        resultList.push(t1);
        resultList.push(t2);
        resultList.push(t3);
        resultList.push(t4);
        resultList.push(t5);
        this.uploadResult(resultList);

        if (t1 <= 20) {
            txt1 = "Looks like you're an introvert, rather reserved and generally not very resourceful in social relations. At introverts they lack the exuberance, energy and the high level of activation of extroverts. They also tend to be calm, sober, cautious and less interested in social interaction. Their lack of social involvement, however, should not be interpreted as shyness than the extrovert, the introvert simply prefer to spend a little 'more time alone with themselves and feel less need less external stimuli ..'"
        } else if (t1 >= 21 && t1 <= 30) {
            txt1 = "Looks like you're a bit introverted. Introverts lack the exuberance, energy and the high level of activation of extroverts. They also tend to be calm, sober, cautious and less interested in social interaction. Their lack of social involvement, however, should not be interpreted as shyness than the extrovert, the introvert simply prefer to spend a little 'more time alone with themselves and feel less need of external stimuli."
        } else if (t1 >= 31 && t1 <= 45) {
            txt1 = "Your score indicates that you are neither overly extroverted or introverted. When compared with most of the people, you stand in the middle ground as regards your everyday energy level and with regard the time you enjoy spending with others."
        } else if (t1 >= 46 && t1 <= 55) {
            txt1 = "You're a rather extroverted. Extroverts are characterized by positive emotions, a tendency to easily get in touch with unknown people and enjoy the company of others. This personality trait is characterized by strong involvement in the outside world and the ease to experience positive feelings. Extroverts love to be with people and are often perceived as people filled with energy. They tend to be enthusiastic and they are action-oriented and willing to embrace the new opportunities that arise. When they are in a group, tjeu like to talk and are usually more assertive than others."
        } else if (t1 >= 56) {
            txt1 = "of others. This personality trait is characterized by strong involvement in the outside world and the ease to experience positive feelings. Extroverts love to be with people and are often perceived as people filled with energy. They tend to be enthusiastic and they are action-oriented and willing to embrace the new opportunities that arise. When they are in a group, tjeu like to talk and are usually more assertive than others.";
        }

        if (t2 <= 20) {
            txt2 = "You score low on Agreebleness, which suggests that you are quite confrontational and suspicious of other people's intentions. People characterized by low Agreeableness tend to favor their own interest with respect to going to agree with each other. They show little interest in the welfare of others, and in general are unlikely to offer their help to others in a spontaneuos way. Their skepticism about the motivations of others  makes them suspicious, unfriendly and uncollaborative persons."
        } else if (t2 >= 21 && t2 <= 30) {
            txt2 = "Your score on Agreeableness was rather low, suggesting that sometimes you can be a confrontational person and suspicious of others' intentions. People scoring low on Agreeableness generally tend to favor their own interests as opposed to going along with others. They are little interested in the welfare of others, and they are unlikely to spontaneously offer their help to others. Sometimes their skepticism about the intentions of others makes them more suspicious, less friendly and cooperative than most people."
        } else if (t2 >= 31 && t2 <= 45) {
            txt2 = "Your score on Agreebless is average. From your answers emerges that you hold no strong opinion on others and on humanity in general. At times you are open and cooperative, while other times you feel sometimes suspicious of others' motivations . Even if you understand the importance of going along with others, you are quite outspoken in expression what you think and how you feel. Probably in your heart you hope that people are honest, but over time you've grown to learn thant that many are not."
        } else if (t2 >= 46 && t2 <= 55) {
            txt2 = "As regards the Agreeableness trait, your score is rather high: you're probably a  quite open and cooperative with others.  Individuals with high Agreeableness tend to pursue harmony within groups of people. They are friendly and give great importance to going along with others. They are generally friendly, helpful, generous, altruistic and willing to compromise when necessary. People with high Agreeableness have usually also a positive view of human nature, and generally believe others to be honest and trustworthy."
        } else if (t2 >= 56) {
            txt2 = "You scored high on Agreeableness. It is likely you're quite open and cooperative with others. Individuals with high Agreeableness tend to pursue harmony within groups of people. They are friendly and give great importance to going along with others. They are generally friendly, helpful, generous, altruistic and willing to compromise when necessary. People with high Agreeableness have usually also a positive view of human nature, and generally believe others to be honest and trustworthy.";
        }

        if (t3 <= 20) {
            txt3 = "You scored quite low on  Conscientiousness. This indicate that you are a person lacking in self-discipline, and showing little respect of his duties and responsibilities, and . Generally you behave in a spontaneous, unplanned way. People with low levels of conscientiousness often tend to act impulsively, which can often cause him some problems. They may also have difficulty at work, in the study and social relationships."
        } else if (t1 >= 21 && t3 <= 30) {
            txt3 = "As regards the Conscientiousness score, your score was not high. This suggest that you may have some difficulty in giving yourself a discipline, to respect your duties and responsibilities, and generally in giving yourself a goal. You probably prefer to act spontaneously rather than organize your activities and behaviors. People with low levels of Conscientiousness often tend to act impulsively. They may also have difficulty in mantaining work, study and social relationships."
        } else if (t3 >= 31 && t3 <= 45) {
            txt3 = "Your score on Conscientiousness is average. Often you are able to exercise good self-control, but sometimes you can also be an impulsive person. "
        } else if (t3 >= 46 && t3 <= 55) {
            txt3 = "Your score on Conscientiousnes is quite high. This indicates that you are a person with self-discipline that likes to have some  goals to pursue in life. Probably, you prefer to act in a planned and organized way, rather than letting things happen spontaneously.  Others generally perceive you as an intelligent and reliable person Typivally, you  pursue your goals with dedication, and plan ahead of your actions."
        } else if (t3 >= 56) {
            txt3 = "You scored high on Conscientiousness. This suggests that you have self-control, you are respectful of duties and responsibilities, and you are not afraid to work to achieve the goals you set up for yourself . You generally act in a planned and organized way, rather than letting things happen spontaneously. Usually you try to avoid problems and complications and pursue your goals in all areas with dedication and planning ahead of your actions. People highly conscientious usually are considered intelligent and reliable. On some occasions you can also be seen as a perfectionist and too interested in the work and duties.";
        }

        if (t4 <= 20) {
            txt4 = "'Your score on Emotional Stability is low, which suggests that generally you can feel negative emotions such as anger, anxiety and depression more intensely than the others. You tend to be a little more vulnerable to stress and experience more intense emotional reactions when compared with other people. Typically, people with low levels of Emotional Stability tend to interpret situations  as more difficult and threatening than they really are. Their negative emotions also tend to last longer than necessary. These occasional emotional regulation problems can reduce a person's ability to think clearly, make decisions and cope effectively with stress."
        } else if (t4 >= 21 && t4 <= 30) {
            txt4 = "Your score on Emotional Stability is lower than the average, which suggests that at times you can feel negative emotions such as anger, anxiety and depression more intensely than the others. It is also likely that you tend to be a little more vulnerable to stress. You may also experience more intense emotional reactions when compared with other people. Typically, people with low levels of Emotional Stability tend to interpret situations  as more difficult and threatening than they really are. Their negative emotions also tend to last longer than necessary. These occasional emotional regulation problems can reduce a person's ability to think clearly, make decisions and cope effectively with stress."
        } else if (t4 >= 31 && t4 <= 45) {
            txt4 = "Your score on Emotional Stability is average. You're probably emotionally stable most of the time, but sometimes you can have too intense emotional reactions, during difficult or stressful events."
        } else if (t4 >= 46 && t4 <= 55) {
            txt4 = "You scored quite high on Emotional Stability. This could indicate that tipically you are not a difficult and irritable  person. It is likely that in  you are able to maintain control and to not give way to emotions when facing stressful or negative situations. People who get a similar score on this personality trait are generally quite calm, emotionally stable, and easy to recover from a bad mood. For this reason,  they  are seen by friends as a balanced person."
        } else if (t4 >= 56) {
            txt4 = "You scored high on Emotional Stability. This could indicate that is unlikely that you are a difficult and irritable  person . It is likely that in  you are able to maintain control and to not give way to emotions when facing stressful or negative situations. People who get a high score on this personality trait tend to be calm, emotionally stable, and easy to recover from a bad mood. For this reason,  they  are seen by friends as a balanced person.";
        }

        if (t5 <= 20) {
            txt5 = "Your score on Intellect and Imagination was low. People scoring low on this trait tend to have conventional and traditional interests. It is likely that you prefer what is direct, clear and obvious to what is ambiguous, obscure or too complex. People with low scores on this trait tend to look to art and sciences with suspicion, considering them as not useful. They also tend to prefer what is familiar to new things, and to be more conservative and resistant to change."
        } else if (t5 >= 21 && t5 <= 30) {
            txt5 = "Your score on Intellect and Imagination is below average. People scoring low on this trait tend to have conventional and traditional interests. It is likely that you prefer what is direct, clear and obvious to what is ambiguous, obscure or too complex. People with low scores on openness tend to look to art and sciences with suspicion, considering them as not useful. They also tend to prefer what is familiar to new things, and to be more conservative and resistant to change."
        } else if (t5 >= 31 && t5 <= 45) {
            txt5 = "Your score on Intellect and Imagination is average. Generally, you don't shy away of new experiences and new things to learn, but sometimes you just prefer to stick to your habits and your traditional interests."
        } else if (t5 >= 46 && t5 <= 55) {
            txt5 = "You scored higher than average on Intellect and imagination. It is likely that you are a person who appreciates art, original ideas, imagination, curiosity, and new experiences. This trait distinguishes imaginative and creative people from more conventional\"down-to-earth\"  individual. People scoring hihg on this trait are intellectually curious, lovers of the arts and have a strong aesthetic sensibility. They tend to be creative and aware of their feelings and often can have unconventional ideas."
        } else if (t5 >= 56) {
            txt5 = "You scored high on Intellect and imagination. It is likely that you are a person who appreciates art, original ideas, imagination, curiosity, and new experiences. This trait distinguishes imaginative and creative people from more conventional\"down-to-earth\"  individual. People scoring hihg on this trait are intellectually curious, lovers of the arts and have a strong aesthetic sensibility. They tend to be creative and aware of their feelings and often can have unconventional ideas.";
        }

        return (
            <div>
                <h1>Thanks for completing the survey</h1>
                <h4>Your score for extraversion is: {t1}</h4>
                    <p>{txt1}</p>
                <h4>Your score for agreeableness is: {t2}</h4>
                    <p>{txt2}</p>
                <h4>Your score for conscientiousness is: {t3}</h4>
                    <p>{txt3}</p>
                <h4>Your score for emotional stability is: {t4}</h4>
                    <p>{txt4}</p>
                <h4>Your score for intellect is: {t5}</h4>
                    <p>{txt5}</p>
            </div>
            
        );
    }
}

export default Result;
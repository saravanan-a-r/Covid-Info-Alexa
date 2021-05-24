const Alexa = require('ask-sdk-core');
const CovidAPI = require("../covid-api");

const CoronaPrecautionsHandler = {
    
    canHandle(handlerInput) {
           return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CoronaPrecautions';
    },
    
    handle(handlerInput) {
        const speakOutput = `Hello, To prevent the spread of COVID-19: <break time= "0.2s"/>
            Clean your hands often. Use soap and water, or an alcohol-based hand rub.<break time= "0.2s"/>
            Maintain a safe distance from anyone who is coughing or sneezing.<break time= "0.2s"/>
            Wear a mask when physical distancing is not possible.<break time= "0.2s"/>
            Don’t touch your eyes, nose or mouth.<break time= "0.2s"/>
            Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.<break time= "0.2s"/>
            Stay home if you feel unwell.<break time= "0.2s"/>
            If you have a fever, cough and difficulty breathing, seek medical attention.
        `;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};

module.exports = CoronaPrecautionsHandler;
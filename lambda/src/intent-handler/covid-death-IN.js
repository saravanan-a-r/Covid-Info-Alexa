const Alexa = require('ask-sdk-core');
const CovidAPI = require("../covid-api");

const IndianStateCovidDeathCountHandler = {
    
     canHandle(handlerInput) {
           return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IndianStateCovidDeathCount';
    },
    async handle(handlerInput) {
        
        let indianState = "";
        
        let speakOutput = "";
            
        try {
            
            indianState = Alexa.getSlotValue(handlerInput.requestEnvelope, "indianState");
            
            let state = await CovidAPI.getStateStats(indianState);
            
            if(state) {
                speakOutput = state.deaths + " deaths have been reported till now!";
            }
            else {
                speakOutput = `Sorry, We couldn't find record in the state ${indianState}`;
            }
        }
        catch(e) {
            console.log(e);
            speakOutput = "Exception occur";
        }
    
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};

module.exports = IndianStateCovidDeathCountHandler;

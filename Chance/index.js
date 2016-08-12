/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
        http://aws.amazon.com/apache2.0/
    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This sample shows how to create a Lambda function for handling Alexa Skill requests that:
 *
 * - Session State: Handles a multi-turn dialog model.
 * - Custom slot type: demonstrates using custom slot types to handle a finite set of known values
 * - SSML: Using SSML tags to control how Alexa renders the text-to-speech.

/**
 * App ID for the skill
 */
var APP_ID = undefined;//replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * ChanceSkillSkill is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var ChanceSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
ChanceSkill.prototype = Object.create(AlexaSkill.prototype);
ChanceSkill.prototype.constructor = ChanceSkill;

/**
 * Overriden to show that a subclass can override this function to initialize session state.
 */
ChanceSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // Any session init logic would go here.
};

/**
 * If the user launches without specifying an intent, route to the correct function.
 */
ChanceSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("ChanceSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);

    var speechText = "Use this skill for games of chance and roll the dice! You can roll a four, six, eight, ten, twelve, twenty, or one hundred-sided die. For example, to roll a four-sided die you would ask Roll Four.";
    var repromptText = "Use this skill for games of chance and roll the dice! You can roll a four, six, eight, ten, twelve, twenty, or one hundred-sided die. For example, to roll a four-sided die you would ask Roll Four.";
    response.ask(speechText, repromptText);
};

/**
 * Overriden to show that a subclass can override this function to teardown session state.
 */
ChanceSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);

    //Any session cleanup logic would go here.
};

ChanceSkill.prototype.intentHandlers = {
    "RollFourIntent": function (intent, session, response) {
        var four = Math.floor(Math.random() * (5 - 1) + 1);
        response.tell(four);
    },

    "RollSixIntent": function (intent, session, response) {
      var six =  Math.floor(Math.random() * (7 - 1) + 1);
      response.tell(six);
    },

    "RollEightIntent": function (intent, session, response) {
      var eight =  Math.floor(Math.random() * (9 - 1) + 1);
      response.tell(eight);
    },

    "RollTenIntent": function (intent, session, response) {
      var ten =  Math.floor(Math.random() * (11 - 1) + 1);
      response.tell(ten);
    },

    "RollTwelveIntent": function (intent, session, response) {
      var twelve =  Math.floor(Math.random() * (13 - 1) + 1);
      response.tell(twelve);
    },

    "RollTwentyIntent": function (intent, session, response) {
      var twenty =  Math.floor(Math.random() * (21 - 1) + 1);
      response.tell(twenty);
    },

    "RollOneHundredIntent": function (intent, session, response) {
      var oneHundred =  Math.floor(Math.random() * (101 - 1) + 1);
      response.tell(oneHundred);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "";

        switch (session.attributes.stage) {
            case 0:
              speechText = "Use this skill for games of chance and roll the dice! You can roll a four, six, eight, ten, twelve, twenty, or one hundred-sided die. " +
                  "For example, to roll a four-sided die you would ask Roll Four.";
                break;
            default:
                speechText = "Use this skill for games of chance and roll the dice! You can roll a four, six, eight, ten, twelve, twenty, or one hundred-sided die. " +
                    "For example, to roll a four-sided die you would ask Roll Four.";
        }

        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        // For the repromptText, play the speechOutput again
        response.ask(speechOutput, repromptOutput);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Chance Skill.
    var skill = new ChanceSkill();
    skill.execute(event, context);
};

/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.0a18efc7-cfbc-47db-ae9c-5399446fceb2"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
  "In Alaska it is illegal to give a moose a beer.",
  "In Arizona it is illegal for a donkey to sleep in a bathtub.",
  "In Florida it is illegal for establishments that serve alchohol to hold any contest or activity that endangers a person with dwarfism.",
  "Indiana makes it illegal to catch fish with your bare hands.",
  "Giving fish alcohol is prohibited in Ohio.",
  "Playing pinball under the age of eighteen is forbidden in South Carolina.",
  "In Alabama you must have windshield wipers on your car to be legal.",
  "It is strictly forbidden to prounounce Arkansas incorrectly in Arkansas.",
  "California makes it illegal for a woman to drive in a house coat.",
  "Colorado makes it an offense to ride a horse while under the influence.",
  "Georgia state law also like Arizona makes it illegal to keep a donkey in a bathtub.",
  "Idaho makes it illegal to fish on a camel's back.",
  "Iowa state law indicates that kisses may last for no more than five minutes.",
  "In Kansas a rabbit may not be shot from a motorboat.",
  "In Maine if you keep your Christmas decorations up past January fourteenth you may be fined.",
  "Massachusetts state law indicates that Quakers and witches are banned.",
  "Minnesota state law mandates that all men driving motorcycles wear shirts.",
  "In Montana it is a felony for a wife to open her husband's mail.",
  "Whale fishing is illegal in Nebraska.",
  "Cars may not pass horse drawn carriages on the streen in New Jersey.",
  "In North Carolina it is illegal to use elephants to plow cotton fields.",
  "Falling asleep with your shoes on is illegal in North Dakota.",
  "In Oklahoma, having a fish in a fishbowl while on a public bus is illegal.",
  "In Oregon it is ilegal for a person to pump their own gasoline.",
  "Motorized vehicles cannot be sold on Sundays in Pennsylvania.",
  "Gathering and eating roadkill is legal in Tennessee.",
  "You may not milk another person's cow in Texas.",
  "In Utah birds have the right of way on all highways.",
  "Tickling women in Virginia is illegal.",
  "Whistling while underwater in West Virginia is illegal.",
  "Skiing under the influence of alcohol is prohibited in Wyoming."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
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

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

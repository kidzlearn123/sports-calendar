const Alexa = require('alexa-sdk');
const ical = require('ical');
const utils = require('util');

const states = {
    SEARCHMODE: '_SEARCHMODE',
 //   DESCRIPTION: '_DESKMODE',
};

// stores evenets that are found to be in our date range
let  relevantEvents = new Array();

//OPTIONAL: replace with "amzn1.ask.skill.[your-unique-value-here]";


var URL = '';


const skillName = "Sports list Calendar:";

// Message when the skill is first called
// const welcomeMessage = "You can ask for the events today. Search for events by date. or say help. What would you like? ";

const welcomeMessage = "Do you want to know about NFL games event list, IPL games event list, or FIFA event list ? Say NFL event list, IPL event list' or 'FIFA event List' ";


// Message for help intent
const HelpMessage = "Here are some things you can say: Get me events for today. Tell me whats happening on the 18th of July. What events are happening next week? Get me stuff happening tomorrow. ";

// Message for help intent
const HelpMessage1 = "First choose a category. Say 'NFL', 'IPL' or 'FIFA'";

// const descriptionStateHelpMessage = "Here are some things you can say: Tell me about event one";

// Used when there is no data within a time period
const NoDataMessage = "Sorry there aren't any events scheduled. Choose a different date or category?";

// Used to tell user skill is closing
const shutdownMessage = "Ok see you again soon.";

// Message used when only 1 event is found allowing for difference in punctuation
const oneEventMessage = "There is 1 event ";

// Message used when more than 1 event is found allowing for difference in punctuation
const multipleEventMessage = "There are %d events ";

// text used after the number of events has been said
const scheduledEventMessage = "scheduled for this time frame. I've sent the details to your Alexa app: ";

const firstThreeMessage = "Here are the first %d. ";

// the values within the {} are swapped out for variables
const eventSummary = "The %s event is, %s at %s on %s ";



// Only used for the card on the companion app
// const cardContentSummary = "%s at %s on %s ";
const cardContentSummary = "%s at %s on %s ";

// More info text
// const haveEventsreprompt = "Give me an event number to hear more information.";

// Error if a date is out of range
const dateOutOfRange = "Date is out of range please choose another date";

// Error if a event number is out of range
// const eventOutOfRange = "Event number is out of range please choose another event";

// Used when an event is asked for
// const descriptionMessage = "Here's the description ";

// Used when an event is asked for
const killSkillMessage = "Ok, great, see you next time.";

const eventNumberMoreInfoText = "You can choose a different date, a different category, say repeat or say stop.";

// used for title on companion app
const cardTitle = "Events";

// output for Alexa
let output = "";



// Adding session handlers
const newSessionHandlers = {
    'LaunchRequest': function () {
      //  this.handler.state = states.SEARCHMODE;
        this.response.speak(skillName + " " + welcomeMessage).listen(welcomeMessage);
        this.emit(':responseReady');
    },
       'Aevent': function () {

      URL='https://s3.amazonaws.com/calendaralexaapp/mainlist-FIFA.ics';
         this.response.speak("Ok. FIFA event list. FIFA events are in the month of June and July.You can ask for the events today. Search for events by date. or say help. What would you like?").listen();
       this.handler.state = states.SEARCHMODE;
        this.emit(':responseReady');
        console.log("URL ev" + URL);
    },

       'Bevent': function () {
       URL = ' calendar url';
         this.response.speak("Ok. NFL Games. You can ask for the events today. Search for events by date. or say help. What would you like?").listen();
        this.handler.state = states.SEARCHMODE;
        this.emit(':responseReady');
    },


      'Cevent': function () {
       URL = 'calendar url';
         this.response.speak("Ok. IPL Games. You can ask for the events today. Search for events by date. or say help. What would you like?").listen();
        this.handler.state = states.SEARCHMODE;
        this.emit(':responseReady');
    },

    "searchIntent": function()
    {
        this.handler.state = states.SEARCHMODE;
        console.log("go here");
        this.URL=URL;
        this.emitWithState("searchIntent");
    },

      'AMAZON.HelpIntent': function () {
        this.response.speak(HelpMessage1).listen(HelpMessage1);
        this.emit(':responseReady');
    },

    'AMAZON.StopIntent': function () {
        this.response.speak(killSkillMessage);
        this.emit(':responseReady');
    },

    'AMAZON.CancelIntent': function () {
        this.response.speak(killSkillMessage);
        this.emit(':responseReady');
    },

    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    },

    'Unhandled_DESKMODE': function () {
        this.response.speak("Please say help to get information.").listen("Please say help to get information.");
        this.emit(':responseReady');
    },

    'Unhandled': function () {
        this.response.speak("Please say help to get information, choose a different category or stop the skill and relaunch").listen(HelpMessage);
        this.emit(':responseReady');
    },

};

// Create a new handler with a SEARCH state
const startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {

    'Aevent': function () {
          URL='https://s3.amazonaws.com/calendaralexaapp/mainlist-FIFA.ics';
         this.response.speak("Ok. FIFA event list. FIFA events are in the month of June and July. You can ask for the events today. Search for events by date. or say help. What would you like?").listen();
   //     this.handler.state = states.SEARCHMODE;
        this.emit(':responseReady');
        console.log("URL ev" + URL);
    },

     'Bevent': function () {
       URL = 'https://s3.amazonaws.com/calendaralexaapp/NFL-primetime.ics';
   //     this.handler.state = states.SEARCHMODE;
         this.response.speak("Ok. NFL Games. NFL events starts from end of July. You can ask for the events today. Search for events by date. or say help. What would you like?").listen();
        this.emit(':responseReady');
    },
     'Cevent': function () {
       URL = 'calendar url';
   //     this.handler.state = states.SEARCHMODE;
         this.response.speak("Ok. IPL Games. IPL games are in the month of April, May and June. You can ask for the events today. Search for events by date. or say help. What would you like?").listen();
        this.emit(':responseReady');
    },

  'AMAZON.HelpIntent': function () {
        this.response.speak(HelpMessage).listen(HelpMessage);
        this.emit(':responseReady');
    },

    'AMAZON.StopIntent': function () {
        this.response.speak(killSkillMessage);
        this.emit(':responseReady');
    },

    'AMAZON.CancelIntent': function () {
        this.response.speak(killSkillMessage);
        this.emit(':responseReady');
    },

    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    },

    'Unhandled': function () {
        this.response.speak("Please say help to get information or stop the skill and relaunch").listen(HelpMessage);
        this.emit(':responseReady');
    },
     'searchIntent': function () {
        // Declare variables
         this.URL=URL;
        let eventList = new Array();
        let slotValue = this.event.request.intent.slots.date.value;
        console.log("URL heading" + URL);
        if (slotValue != undefined)
        {
            // Using the iCal library I pass the URL of where we want to get the data from.
            console.log("URL " + URL + slotValue);
            ical.fromURL(URL, {}, function (error, data) {
                // Loop through all iCal data found
                for (let k in data) {
                    if (data.hasOwnProperty(k)) {
                        let ev = data[k];
                   //     console.log("ev="+data[k]);
                        // Pick out the data relevant to us and create an object to hold it.
                       let eventData = {
                          summary: (ev.summary),
                            location: (ev.location),
                            description:(ev.description),
                            start: ev.start
                        };
                        // add the newly created object to an array for use later.
                        eventList.push(eventData);
                    }
                } // for let k
                // Check we have data
                console.log("event list =" + eventList.length);
                if (eventList.length > 0) {
                    // Read slot data and parse out a usable date
                    console.log("event data="+ slotValue + eventList.length);
                    let eventDate = getDateFromSlot(slotValue);
                    // Check we have both a start and end date
                    console.log("Date " + eventDate.startDate + " " + eventDate.endDate);
                    if (eventDate.startDate && eventDate.endDate) {
                        // initiate a new array, and this time fill it with events that fit between the two dates
                        relevantEvents = getEventsBeweenDates(eventDate.startDate, eventDate.endDate, eventList);
                       console.log("relevant events="+ relevantEvents.length);
                       if (relevantEvents.length > 0) {
                            // change state to description
                        //    this.handler.state = states.DESCRIPTION;

                            // Create output for both Alexa and the content card
                            console.log("relevant events="+ relevantEvents.length);
                            let cardContent = "";
                            if (relevantEvents.length == 1) {
                               output = utils.format(multipleEventMessage, relevantEvents.length);
                                 output = oneEventMessage;
                           }

                            // describes the number of events
                            if (relevantEvents.length > 1) {
                               output = utils.format(multipleEventMessage, relevantEvents.length);
                           }

                            output += scheduledEventMessage;

                            if (relevantEvents.length > 1) {
                                output += utils.format(firstThreeMessage, relevantEvents.length > 7 ? 7 : relevantEvents.length);
                            }

                            if (relevantEvents[0] != null) {
                                let date = new Date(relevantEvents[0].start);
                                if (relevantEvents[0].location != null)
                                {
                                output += utils.format(eventSummary, "First", relevantEvents[0].summary, relevantEvents[0].location, date.toDateString() + ".");
                                }
                                else
                                {
                                    output += utils.format(eventSummary, "First", relevantEvents[0].summary, 'location unknown',date.toDateString() + ".");

                                }
                                }


                            if (relevantEvents[1] != null) {
                               let date = new Date(relevantEvents[1].start);
                              if (relevantEvents[1].location != null)
                                {
                                output += utils.format(eventSummary, "Second", relevantEvents[1].summary, relevantEvents[1].location, date.toDateString() + ".");
                                }
                                else
                                {
                                    output += utils.format(eventSummary, "Second", relevantEvents[1].summary, 'location unknown', date.toDateString() + ".");

                                }
                                }


                             if (relevantEvents[2] != null) {
                               let date = new Date(relevantEvents[2].start);
                                if (relevantEvents[2].location != null)
                                {
                                output += utils.format(eventSummary, "Third", relevantEvents[2].summary, relevantEvents[2].location, date.toDateString() + ".");
                                }
                                else
                                {
                                    output += utils.format(eventSummary, "Third", relevantEvents[2].summary, 'location unknown', date.toDateString() + ".");

                                }
                                }

                            if (relevantEvents[3] != null) {
                               let date = new Date(relevantEvents[3].start);
                               if (relevantEvents[3].location != null)
                                {
                                output += utils.format(eventSummary, "Fourth", relevantEvents[3].summary, relevantEvents[3].location, date.toDateString() + ".");
                                }
                                else
                                {
                                    output += utils.format(eventSummary, "Fourth", relevantEvents[3].summary,  'location unknown', date.toDateString() + ".");

                                }
                                }

                           if (relevantEvents[4] != null) {
                               let date = new Date(relevantEvents[4].start);
                                 if (relevantEvents[4].location != null)
                                {
                                output += utils.format(eventSummary, "Fifth", relevantEvents[4].summary, relevantEvents[4].location, date.toDateString() + ".");
                                }
                                else
                                {
                                    output += utils.format(eventSummary, "Fifth", relevantEvents[4].summary,  'location unknown', date.toDateString() + ".");

                                }
                                }

                             if (relevantEvents[5] != null) {
                               let date = new Date(relevantEvents[5].start);
                                  if (relevantEvents[5].location != null)
                                {
                                output += utils.format(eventSummary, "Sixth", relevantEvents[5].summary, relevantEvents[5].location, date.toDateString() + ".");
                                }
                                else
                                {
                                    output += utils.format(eventSummary, "Sixth", relevantEvents[5].summary,  'location unknown', date.toDateString() + ".");

                                }
                                }

                             if (relevantEvents[6] != null) {
                               let date = new Date(relevantEvents[6].start);
                                if (relevantEvents[6].location != null)
                                {
                                output += utils.format(eventSummary, "Seventh", relevantEvents[6].summary, relevantEvents[6].location, date.toDateString() + ".");
                                }
                                else
                                {
                                    output += utils.format(eventSummary, "Seventh", relevantEvents[6].summary,  'location unknown', date.toDateString() + ".");

                                }
                                }


                            for (let i = 0; i < relevantEvents.length; i++) {
                                let date = new Date(relevantEvents[i].start);
                                if (relevantEvents[i].location != null) {
                                cardContent += utils.format(cardContentSummary, (relevantEvents[i].summary), (relevantEvents[i].location), date.toDateString());
                                }
                                else
                                {
                                   cardContent += utils.format(cardContentSummary, (relevantEvents[i].summary), date.toDateString());

                                }
                            }

                            output += eventNumberMoreInfoText;
                            this.response.cardRenderer(cardTitle, cardContent);
                            this.response.speak(output).listen('repeat');

                        } // if (relevant event.lenghth > 0)
                        else {
                            output = NoDataMessage;
                            this.response.speak(output).listen(output);
                        }
                    } // if event.startdate
                    else {
                        output = NoDataMessage;
                        this.response.speak(output).listen(output);
                    }
                }
                else {
                    output = NoDataMessage;
                    this.response.speak(output).listen(output);
                }
                this.emit(':responseReady');
            }.bind(this));

        }
        else{
            this.response.speak("I'm sorry.  What date did you want me to look for events?").listen("I'm sorry.  What day did you want me to look for events?");
            this.emit(':responseReady');
        }
 },
       'AMAZON.RepeatIntent': function () {
        this.response.speak(output).listen();
        this.emit(':responseReady');
    },

  });

  //   const descriptionHandlers = Alexa.CreateStateHandler(states.DESCRIPTION, {

  // 'eventIntent': function () {

 //       const reprompt = " Would you like to hear another event?";
 //       const slotValue1 = this.event.request.intent.slots.number.value;
     //   let slotValue1 = this.event.request.intent.slots.number.value;

 //  console.log("inside event " + slotValue1 );
        // parse slot value
  //      const index = parseInt(slotValue1, 10) - 1;
  //      console.log("index " + index);
  //    console.log("slot val " + relevantEvents[1]);
  //      if (relevantEvents[slotValue1]) {
  //             console.log("slot val " + relevantEvents[slotValue1]);
            // use the slot value as an index to retrieve description from our relevant array
  //          output = descriptionMessage + relevantEvents[slotValue1].description;

    //        output += reprompt;

//            this.response.cardRenderer(relevantEvents[slotValue1].summary, output);
  //          this.response.speak(output).listen(reprompt);
    //         this.emit(':responseReady');

    //    } else {
      //      this.response.speak(eventOutOfRange);
        //     this.emit(':responseReady');
  //      }
  // }
// });

// register handlers
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = 'amzn1.ask.skill.c56a674a-8f39-4ac9-b49e-ba6c28bd4b09';
 //   alexa.registerHandlers(newSessionHandlers, startSearchHandlers, descriptionHandlers);
 alexa.registerHandlers(newSessionHandlers, startSearchHandlers);
    alexa.execute();
};
//======== HELPER FUNCTIONS ==============

// Remove HTML tags from string
function removeTags(str) {
    if (str) {
        return str.replace(/<(?:.|\n)*?>/gm, '');
    }
}

// Given an AMAZON.DATE slot value parse out to usable JavaScript Date object
// Utterances that map to the weekend for a specific week (such as �this weekend�) convert to a date indicating the week number and weekend: 2015-W49-WE.
// Utterances that map to a month, but not a specific day (such as �next month�, or �December�) convert to a date with just the year and month: 2015-12.
// Utterances that map to a year (such as �next year�) convert to a date containing just the year: 2016.
// Utterances that map to a decade convert to a date indicating the decade: 201X.
// Utterances that map to a season (such as �next winter�) convert to a date with the year and a season indicator: winter: WI, spring: SP, summer: SU, fall: FA)
function getDateFromSlot(rawDate) {
    // try to parse data
    let date = new Date(Date.parse(rawDate));
    // create an empty object to use later
    let eventDate = {

    };

    // if could not parse data must be one of the other formats
    console.log("dt" + date);
    if (isNaN(date)) {
        // to find out what type of date this is, we can split it and count how many parts we have see comments above.
        const res = rawDate.split("-");
        // if we have 2 bits that include a 'W' week number
        if (res.length === 2 && res[1].indexOf('W') > -1) {
            let dates = getWeekData(res);
            eventDate["startDate"] = new Date(dates.startDate);
            eventDate["endDate"] = new Date(dates.endDate);
            // if we have 3 bits, we could either have a valid date (which would have parsed already) or a weekend
        } else if (res.length === 3) {
            let dates = getWeekendData(res);
            eventDate["startDate"] = new Date(dates.startDate);
            eventDate["endDate"] = new Date(dates.endDate);
            // anything else would be out of range for this skill
        } else {
            eventDate["error"] = dateOutOfRange;
        }
        // original slot value was parsed correctly
    } else {
        eventDate["startDate"] = new Date(date).setUTCHours(0, 0, 0, 0);
        eventDate["endDate"] = new Date(date).setUTCHours(24, 0, 0, 0);
    }
    console.log("ev date=" + eventDate["startDate"]);
    return eventDate;
}

// Given a week number return the dates for both weekend days
function getWeekendData(res) {
    if (res.length === 3) {
        const saturdayIndex = 5;
        const sundayIndex = 6;
        const weekNumber = res[1].substring(1);

        const weekStart = w2date(res[0], weekNumber, saturdayIndex);
        const weekEnd = w2date(res[0], weekNumber, sundayIndex);

        return {
            startDate: weekStart,
            endDate: weekEnd,
        };
    }
}

// Given a week number return the dates for both the start date and the end date
function getWeekData(res) {
    if (res.length === 2) {

        const mondayIndex = 0;
        const sundayIndex = 6;

        const weekNumber = res[1].substring(1);

        const weekStart = w2date(res[0], weekNumber, mondayIndex);
        const weekEnd = w2date(res[0], weekNumber, sundayIndex);

        return {
            startDate: weekStart,
            endDate: weekEnd,
        };
    }
}

// Used to work out the dates given week numbers
const w2date = function (year, wn, dayNb) {
    const day = 86400000;

    const j10 = new Date(year, 0, 10, 12, 0, 0),
        j4 = new Date(year, 0, 4, 12, 0, 0),
        mon1 = j4.getTime() - j10.getDay() * day;
    return new Date(mon1 + ((wn - 1) * 7 + dayNb) * day);
};

// Loops though the events from the iCal data, and checks which ones are between our start data and out end date
function getEventsBeweenDates(startDate, endDate, eventList) {

    const start = new Date(startDate);
    const end = new Date(endDate);

    let data = new Array();
     console.log("start end" + start + " " + eventList.length);
    for (let i = 0; i < eventList.length; i++) {
     console.log("event list" + start + end + eventList[i].start + "/n");
        if (start <= eventList[i].start && end >= eventList[i].start) {
            console.log("event list" + start + end + eventList[i].start + "/n");
            data.push(eventList[i]);
        }
    }

    console.log("FOUND " + data.length + " events between those times");
    return data;
}

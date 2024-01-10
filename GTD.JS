function createChecklist() {



/**

* function getTaskListIDs() {

var taskLists = Tasks.Tasklists.list().getItems();

var res = taskLists.map(function(list) {

return {

taskListId: list.getId(),

listName: list.getTitle(),

};

});

Logger.log(res)

}

*

*/



/**-------------------------Make changes below-------------------------*/



/** Change "To do" to the label name you want to use in Gmail

* You will add this label to emails that you want added to a spreadsheet checklist

*/

var gmailLabels = "CustomersTodo"; // You can leave this as "To do" if you don't already have a label with this name









/**-------------------------DO NOT MAKE CHANGES BELOW THIS LINE-------------------------*/

var processed = gmailLabels + "/Processed"; // Sub-label named "Processed" to use once processed



/* Gmail Label that contains the queue */

var label = GmailApp.getUserLabelByName(gmailLabels) ? // Checks to see if label exist and creates label

GmailApp.getUserLabelByName(gmailLabels) : GmailApp.createLabel(gmailLabels);



var processedLabel = GmailApp.getUserLabelByName(processed) ? // Sub-label - Checks to see if label exist and creates label

GmailApp.getUserLabelByName(processed) : GmailApp.createLabel(processed);





var threads = GmailApp.search("in:" + gmailLabels, 0, 20); // Looks for threads in the gmailLabels folder





if (threads.length > 0) {



var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();



var newCheckbox = SpreadsheetApp.newDataValidation(); // Variable that creates a checkbox

newCheckbox.requireCheckbox()

.setAllowInvalid(false)

.build();





for (var t = 0; t < threads.length; t++) { // Loops through each thread



var msgs = threads[t].getMessages(); // Gets each message from thread

var subject = threads[t].getFirstMessageSubject();

var lastMsgDate = threads[t].getLastMessageDate();

lastMsgDate = Utilities.formatDate(lastMsgDate, 'GMT', 'MMM d, yyyy'); // Sets date format

var id = threads[t].getId(); // Gets thread ID



var threadLink = `https://mail.google.com/mail/u/0/#inbox/${id}`; // Link to email thread



var allSenders = [];



threads[t].removeLabel(label); // Removes label once processed

threads[t].addLabel(processedLabel); // Adds processed label





/* Iterates through each message */

for (var m = 0; m < msgs.length; m++) {



var msg = msgs[m];



var sender = msg.getFrom();

sender = sender.match(/.+?(?= <)/g); // RegEx

sender = sender[0];



allSenders.push(sender);

}





const unique = (value, index, self) => {

return self.indexOf(value) === index

}

allSenders = allSenders.filter(unique);





var sendersList = allSenders.join();

var newList = [subject, sendersList, lastMsgDate, threadLink];

ss.appendRow(newList);

ss.getRange(ss.getLastRow(), 5).setDataValidation(newCheckbox);



let task = {

title: subject,

notes: threadLink

};

try {

// Call insert method with taskDetails and taskListId to insert Task to specified tasklist.

var taskListId="GET IT BY EXECUTING THE getTaskListIDs function";

task = Tasks.Tasks.insert(task, taskListId);

// Print the Task ID of created task.

console.log('Task with ID "%s" was created.', task.id);

} catch (err) {

// TODO (developer) - Handle exception from Tasks.insert() of Task API

console.log('Failed with an error %s', err.message);

}



}

}

}




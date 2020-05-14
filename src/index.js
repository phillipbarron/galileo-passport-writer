require('dotenv').config();
const eventService = require('./services/passport-event-sevice');
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

const parameters = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: ["All"],
  QueueUrl: process.env.BABEL_PUBLICATION_QUEUE,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0
};

const getMessages = () => {
  var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
  sqs.receiveMessage(parameters, async function(err, data) {
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages) {
      try {
        eventService.sendPassportEvent(data.Messages[0]);
      } catch (e) {
        console.error('a bad thing happened', e);
      } finally {
        var deleteParams = {
          QueueUrl,
          ReceiptHandle: data.Messages[0].ReceiptHandle
        };
        sqs.deleteMessage(deleteParams, function(err, data) {
          if (err) {
            console.log("Delete Error", err);
          } else {
            console.log("Message Deleted", data);
          }
        });
      }
      getMessages();
    }
  });
};

getMessages();

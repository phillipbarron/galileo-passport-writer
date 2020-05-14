const AWS = require("aws-sdk");
const credentialsProvider = require("./index");

AWS.config.update({ region: "eu-west-1" });

const QueueUrl =
  "https://sqs.eu-west-1.amazonaws.com/169163488685/phill-test-topic-queue";

const parameters = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: ["All"],
  QueueUrl,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0
};

const getMessages = () => {
  var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
  sqs.receiveMessage(parameters, async function(err, data) {
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages) {
      // now build a passport:
      // 1 Read passport from Passport API
      // 2 build new passport from clip publication notification
      // 3 build delta from existing and current passports
      // 4 Send delta to passport writer api
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
      getMessages();
    }
  });
};

getMessages();
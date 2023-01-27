import AWS from 'aws-sdk';
AWS.config.update({region: 'us-east-1'});
function snsRequest(mensagem){
    var params = {
        Message: mensagem,
        TopicArn: 'arn:aws:sns:us-east-1:123456789012:myTopic'
    };
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
  }
exports.handler = (event, context, callback) => {
  snsRequest("Enviando mensagem")
};

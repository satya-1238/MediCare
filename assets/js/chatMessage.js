const moment = require("moment");
const formatMessage = (data) => {
  // console.log("inside fomrat fn:",data);
  msg = {
    from: data.from,
    to: data.to,
    senderEmail: data.senderEmail,
    recieverEmail: data.recieverEmail,
    message: data.msg,
    chatroom:data.chatroom,
    date: moment().format("YYYY-MM-DD"),
    time: moment().format("hh:mm a"),
  };
  // console.log("message:",msg);
  return msg;
};
module.exports = formatMessage;

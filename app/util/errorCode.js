
function errorCode(status, message, data) {
  let response = {
    status,
    message,
    data,
  };
  return response;
}

module.exports = errorCode;

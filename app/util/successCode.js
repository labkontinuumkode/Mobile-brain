function successCode(status, message, data, paginationData) {
  let response = {
    status: status,
    msg: message,
    payload: [data],
  };
  return response;

}
module.exports = successCode;

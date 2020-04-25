const isEmpty = str => {
  return str.trim().length === 0;
};

const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(emailRegEx);
};

exports.validateSignupData = data => {
  let errors = {};
  if (isEmpty(data.email)) errors.email = "Must not be empty";
  else if (!isEmail(data.email)) errors.email = "Must be a valid email address";

  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must match";

  if (isEmpty(data.username)) errors.username = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0
  };
};

exports.validateLoginData = data => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0
  };
};

exports.reduceUserDetails = data => {
  let userDetails = {};

  if (!isEmpty(data.bio)) userDetails.bio = data.bio;
  if (!isEmpty(data.location)) userDetails.location = data.location;

  return userDetails;
};

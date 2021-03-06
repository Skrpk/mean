import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const ValidateSignUpInput = (data) => {
  const errors = {};

  if (Validator.isEmpty(data.login)) {
    errors.login = 'This field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'This email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default ValidateSignUpInput;

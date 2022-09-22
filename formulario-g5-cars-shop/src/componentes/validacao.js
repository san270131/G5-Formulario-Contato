const validateEmail = ({ email, setEmailError }) => {
  const emailRegular =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email && !email.match(emailRegular)
    ? setEmailError('Email invalido')
    : setEmailError('');
};

const validatePhone = ({ phone, setPhoneError }) => {
  var phoneRegular = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phone && !phone.match(phoneRegular)
    ? setPhoneError('Número de telefone não e valido')
    : setPhoneError('');
};

const validateFullName = ({ fullName, setFullNameError }) => {
  return fullName && fullName.length < 5
    ? setFullNameError('Por favor escreva seu nome completo')
    : fullName && fullName.length > 50
    ? setFullNameError('Por favor, tente ser curto e significativo')
    : setFullNameError('');
};

const validateMessage = ({ message, setMessageError }) => {
  return message && message.length < 5
    ? setMessageError('A messagem e muito corta')
    : message && message.length > 200
    ? setMessageError('Tente ser explicíto')
    : setMessageError('');
};

export { validateEmail, validateFullName, validateMessage, validatePhone };
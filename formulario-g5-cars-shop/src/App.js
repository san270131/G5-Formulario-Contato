import React, { useEffect, useState } from 'react';
import { GetContries, IpAddress, SendEmail} from './API/index';
import { SendMessage, ValidateNumber } from './API/Api';
import InlineError from './componentes/inlineError';
import Loading from './componentes/Loading';
import {
  validateEmail,
  validateFullName,
  validateMessage,
  validatePhone,
} from './componentes/validacao';
import { toast } from 'react-toastify';
import Toast from './componentes/Toast'

const InputClass = "w-full py-4 placeholder:text-gray px-6 text-neutral-800 border-2 mt-2 border-border rounded-md"

function App() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState('');
  const [fullNameError, setFullNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [phoneError, setPhoneError] = useState();
  const [messageError, setMessageError] = useState();
  const [loading, setLoading] = useState(true);
  const [ipData, setIpdata] = useState();
  const [countries, setCountries] = useState();
  const [country, setCountry] = useState("Brazil");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [send, setSend] = useState();
  const [setButtonLoad, setValidate] = useState();


  let result = countries && Object.keys(countries).map((key) => countries[key])
  let output = result && result.find((x) => x.country_name === country)
  let outputResult = output && output.dialling_code;
  let phoneFull = outputResult && outputResult.concat(phone);

  useEffect(() => {
    if (!ipData & !countries) {
      IpAddress({ setLoading, setIpdata });
      GetContries({ setLoading, setCountries });
      SendMessage ({fullName, email, phone, message, setSend });
    }

    validateFullName({ fullName, setFullNameError });
    validateEmail({ email, setEmailError });
    validatePhone({ phone, setPhoneError });
    validateMessage({ message, setMessageError });
    ValidateNumber ({ phoneFull, setButtonLoad, setValidate })

    if (send) {
      toast.success(send.msg);
      setFullName("")
      setEmail("")
      setMessage("")
      setSend()
      setPhone("")
    }
  }, [fullName, email, phone, phoneFull, message, send, ipData, countries, setButtonLoad]);

  const submitHandler = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    if (!fullNameError & !emailError & !phoneError & !messageError) {
      SendEmail({ fullName, email, phone: phoneFull, message, setSend }).then(
        () => {
          setButtonLoading(false);
        }
      );
    }
  };

  return (
    <>
      <Toast />
    <div className='container flex-colo py-12 mx-auto min-h-screen sm:py-2 px-4'>
      {
        loading ? (
          <Loading />
        ) : (
          <div className="main-bold lg:w-3/4 w-full flex box-shadow rounded-lg overflow-hidden">
            <div className="box-1 bg-main flex-colo py-6 sm:py-0">
              <img src="formulario-g5-cars-shop.jpg" className="w-25 h-25 object-cover" alt="logo" />
              <h1 className='my-4 text-4xl'>G5 Cars Shop</h1>
              <p className="italic text-sm text-1xl">
                A melhor loja de carros por preferência!
              </p>
            </div>
            <form
              onSubmit={submitHandler}
              className="box-2 bg-white pt-12 pb-6 sm:px-12 px-16">
              <h2 className="sm:text-5xl text-xl text-center mb-12 text-red-800 font-semibold">Entre em contato conosco</h2>
              {/*fullname*/}
              <div className="my-6">
                <label>Nome</label>
                <input value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required type="text" placeholder='Coloque seu nome' className={InputClass} />
                {fullNameError && <InlineError error={fullNameError} />}
              </div>
              {/*e-mail*/}
              <div className="my-6">
                <label>E-mail</label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="example@gmail.com"
                  className={InputClass}
                />
                {emailError && <InlineError error={emailError} />}
              </div>
              {/*Telefone*/}
              <div className="my-6">
                <label>Telefone</label>
                <div className="grid gap-3 grid-cols-12 border-2 mt-2 border-border rounded-md w-full px-2">
                <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="col-span-3 bg-main py-3 px-2 my-2 text-sm rounded"
                  >
                    {result &&
                      result.map((e, index) => (
                        <option key={index} value={e.country_name}>
                          {e.country_name}
                        </option>
                      ))}
                  </select>
                  <div className="tracking-wdest col-span-2 border-x-2 border-border flex-colo">
                    {outputResult}
                  </div>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="number"
                    placeholder="DDDxxxxxxxxx"
                    className="placeholder:text-gray text-neutral-800 col-span-7 px-3"
                  />
                </div>
                {phoneError && <InlineError error={phoneError} />}
              </div>
              {/*menssagem*/}
              <div className="m-6">
                <label>Menssagem</label>
                <textarea value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required placeholder='Como podemos te ajudar?'
                  rows={3}
                  className="mt-2 w-full border-2 border-border py-4 placeholder:text-gray px-6 text-neutral-800 rounder-md" />
                {messageError && <InlineError error={messageError} />}
              </div>
              {/*Enviar*/}
              <button type='submit' 
              disabled={buttonLoading && true}
              className="w-full border-2 border-main hover:bg-white trans bg-main mt-6 rounded-md tracking-widest py-4 font-subMain font-bold">
                {buttonLoading ? "Loading..":"Enviar"}
              </button>
              {/*midias sociais*/}
              <div className="w-full mt-6 flex-rows">
                <a href="https://www.instagram.com/" target="_black">
                  <i className='fab fa-instagram text-fuchsia-600 social'></i>
                </a>
                <a href="https://www.youtube.com/" target="_black">
                  <i className='fab fa-youtube text-red-500 social'></i>
                </a>
                <a href="https://www.facebook.com/" target="_black">
                  <i className='fab fa-facebook text-sky-500 social'></i>
                </a>
              </div>
            </form>
          </div>
        )}
    </div>
    </>
  );
}

export default App;
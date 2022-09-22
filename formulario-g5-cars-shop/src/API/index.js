import axios from 'axios';

export const IpAddress = async ({ setLoading, setIpdata }) => {
    try {
        let res = await axios.get(
            `http://api.ipstack.com/check?access_key=${process.env.REACT_APP_ADDRESS_API_KEY}`
        );
        if (res) {
            setLoading(false);
            setIpdata(res.data.country_name);
        }
    } catch (error) {
        alert(`IP address Error: ${error}`)
    }
};

export const GetContries = async ({ setLoading, setCountries }) => {
    try {
        let res = await axios.get(
            `https://api.apilayer.com/number_verification/countries`,
            {
              headers: {
                apikey:"omDTj3EiEAZLSI3by3d1VFaCSmPVUuvm",
              },
            }
          );
        if (res) {
            setLoading(false)
            setCountries(res.data);
        }
    } catch (error) {
        alert(error.response.data.message);
        setLoading(false);
    }
};

export const SendEmail = async ({
    fullName,
    email,
    phone,
    message,
    setSend,
  }) => {
    try {
      const datas = { fullName, email, phone, message };
      let res = await axios.post(`http://localhost:5000/send`, datas);
      if (res) {
        setSend(res.data);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };





import nodemailer from 'nodemailer';

const Email = (options) => {
  let transpoter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.USER, // email
      pass: process.env.PASSWORD, //password
    },
  });
  transpoter.sendMail(options, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

// send email
const EmailSender = ({ fullName, email, phone, message }) => {
  const options = {
    from: `g5 Cars Shop 🛍️ <${process.env.USER}>`,
    to: process.env.SEND_TO,
    subject: 'Messagem enviado para G5 Cars Shop',
    html: `
        <div style="width: 100%; background-color: #cec6cc; padding: 5rem 0">
        <div style="max-width: 700px; background-color: white; margin: 0 auto">
          <div style="width: 100%; background-color: #363635; padding: 20px 0">
          <a href="${process.env.CLIENT_URL}" ><img
              src="/fomulario-contato/public/formulario-g5-cars-shop.jpg"
              style="width: 100%; height: 70px; object-fit: contain"
            /></a> 
          
          </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
              Form G5 Cars Shop
            </p>
            <div style="font-size: .8rem; margin: 0 30px">
              <p>FullName: <b>${fullName}</b></p>
              <p>Email: <b>${email}</b></p>
              <p>Phone: <b>${phone}</b></p>
              <p>Message: <i>${message}</i></p>
            </div>
          </div>
        </div>
      </div>
        `,
  };

  Email(options)
};

export default EmailSender
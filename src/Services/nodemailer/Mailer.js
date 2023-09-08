const nodemailer = require("nodemailer");
require("dotenv").config();

class Mailer {
  constructor() {}

  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERNODEMAILER,
      pass: process.env.PASSWORDNODEMAILER,
    },
  });

  msfSucceffull_new_user =  "Tu usuario fue creado correctamente"
  msPremiun_succefull_user = "Se te activo el premiun"

  async initialMain() {
    this.transporter
      .verify()
      .then(() => {
        console.log("NODEMAILER OK");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async sendNewUser(email) {
   try {
    if(!email) throw new Error("se necesita el email")

    const info = await this.transporter.sendMail({
        from: `"Create new Users 👻" <${process.env.USERNODEMAILER}`,
        to: email, 
        subject: "Create new user suceffull", 
        text: this.msfSucceffull_new_user, 
      });
    
    if(!info)throw new Error("Algo salio mal")
    return info
   } catch (error) {
    console.error(error);
   }
  }

  async sendPremiumUser(email) {
    try {
     if(!email) throw new Error("se necesita el email")
 
     const info = await this.transporter.sendMail({
         from: `"Create new Users 👻" <${process.env.USERNODEMAILER}`,
         to: email, 
         subject: "SpootChat", 
         text: this.msPremiun_succefull_user, 
       });
     
     if(!info)throw new Error("Algo salio mal")
     return info
    } catch (error) {
     console.error(error);
    }
   }
}

const mailer = new Mailer();

module.exports = mailer;

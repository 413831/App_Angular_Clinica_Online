const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require('path');

// Express application
const app = express();

app.use(express.static(__dirname + '/angularapp'));

// Configuracion para el mail
// app.use(ra origin: "*" }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 8080);

app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname + '/angularapp/index.html'));
});

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.send(info);
    }
  });
});

const sendMail = (user, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "<sender email>",
      pass: "<password>"
    }
  }); 
}

const mailOptions = {
  from: `<No reply>`,
  to: `<${usuario.email}>`,
  subject: "<Message subject>",
  html: "<h1>Esto es un mail autogenerado</h1>"
};


console.log('Finalizo');

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "894073854290-i8rd35pp2gl4nn6cbfuhb9bdnt8kjk71.apps.googleusercontent.com",
    "SpZw8BJc0V4sveCOE1-viCnj", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//04FrhQZOlzGf9CgYIARAAGAQSNwF-L9Ir3StJEJKqof4AtrtbiFe1rGy1tDqJzPKjng8ChYkRM8QzwF1ytjEnu_hXYWbIrbhovUk"
});

const accessToken = oauth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: "OAuth2",
        user: "proyectofinalrestorant@gmail.com",
        clientId: "894073854290-i8rd35pp2gl4nn6cbfuhb9bdnt8kjk71.apps.googleusercontent.com",
        clientSecret: "SpZw8BJc0V4sveCOE1-viCnj",
        refreshToken: "1//04FrhQZOlzGf9CgYIARAAGAQSNwF-L9Ir3StJEJKqof4AtrtbiFe1rGy1tDqJzPKjng8ChYkRM8QzwF1ytjEnu_hXYWbIrbhovUk",
        accessToken: accessToken
    }
});

function primeraLetraDelNombreMayuscula(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

const sendNodeMail = (mailContent) => {
    const { subject, carritoID, nombre, direccion, edad, telefono, usuario, admin, foto } = mailContent
    //La función recibe por parámetros los datos a llenar en el correo
    const mailOptions = {
        from: `Tienda Online <proyectofinalrestorant@gmail.com>`,
        to: `proyectofinalrestorant@gmail.com`, // modificar este email de prueba para ver su funcionamiento
        subject: subject,
        html: `
            <div>
                    <h3 style='text-align: center'> Datos del Usuario Registrado </h3>
                <div>
                    Codigo del carrito de compra: ${carritoID} <br>
                    Nombre: ${primeraLetraDelNombreMayuscula(nombre)} <br>
                    Direccion: ${direccion} <br>
                    Edad: ${edad} <br>
                    Telefono: ${telefono} <br>
                    Correo Electronico: ${usuario} <br>
                    Es Admin ? :${admin === false ? ' NO' : ' SI'} <br>
                    Avatar: ${foto}
                  </div>
             </div>   
        ` // html body | contenido del mail
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendNodeMail;


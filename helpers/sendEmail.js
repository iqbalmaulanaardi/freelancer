var nodemailer = require('nodemailer');

function sendEmail(recepient) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pairprojectxavier@gmail.com',
            pass: 'naonweah1!'
        }
    });
    var mailOptions = {
        from: 'pairprojectxavier@gmail.com',
        to: recepient,
        subject: 'Welcome to our freelancer pair project',
        text: `We hope you find your life here! 
        Regards
    
        Iqbal Maulana
        `
    };
    return new Promise(function(resolve, reject) {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                reject(error)
            } else {
                resolve(info.response)
            }
        })
    })


}
module.exports = sendEmail
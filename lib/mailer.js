import * as nodemailer from 'nodemailer';
import * as voucher_codes from 'voucher-code-generator'

let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASS //to env var
            }
        }
    );

export async function send(mailDetails){
    mailDetails.from = process.env.GMAIL;
    await new Promise((resolve, reject) => {
        // verify connection configuration
        mailTransporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
    return await new Promise((resolve, reject) => {
        mailTransporter
            .sendMail(mailDetails,
                function (err, data) {
                    if (err) {
                        console.log('Error Occurs');
                        console.error(err);
                        reject(false);
                    } else {
                        console.log('Email sent successfully');
                        console.log(info);
                        resolve(true);
                    }
                })
    });
}

export function codegen() {
    return voucher_codes.generate({
        length: 8,
        count: 1,
        prefix: "ga-"
    })[0];
}
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
    mailTransporter
        .sendMail(mailDetails,
            function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                    return false;
                } else {
                    console.log('Email sent successfully');
                    return true;
                }
            });
}

export function codegen() {
    return voucher_codes.generate({
        length: 8,
        count: 1,
        prefix: "ga-"
    })[0];
}
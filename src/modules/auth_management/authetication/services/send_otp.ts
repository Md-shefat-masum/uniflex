import axios from 'axios';
import { env } from 'process';

function formatBdPhoneNumber(phoneNumber:string) {
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Check if the phone number matches the Bangladeshi format: 01[3-9] followed by 8 digits
    if (/^01[3-9]\d{8}$/.test(phoneNumber)) {
        // Return formatted number by adding '880' country code and removing the leading '0'
        return '880' + phoneNumber.slice(1);
    } else {
        return "";
    }
}

async function send_otp(number:string, otp:number){
    const url = 'https://3g9qkm.api-in.infobip.com/sms/2/text/advanced';

    number = formatBdPhoneNumber(number);
    
    if(!number.length)  return;

    const data = {
        messages: [
            {
                destinations: [
                    {
                        to: number
                    }
                ],
                from: env.SMS_MASK_FORM,
                text: `Your ${env.SMS_MASK_BODY} OTP is ${otp}`
            }
        ]
    };
    
    try {
        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `App ${env.SMS_AUTH_TOKEN}` // Replace with actual authorization method if needed
            }
        });
        return 1;
    } catch (error) {
        console.error('Error sending SMS:', error);
        return 0;
    }
}

export default send_otp;
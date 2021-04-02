import mailgun from 'mailgun-js';
import dotenv from 'dotenv';

dotenv.config();

// Mailgun credentials
const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const from = 'orders@thrill-store.com';

class Mail {
  static async mailCustomer(email) {
    const mg = new mailgun({ apiKey, domain });
    const data = {
      from,
      to: email,
      subject: 'Order notification',
      html: `Hello <b>${email}</b>,  
              <br></b>. 
              <br>Your order have been placed successfully Thank you for choosing thrill-store.`,
    };
    // Invokes the method to send emails given the above data with the helper library
    try {
      const mailAttempt = await mg.messages().send(data);
      if (mailAttempt) {
        return 'mail successfully sent';
      }
    } catch (error) {
      return 'sending of mail failed';
    }
  };
}

export default Mail;

import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface ContactNotificationParams {
  senderName: string;
  senderEmail: string;
  message: string;
  timestamp: string;
}

export async function sendContactNotification(
  params: ContactNotificationParams
): Promise<boolean> {
  try {
    const emailContent = `
New Contact Form Submission

From: ${params.senderName}
Email: ${params.senderEmail}
Time: ${new Date(params.timestamp).toLocaleString()}

Message:
${params.message}

---
You can view all contact messages at: ${process.env.REPLIT_DEV_DOMAIN || 'your-portfolio'}/messages
`;

    await mailService.send({
      to: 'vaishnavchandran00@gmail.com', // Your email address
      from: 'vaishnavchandran00@gmail.com', // Use your verified email as sender
      subject: `New Portfolio Contact: ${params.senderName}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${params.senderName}</p>
            <p><strong>Email:</strong> <a href="mailto:${params.senderEmail}">${params.senderEmail}</a></p>
            <p><strong>Time:</strong> ${new Date(params.timestamp).toLocaleString()}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #007acc; margin: 20px 0;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${params.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p><a href="${process.env.REPLIT_DEV_DOMAIN || 'your-portfolio'}/messages" style="color: #007acc;">View all contact messages</a></p>
          </div>
        </div>
      `
    });
    
    console.log('Contact notification email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    return false;
  }
}
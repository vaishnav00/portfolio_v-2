import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertContactMessageSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';
import { sendContactNotification } from '../server/email';
import { googleSheetsService } from '../server/googleSheets';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Initialize Google Sheets service
    await googleSheetsService.initialize();

    if (req.method === 'GET') {
      // Security: Contact messages endpoint removed from public API
      // Access your messages through your admin dashboard or database directly
      return res.status(403).json({ error: 'Access denied' });
    }

    if (req.method === 'POST') {
      // Submit contact message
      const result = insertContactMessageSchema.safeParse(req.body);
      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ error: error.message });
      }

      const message = await storage.createContactMessage(result.data);
      
      // Send email notification
      const emailSent = await sendContactNotification({
        senderName: result.data.name,
        senderEmail: result.data.email,
        message: result.data.message,
        timestamp: (message.createdAt || new Date()).toISOString()
      });

      // Save to Google Sheets
      const sheetsSaved = await googleSheetsService.saveContactSubmission({
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
        timestamp: (message.createdAt || new Date()).toISOString()
      });

      if (emailSent) {
        console.log('Email notification sent for new contact message');
      }
      
      if (sheetsSaved) {
        console.log('Contact message saved to Google Sheets');
      }

      return res.status(201).json({ success: true, message: "Message sent successfully" });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
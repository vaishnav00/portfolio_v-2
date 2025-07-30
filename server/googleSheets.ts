import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

interface ContactData {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export class GoogleSheetsService {
  private doc: GoogleSpreadsheet | null = null;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    // Check if all required environment variables are present
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 
        !process.env.GOOGLE_PRIVATE_KEY || 
        !process.env.GOOGLE_SHEET_ID) {
      console.log('Google Sheets integration not configured - missing credentials');
      return;
    }

    // Validate private key format
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (privateKey.length < 1000 || !privateKey.includes('BEGIN PRIVATE KEY')) {
      console.log('Google Sheets: Invalid private key format detected. Expected RSA private key, got:', {
        length: privateKey.length,
        preview: privateKey.substring(0, 50) + '...'
      });
      console.log('Please ensure GOOGLE_PRIVATE_KEY contains the full RSA private key from the service account JSON file');
      return;
    }

    try {
      // Create service account auth
      const formattedKey = privateKey.replace(/\\n/g, '\n');

      console.log('Initializing Google Sheets with service account:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);

      const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: formattedKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      // Initialize the Google Spreadsheet
      this.doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
      await this.doc.loadInfo();

      // Get or create the first sheet
      let sheet = this.doc.sheetsByIndex[0];
      
      // If no sheets exist, create one
      if (!sheet) {
        sheet = await this.doc.addSheet({ 
          title: 'Contact Form Submissions',
          headerValues: ['Timestamp', 'Name', 'Email', 'Message']
        });
      } else {
        // Set headers if they don't exist
        await sheet.loadHeaderRow();
        if (!sheet.headerValues || sheet.headerValues.length === 0) {
          await sheet.setHeaderRow(['Timestamp', 'Name', 'Email', 'Message']);
        }
      }

      this.isInitialized = true;
      console.log('Google Sheets service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Sheets service:', error);
      this.isInitialized = false;
    }
  }

  async saveContactSubmission(data: ContactData): Promise<boolean> {
    if (!this.isInitialized || !this.doc) {
      console.log('Google Sheets not initialized, skipping save');
      return false;
    }

    try {
      const sheet = this.doc.sheetsByIndex[0];
      
      // Add new row with contact data
      await sheet.addRow({
        Timestamp: new Date(data.timestamp).toLocaleString('en-US', {
          timeZone: 'UTC',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        Name: data.name,
        Email: data.email,
        Message: data.message
      });

      console.log('Contact submission saved to Google Sheets successfully');
      return true;
    } catch (error) {
      console.error('Failed to save contact submission to Google Sheets:', error);
      return false;
    }
  }

  isConfigured(): boolean {
    return !!(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && 
              process.env.GOOGLE_PRIVATE_KEY && 
              process.env.GOOGLE_SHEET_ID);
  }
}

// Create a singleton instance
export const googleSheetsService = new GoogleSheetsService();
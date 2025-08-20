import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

interface ContactData {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface DinoScoreData {
  playerName: string;
  score: number;
  timestamp: string;
}

export class GoogleSheetsService {
  private doc: GoogleSpreadsheet | null = null;
  private contactSheet: any = null;
  private dinoSheet: any = null;
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

    // Extract sheet ID from URL if needed
    let sheetId = process.env.GOOGLE_SHEET_ID;
    if (sheetId?.includes('docs.google.com')) {
      const match = sheetId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        sheetId = match[1];
        console.log('Extracted sheet ID from URL:', sheetId);
      } else {
        console.log('Google Sheets: Invalid sheet URL format');
        return;
      }
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
      console.log('Using sheet ID:', sheetId);

      const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: formattedKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      // Initialize the Google Spreadsheet
      this.doc = new GoogleSpreadsheet(sheetId!, serviceAccountAuth);
      await this.doc.loadInfo();

      // Setup contact form sheet
      let contactSheet = this.doc.sheetsByTitle['Contact Form Submissions'] || this.doc.sheetsByIndex[0];
      
      if (!contactSheet) {
        contactSheet = await this.doc.addSheet({ 
          title: 'Contact Form Submissions',
          headerValues: ['Timestamp', 'Name', 'Email', 'Message']
        });
        console.log('Created Contact Form Submissions sheet');
      } else {
        // Rename first sheet if it doesn't have a proper title
        if (contactSheet.title === 'Sheet1' || !contactSheet.title.includes('Contact')) {
          await contactSheet.updateProperties({ title: 'Contact Form Submissions' });
        }
        
        try {
          await contactSheet.loadHeaderRow();
          if (!contactSheet.headerValues || contactSheet.headerValues.length === 0) {
            await contactSheet.setHeaderRow(['Timestamp', 'Name', 'Email', 'Message']);
            console.log('Added headers to Contact Form sheet');
          }
        } catch (error) {
          await contactSheet.setHeaderRow(['Timestamp', 'Name', 'Email', 'Message']);
          console.log('Initialized Contact Form sheet with headers');
        }
      }
      this.contactSheet = contactSheet;

      // Setup dino game leaderboard sheet
      let dinoSheet = this.doc.sheetsByTitle['Dino Game Leaderboard'];
      
      if (!dinoSheet) {
        dinoSheet = await this.doc.addSheet({
          title: 'Dino Game Leaderboard', 
          headerValues: ['Timestamp', 'Player Name', 'Score']
        });
        console.log('Created Dino Game Leaderboard sheet');
      } else {
        try {
          await dinoSheet.loadHeaderRow();
          if (!dinoSheet.headerValues || dinoSheet.headerValues.length === 0) {
            await dinoSheet.setHeaderRow(['Timestamp', 'Player Name', 'Score']);
            console.log('Added headers to Dino Game sheet');
          }
        } catch (error) {
          await dinoSheet.setHeaderRow(['Timestamp', 'Player Name', 'Score']);
          console.log('Initialized Dino Game sheet with headers');
        }
      }
      this.dinoSheet = dinoSheet;

      this.isInitialized = true;
      console.log('Google Sheets service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Sheets service:', error);
      this.isInitialized = false;
    }
  }

  async saveContactSubmission(data: ContactData): Promise<boolean> {
    if (!this.isInitialized || !this.contactSheet) {
      console.log('Google Sheets not initialized, skipping contact save');
      return false;
    }

    try {
      await this.contactSheet.addRow({
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

  async saveDinoScore(data: DinoScoreData): Promise<boolean> {
    if (!this.isInitialized || !this.dinoSheet) {
      console.log('Google Sheets not initialized, skipping dino score save');
      return false;
    }

    try {
      await this.dinoSheet.addRow({
        Timestamp: new Date(data.timestamp).toLocaleString('en-US', {
          timeZone: 'UTC',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        'Player Name': data.playerName,
        Score: data.score
      });

      console.log('Dino score saved to Google Sheets successfully');
      return true;
    } catch (error) {
      console.error('Failed to save dino score to Google Sheets:', error);
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
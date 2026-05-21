import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), 'logs/error.log');

export const logger = {
  error: (message: string, error: any) => {
    const timestamp = new Date().toISOString();
    const errorDetails = error instanceof Error ? error.stack : JSON.stringify(error);
    const logEntry = `[${timestamp}] ERROR: ${message}\n${errorDetails}\n${'-'.repeat(50)}\n`;

    console.error(`[LOGGER] ${message}`, error);

    try {
      fs.appendFileSync(LOG_FILE, logEntry, 'utf8');
    } catch (fsError) {
      console.error('Failed to write to log file:', fsError);
    }
  },
  info: (message: string) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] INFO: ${message}\n`;
    try {
      fs.appendFileSync(LOG_FILE, logEntry, 'utf8');
    } catch (fsError) {
      console.error('Failed to write to log file:', fsError);
    }
  }
};
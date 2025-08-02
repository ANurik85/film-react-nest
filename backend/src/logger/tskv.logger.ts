import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    ...optionalParams: any[]
  ): string {
    const timestamp = new Date().toISOString();
    const context = optionalParams[0] || '';
    const additionalParams = optionalParams[1] || {};

    const entries = [
      `timestamp=${timestamp}`,
      `level=${level}`,
      `message=${this.escapeValue(message)}`,
      `context=${context}`,
      ...Object.entries(additionalParams).map(
        ([key, value]) => `${key}=${this.escapeValue(value)}`,
      ),
    ];

    return entries.join('\t') + '\n';
  }

  private escapeValue(value: any): string {
    if (typeof value === 'object') {
      return JSON.stringify(value).replace(/\t/g, '\\t').replace(/\n/g, '\\n');
    }
    return String(value).replace(/\t/g, '\\t').replace(/\n/g, '\\n');
  }

  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    process.stderr.write(
      this.formatMessage('error', message, ...optionalParams),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMessage('warn', message, ...optionalParams),
    );
  }

  debug(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMessage('debug', message, ...optionalParams),
    );
  }

  verbose(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMessage('verbose', message, ...optionalParams),
    );
  }
}

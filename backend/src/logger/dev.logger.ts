import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  constructor(context?: string) {
    super(context);

    this.log = (message) => console.log(message);
    this.error = (message) => console.error(message);
    this.warn = (message) => console.warn(message);
    this.debug = (message) => console.debug(message);
    this.verbose = (message) => console.log(message);
  }

  log(message: string) {
    super.log(message);
  }

  error(message: string) {
    super.error(message);
  }

  warn(message: string) {
    super.warn(message);
  }

  debug(message: string) {
    super.debug(message);
  }

  verbose(message: string) {
    super.verbose(message);
  }
}

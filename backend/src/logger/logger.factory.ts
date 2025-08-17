import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

export class LoggerFactory {
  static create() {
    switch (process.env.LOG_FORMAT) {
      case 'json':
        return new JsonLogger();
      case 'tskv':
        return new TskvLogger();
      default:
        return new DevLogger();
    }
  }
}

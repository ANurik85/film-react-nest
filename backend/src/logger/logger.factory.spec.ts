import { DevLogger } from './dev.logger';
import { LoggerFactory } from './logger.factory';

describe('LoggerFactory', () => {
  it('should return DevLogger by default', () => {
    const logger = LoggerFactory.create();
    expect(logger).toBeInstanceOf(DevLogger);
  });
});

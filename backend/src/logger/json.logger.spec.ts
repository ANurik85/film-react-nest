import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should format log as JSON', () => {
    logger.log('Test message');
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/"message":"Test message"/),
    );
  });
});

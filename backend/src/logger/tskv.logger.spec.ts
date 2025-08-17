import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
    jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
  });

  it('should format log as TSKV', () => {
    logger.log('Test message');
    expect(process.stdout.write).toHaveBeenCalledWith(
      expect.stringContaining('message=Test message'),
    );
  });
});

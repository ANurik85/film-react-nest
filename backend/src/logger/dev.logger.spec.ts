import { DevLogger } from './dev.logger';

describe('DevLogger', () => {
  let logger: DevLogger;

  const mockConsole = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  };

  beforeEach(() => {
    global.console = mockConsole as any;
    logger = new DevLogger();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log messages to console.log', () => {
    logger.log('Test log message');
    expect(mockConsole.log).toHaveBeenCalledWith('Test log message', undefined);
  });

  it('should log errors to console.error', () => {
    logger.error('Test error message');
    expect(mockConsole.error).toHaveBeenCalledWith(
      'Test error message',
      undefined,
    );
  });

  it('should log warnings to console.warn', () => {
    logger.warn('Test warn message');
    expect(mockConsole.warn).toHaveBeenCalledWith(
      'Test warn message',
      undefined,
    );
  });

  it('should log debug messages to console.debug', () => {
    logger.debug('Test debug message');
    expect(mockConsole.debug).toHaveBeenCalledWith(
      'Test debug message',
      undefined,
    );
  });

  it('should log verbose messages to console.verbose', () => {
    logger.verbose('Test verbose message');
    expect(mockConsole.verbose).toHaveBeenCalledWith(
      'Test verbose message',
      undefined,
    );
  });

  it('should apply custom formatting', () => {
    logger.log('Message');
    expect(mockConsole.log).toHaveBeenCalledWith(
      expect.stringContaining('\x1b[32mMessage\x1b[0m'), // ANSI-цвета
      undefined,
    );
  });

  it('should include context in logs', () => {
    const loggerWithContext = new DevLogger('TestContext');
    loggerWithContext.log('Message with context');
    expect(mockConsole.log).toHaveBeenCalledWith(
      '[TestContext] Message with context',
      undefined,
    );
  });
});

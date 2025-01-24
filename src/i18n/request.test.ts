import { getRequestConfig } from 'next-intl/server';

jest.mock('./routing', () => ({
  routing: {
    locales: ['en', 'uk'],
    defaultLocale: 'en'
  },
}));

describe('getRequestConfig', () => {
  const mockImport = jest.fn();

  beforeAll(() => {
    jest.spyOn(global, 'import').mockImplementation((modulePath) => {
    
      if (modulePath.includes('en.json')) {
        return Promise.resolve({ default: { welcome: 'Welcome' } });
      }
      if (modulePath.includes('uk.json')) {
        return Promise.resolve({ default: { welcome: 'Ласкаво просимо' } });
      }

      return Promise.reject(new Error('File not found'));
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('returns the default locale and messages if requestLocale is invalid', async () => {
    const config = await getRequestConfig({ requestLocale: Promise.resolve('xx') });
    expect(config.locale).toBe('en');
    expect(mockImport).toHaveBeenCalledWith('../../messages/en.json');
    expect(config.messages).toEqual({ welcome: 'Welcome' });
  });

  it('returns the correct locale and messages if requestLocale is valid', async () => {
    const config = await getRequestConfig({ requestLocale: Promise.resolve('uk') });
    expect(config.locale).toBe('uk');
    expect(mockImport).toHaveBeenCalledWith('../../messages/uk.json');
    expect(config.messages).toEqual({ welcome: 'Ласкаво просимо' });
  });

  it('returns the default locale and messages when requestLocale is undefined', async () => {
    const config = await getRequestConfig({ requestLocale: Promise.resolve(undefined) });
    expect(config.locale).toBe('en');
    expect(mockImport).toHaveBeenCalledWith('../../messages/en.json');
    expect(config.messages).toEqual({ welcome: 'Welcome' });
  });

  it('returns the default locale and messages when requestLocale is null', async () => {
    const config = await getRequestConfig({ requestLocale: Promise.resolve(null) });
    expect(config.locale).toBe('en');
    expect(mockImport).toHaveBeenCalledWith('../../messages/en.json');
    expect(config.messages).toEqual({ welcome: 'Welcome' });
  });
});

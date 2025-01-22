import { render, screen } from '@testing-library/react';
import Header from './Header';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import userEvent from '@testing-library/user-event';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn((key) => key),
  useLocale: jest.fn()
}));

jest.mock('@/i18n/routing', () => ({
  Link: jest.fn(({ href, children, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  )),
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

describe('Header Component', () => {
  const mockReplace = jest.fn();
  const mockUseLocale = useLocale as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    (useTranslations as jest.Mock).mockClear();
    (useTranslations as jest.Mock).mockImplementation(() => (key: string) => {
      const translations: Record<string, string> = {
        home: 'Головна',
        about: 'Про нас',
        changeLanguage: 'Змінити мову'
      };
      return translations[key] || key;
    });
    mockUseLocale.mockReturnValue('en');
    mockUseRouter.mockReturnValue({ replace: mockReplace });
  });

  it('renders the header with translated links', () => {
    render(<Header />);

    expect(screen.getByText('Головна')).toBeInTheDocument();
    expect(screen.getByText('Про нас')).toBeInTheDocument();
    expect(screen.getByText('Змінити мову')).toBeInTheDocument();
  });

  it('checks if Link is called with the correct href', () => {
    render(<Header />);
    const secondCallsArg = Link['mock']['calls'][0][1];

    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({
        href: '/',
        children: 'Головна'
      }),
      secondCallsArg
    );

    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({
        href: '/about',
        children: 'Про нас',
      }),
      secondCallsArg
    );
  });

  it('renders the header with language switcher', () => {
    render(<Header />);

    expect(screen.getByText('Головна')).toBeInTheDocument();
    expect(screen.getByText('Про нас')).toBeInTheDocument();
    expect(screen.getByText('Змінити мову')).toBeInTheDocument();
  });

  it('changes language and verifies translations in the header', async () => {
    render(<Header />);

    const select = screen.getByLabelText('Змінити мову');

    expect(select).toHaveValue('en');
    expect(screen.getByText('Головна')).toBeInTheDocument();
    expect(screen.getByText('Про нас')).toBeInTheDocument();

    await userEvent.selectOptions(select, 'uk');
    expect(select).toHaveValue('uk');

    (useTranslations as jest.Mock).mockImplementation((namespace) => {
      if (namespace === 'Navigation') {
        return (key) => {
          const translations = {
            home: 'Home',
            about: 'About us',
            changeLanguage: 'Change language',
          };
          return translations[key];
        };
      }
      return (key) => key;
    });

    render(<Header />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About us')).toBeInTheDocument();
  });
});

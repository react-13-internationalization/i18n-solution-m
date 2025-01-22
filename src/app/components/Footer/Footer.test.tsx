import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { useTranslations } from 'next-intl';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn()
}));

describe('Footer Component', () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockClear();
    global.window = window;
    window.scrollTo = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('renders the footer with English translated text', () => {
    (useTranslations as jest.Mock).mockImplementation(() => (key: string) => {
      const translations: Record<string, string> = {
        copyright: '© 2024 My Company',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        'socialMedia.twitter': 'Twitter',
        'socialMedia.facebook': 'Facebook',
        'socialMedia.instagram': 'Instagram',
        backToTop: 'Back to Top'
      };
      return translations[key] || key;
    });

    render(<Footer />);

    expect(screen.getByText('© 2024 My Company')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Back to Top')).toBeInTheDocument();
  });

  it('renders the footer with Ukrainian translated text', () => {
    (useTranslations as jest.Mock).mockImplementation(() => (key: string) => {
      const translations: Record<string, string> = {
        copyright: '© 2024 Моя компанія',
        privacyPolicy: 'Політика конфіденційності',
        termsOfService: 'Умови обслуговування',
        'socialMedia.twitter': 'Твіттер',
        'socialMedia.facebook': 'Фейсбук',
        'socialMedia.instagram': 'Інстаграм',
        backToTop: 'На верх'
      };
      return translations[key] || key;
    });

    render(<Footer />);

    expect(screen.getByText('© 2024 Моя компанія')).toBeInTheDocument();
    expect(screen.getByText('Політика конфіденційності')).toBeInTheDocument();
    expect(screen.getByText('Умови обслуговування')).toBeInTheDocument();
    expect(screen.getByText('Твіттер')).toBeInTheDocument();
    expect(screen.getByText('Фейсбук')).toBeInTheDocument();
    expect(screen.getByText('Інстаграм')).toBeInTheDocument();
    expect(screen.getByText('На верх')).toBeInTheDocument();
  });

  it('scrolls to the top when backToTop button is clicked', () => {
    render(<Footer />);

    const scrollToSpy = jest.spyOn(window, 'scrollTo');

    const button = screen.getByText('На верх');
    button.click();

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);

    scrollToSpy.mockRestore();
  });
});

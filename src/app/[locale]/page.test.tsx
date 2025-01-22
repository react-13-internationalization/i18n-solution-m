import { render, screen } from '@testing-library/react';
import HomePage from './page';
import { useTranslations } from 'next-intl';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

describe('HomePage Component', () => {
  const mockUseTranslations = useTranslations as jest.Mock;

  beforeEach(() => {
    mockUseTranslations.mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        title: 'Welcome to the Home Page',
        subtitle: 'This is the subtitle',
        welcomeHeader: 'Welcome',
        welcomeText: 'This is a sample text for the welcome section.'
      };
      return translations[key];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title correctly', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Welcome to the Home Page'
    );
  });

  it('renders the subtitle correctly', () => {
    render(<HomePage />);

    expect(screen.getByText('This is the subtitle')).toBeInTheDocument();
  });

  it('renders the welcome header and text correctly', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Welcome'
    );
    expect(
      screen.getByText('This is a sample text for the welcome section.')
    ).toBeInTheDocument();
  });
});

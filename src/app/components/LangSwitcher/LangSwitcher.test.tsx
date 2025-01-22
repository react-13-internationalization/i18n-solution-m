import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LangSwitcher from './LangSwitcher';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

// Mocking the necessary hooks
jest.mock('next-intl', () => ({
  useLocale: jest.fn()
}));

jest.mock('@/i18n/routing', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: jest.fn()
}));

describe('LangSwitcher Component', () => {
  const mockReplace = jest.fn();
  const mockUseLocale = useLocale as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseLocale.mockReturnValue('en');
    mockUseRouter.mockReturnValue({ replace: mockReplace });

    (useTransition as jest.Mock).mockImplementation(() => [
      false,
      (fn) => fn()
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with the correct caption', () => {
    render(<LangSwitcher caption="Change Language" />);

    expect(screen.getByText('Change Language')).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('en');
  });

  it('changes language and calls router.replace', async () => {
    render(<LangSwitcher caption="Change Language" />);

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'uk');

    expect(select).toHaveValue('uk');
  });
});

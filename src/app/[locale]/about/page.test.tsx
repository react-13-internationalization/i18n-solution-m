import { render, screen } from '@testing-library/react';
import About from './page';
import { useTranslations } from 'next-intl';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn()
}));

describe('About Component', () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockImplementation((namespace) => {
      if (namespace === 'About') {
        return (key) => {
          const translations = {
            aboutUs: 'About Us',
            mission: 'Our mission is to provide the best service.',
            ourStory: 'Our Story',
            storyDescription: 'We started our journey in 2020.',
            values: 'Our Values',
            valuesDescription: 'Integrity, Commitment, and Excellence.',
            contact: 'Contact Us',
            contactInfo: 'You can reach us at contact@example.com.'
          };
          return translations[key];
        };
      }
      return (key) => key;
    });
  });

  it('renders correctly with English translations', () => {
    render(<About />);

    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(
      screen.getByText('Our mission is to provide the best service.')
    ).toBeInTheDocument();
    expect(screen.getByText('Our Story')).toBeInTheDocument();
    expect(
      screen.getByText('We started our journey in 2020.')
    ).toBeInTheDocument();
    expect(screen.getByText('Our Values')).toBeInTheDocument();
    expect(
      screen.getByText('Integrity, Commitment, and Excellence.')
    ).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(
      screen.getByText('You can reach us at contact@example.com.')
    ).toBeInTheDocument();
  });

  it('changes language and verifies translations', async () => {
    render(<About />);

    expect(screen.getByText('About Us')).toBeInTheDocument();

    (useTranslations as jest.Mock).mockImplementation((namespace) => {
      if (namespace === 'About') {
        return (key) => {
          const translations = {
            aboutUs: 'Про нас',
            mission: 'Наша місія — надати найкращий сервіс.',
            ourStory: 'Наша історія',
            storyDescription: 'Ми розпочали свою подорож у 2020 році.',
            values: 'Наші цінності',
            valuesDescription: 'Цілісність, Відданість та Відмінність.',
            contact: 'Контакт',
            contactInfo:
              'Ви можете зв’язатися з нами за адресою contact@example.com.'
          };
          return translations[key];
        };
      }
      return (key) => key;
    });

    render(<About />);

    expect(screen.getByText('Про нас')).toBeInTheDocument();
    expect(
      screen.getByText('Наша місія — надати найкращий сервіс.')
    ).toBeInTheDocument();
    expect(screen.getByText('Наша історія')).toBeInTheDocument();
    expect(
      screen.getByText('Ми розпочали свою подорож у 2020 році.')
    ).toBeInTheDocument();
    expect(screen.getByText('Наші цінності')).toBeInTheDocument();
    expect(
      screen.getByText('Цілісність, Відданість та Відмінність.')
    ).toBeInTheDocument();
    expect(screen.getByText('Контакт')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Ви можете зв’язатися з нами за адресою contact@example.com.'
      ),
    ).toBeInTheDocument();
  });
});

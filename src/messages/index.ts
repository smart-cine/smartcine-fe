import en from './en.json';
import vi from './vi.json';

export function getMessages(locale?: string) {
  switch (locale) {
    case 'en':
      return en;
    case 'vi':
      return vi;
    default:
      return vi;
  }
}

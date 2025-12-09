import { create } from 'storybook/theming';
import Color from '../src/constants/ColorV2';

export default create({
  base: 'light',
  colorSecondary: Color.surface.primary,
  fontBase: '"Poppins", sans-serif',
  textColor: Color.text.neutralHard,
  brandTitle: 'reactjs-components-v2',
  brandUrl: 'https://adoptaunabuelo.org',
  brandImage: 'https://adoptaunabuelo.org/wp-content/uploads/2020/08/AdoptaUnAbuelo-logo.svg',
});
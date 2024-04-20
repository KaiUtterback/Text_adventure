import { ThemeProvider } from 'styled-components';
import App from './App';
import theme from '../theme';

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

export default Root;

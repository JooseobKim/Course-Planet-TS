import { useEffect, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './redux';
import { FooterContainer, HeaderContainer } from './components/UI/organisms';
import Alert from './components/UI/organisms/Alert';
import Pages from './pages/Pages';
import theme from './utils/style/theme';
import reset from 'styled-reset';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { NotFound } from './components/templates';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Noto Sans KR', sans-serif;
  }

  main {
    min-height: calc(100vh - 185px);
    min-width: 380px;
  }

  a {
  text-decoration: none;

    &:hover {
      p,
      span,
      strong,
      b {
        text-decoration: underline;
      }
    }
  }

  strong {
    font-weight: 700;
  }
`;

const App = () => {
  const dispatch = useDispatch();

  const { refreshToken } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={NotFound}>
      <Router>
        <Alert />
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <HeaderContainer />
          <Pages />
          <FooterContainer />
        </ThemeProvider>
      </Router>
    </Suspense>
  );
};

export default App;

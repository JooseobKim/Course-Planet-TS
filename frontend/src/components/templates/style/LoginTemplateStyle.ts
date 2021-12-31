import GoogleLogin from 'react-google-login';
import { StyledLoginTemplateProps } from '../interfaces';
import { defaultCssStyle } from '../../../utils/interfaces';
import { displayCenter } from '../../../utils/style/styling';
import configStyle from '../../../utils/config/config.style';
import styled from 'styled-components';

export const StyledLoginTemplate = styled.main<StyledLoginTemplateProps>`
  padding: 30px 0;
  ${displayCenter}
  ${defaultCssStyle}

  .hr {
    position: relative;
    width: 100%;
    color: ${configStyle.gray};
    text-align: center;
    margin: 10px 0;

    span {
      text-align: center;
    }

    &::before {
      content: '';
      position: absolute;
      left: 25px;
      top: 0;
      bottom: 0;
      margin: auto 0;
      width: 39%;
      height: 0;
      border-top: 1px solid ${configStyle.gray};

      @media (max-width: 512px) {
        left: 0px;
        width: 43%;
      }
    }

    &::after {
      content: '';
      position: absolute;
      right: 25px;
      top: 0;
      bottom: 0;
      margin: auto 0;
      width: 39%;
      height: 0;
      border-top: 1px solid ${configStyle.gray};

      @media (max-width: 512px) {
        right: 0px;
        width: 43%;
      }
    }
  }
`;

export const StyledGoogleLoginBtn = styled(GoogleLogin)`
  width: 100%;
  justify-content: center;
  margin-bottom: 10px;

  span {
    display: flex;
    align-items: center;
  }
`;

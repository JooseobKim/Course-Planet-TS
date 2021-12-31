import styled, { css, CSSObject } from 'styled-components';

export const messageStyling = css`
  position: relative;
  z-index: 10;
  position: fixed;
  top: 70px;
  width: 100%;
  padding: 7px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
`;

export const StyledLoading = styled.div`
  z-index: 99999;
  position: fixed;
  background-color: #111;
  opacity: 0.8;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledMessage = styled.div`
  ${messageStyling}
  color: #00529b;
  background-color: #bde5f8;
`;

export const StyledSuccessMessage = styled.div`
  ${messageStyling}
  color: #dff2bf;
  background-color: #4f8a10;
`;

export const StyledErrMessage = styled.div`
  ${messageStyling}
  color: #ffd2d2;
  background-color: #d8000c;
`;

export const StyledCloseIcon = styled.div`
  position: absolute;
  right: 5px;
  cursor: pointer;
`;

export const defaultAlertTxtStyle: CSSObject = {
  fontWeight: 300,
  letterSpacing: '1.1px',
};

import { ModalFormProps } from '../interfaces';
import { defaultCssStyle } from '../../../../utils/interfaces';
import configStyle from '../../../../utils/config/config.style';
import styled from 'styled-components';

// eslint-disable-next-line prettier/prettier
export const StyledModalForm = styled.div<Pick<ModalFormProps, 'cssStyle' | 'modalHeight' | 'modalWidth'>>`
  [aria-hidden='true'] {
    display: none;
  }

  .modal-toggler:checked + .modal-container {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.5s;
  }

  .modal-container {
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    visibility: hidden;
    transform: translateX(-50%) translateY(-50%);
    transition: opacity 0.5s, visibility 0s linear 0.5s;
    z-index: 999;
  }

  .modal {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    width: ${({ modalWidth }) => modalWidth || '500px'};
    height: ${({ modalHeight }) => modalHeight || '500px'};
    transform: translateX(-50%) translateY(-50%);
    background-color: ${configStyle.white};

    @media (max-width: 512px) {
      width: 95vw;
    }
  }

  ${defaultCssStyle}
`;

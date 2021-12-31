import { CSSObject } from 'styled-components';

export const dropdownReviewContentTxtStyle: CSSObject = {
  display: 'inline-block',
  padding: '10px 14px',
  width: '100px',
  textAlign: 'center',
  opacity: 0.9,
  ':hover': {
    opacity: 1,
  },
};

export const dropdownPositioin: CSSObject = {
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translateY(-5px)',
};

import styled from 'styled-components';
import configStyle from '../../../../utils/config/config.style';
import { defaultCssStyle } from '../../../../utils/interfaces';
import { DropdownProps } from '../interfaces';

export const StyledDropdown = styled.div<Pick<DropdownProps, 'cssStyle'>>`
  .menu {
    display: block;
    z-index: 999999;
    cursor: pointer;
  }
  .menu li {
    display: inline-block;
    position: relative;
  }
  .menu li.dropdown:hover > .submenu {
    display: block;
  }
  .menu li div {
    display: block;
    background: transparent;
  }

  .menu .submenu {
    display: none;
  }
  .submenu {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    border-radius: 3px;
    opacity: 1;
    list-style-type: none;
  }
  .submenu li {
    display: block;
  }
  .submenu li div {
    display: block;
    background-color: ${configStyle.white};
    color: ${configStyle.black};
    margin-bottom: 2px;
    box-shadow: ${configStyle.boxShadow2};
  }
  ${defaultCssStyle}
`;

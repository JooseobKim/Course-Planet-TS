import { DropdownProps } from './interfaces';
import { StyledDropdown } from './styles';

const Dropdown = (props: DropdownProps) => {
  const { dropdownIcon, submenuList, cssStyle } = props;

  return (
    <StyledDropdown cssStyle={cssStyle}>
      <ul className="menu">
        <li className="dropdown">
          <div>{dropdownIcon}</div>
          <ul className="submenu">
            {submenuList.map((submenu, idx) => (
              <li key={idx}>
                <div>{submenu}</div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </StyledDropdown>
  );
};

export default Dropdown;

import { SelectAtomProps } from './interfaces';
import { StyledSelectAtom } from './style';

const SelectAtom = (props: SelectAtomProps) => {
  // eslint-disable-next-line prettier/prettier
  const { children, optionValue, optionProps, cssStyle } = props;

  return (
    <StyledSelectAtom cssStyle={cssStyle} {...props}>
      {optionValue?.map((item, index: number) => (
        <option key={index} value={item.value} {...optionProps}>
          {item.text}
        </option>
      ))}
      {children}
    </StyledSelectAtom>
  );
};

export default SelectAtom;

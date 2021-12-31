import { LabelAtomProps as LabelProps } from './interfaces';
import { StyledLabelAtom as StyledLabel } from './style';

const LabelAtom = (props: LabelProps) => {
  const { htmlFor, className, children, center, column, cssStyle } = props;

  return (
    <StyledLabel
      htmlFor={htmlFor}
      className={className}
      center={center}
      column={column}
      cssStyle={cssStyle}
    >
      {children}
    </StyledLabel>
  );
};

export default LabelAtom;

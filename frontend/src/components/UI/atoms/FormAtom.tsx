import { FormAtomProps } from './interfaces';
import { StyledFormAtom } from './style';

const FormAtom = (props: FormAtomProps) => {
  const { cssStyle, displayColumn, onSubmit, children } = props;

  return (
    <StyledFormAtom
      displayColumn={displayColumn}
      onSubmit={onSubmit}
      cssStyle={cssStyle}
    >
      {children}
    </StyledFormAtom>
  );
};

export default FormAtom;

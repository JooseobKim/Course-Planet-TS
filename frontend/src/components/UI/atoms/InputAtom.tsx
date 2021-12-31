import { forwardRef } from 'react';
import { LabelProps, InputProps } from './interfaces';
import { StyledInput, StyledLabel } from './style';

const Label = (props: LabelProps) => {
  const { htmlFor, children } = props;

  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

const InputAtom = forwardRef((props: InputProps, ref: InputProps['ref']) => {
  const { id, labelText } = props;

  return (
    <>
      {labelText && <Label htmlFor={id as string}>{labelText}</Label>}
      <StyledInput {...props} ref={ref} />
    </>
  );
});

export default InputAtom;

import { TextareaAtomProps } from './interfaces';
import { StyledTextareaAtom } from './style';

const TextareaAtom = (props: TextareaAtomProps) => {
  return <StyledTextareaAtom {...props} />;
};

export default TextareaAtom;

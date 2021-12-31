import { DisplayFlexAtomProps } from './interfaces';
import { StyledDisplayFlexAtom } from './style';

const DisplayFlexAtom = (props: DisplayFlexAtomProps) => {
  const { children } = props;

  return <StyledDisplayFlexAtom {...props}>{children}</StyledDisplayFlexAtom>;
};

export default DisplayFlexAtom;

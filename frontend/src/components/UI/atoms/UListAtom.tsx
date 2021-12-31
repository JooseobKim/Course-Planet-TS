import { DefaultProps } from '../../../utils/interfaces';
import { StyledUList } from './style/UListAtomStyle';

const UListAtom = (props: DefaultProps) => {
  const { children, cssStyle } = props;

  return <StyledUList cssStyle={cssStyle}>{children}</StyledUList>;
};

export default UListAtom;

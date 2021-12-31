import { DefaultProps } from '../../../utils/interfaces';
import { StyledList } from './style';

const ListAtom = (props: DefaultProps) => {
  const { cssStyle, children } = props;

  return <StyledList cssStyle={cssStyle}>{children}</StyledList>;
};

export default ListAtom;

import { TextAtom } from '../UI/atoms';
import { DefaultProps } from '../../utils/interfaces';
import { StyledNotFoundTemplate } from './style';

const NotFoundTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;

  return (
    <StyledNotFoundTemplate cssStyle={cssStyle}>
      <TextAtom tag="span" text="존재하지 않는 페이지입니다." />
    </StyledNotFoundTemplate>
  );
};

export default NotFoundTemplate;

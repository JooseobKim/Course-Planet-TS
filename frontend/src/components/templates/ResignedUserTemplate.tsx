import { TextAtom } from '../UI/atoms';
import { StyledResignedUserTemplate } from './style';
import { DefaultProps } from '../../utils/interfaces';

const ResignedUserTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;

  return (
    <StyledResignedUserTemplate cssStyle={cssStyle}>
      <TextAtom tag="span" text="탈퇴 유저입니다." />
    </StyledResignedUserTemplate>
  );
};

export default ResignedUserTemplate;

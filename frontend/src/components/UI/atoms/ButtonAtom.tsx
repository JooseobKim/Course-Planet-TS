import { ButtonProps } from './interfaces';
import { StyledButton } from './style';

const ButtonAtom = (props: ButtonProps) => {
  const { type, disabled, activeBtn, onClick, cssStyle, children } = props;

  return (
    <StyledButton
      type={type}
      disabled={Boolean(disabled)}
      activeBtn={activeBtn}
      onClick={onClick}
      cssStyle={cssStyle}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default ButtonAtom;

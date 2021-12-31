import { LinkProps } from './interfaces';
import { StyledLink } from './style';

const LinkAtom = (props: LinkProps) => {
  const { src, cssStyle, children } = props;

  return (
    <StyledLink href={src} cssStyle={cssStyle}>
      {children}
    </StyledLink>
  );
};

export default LinkAtom;

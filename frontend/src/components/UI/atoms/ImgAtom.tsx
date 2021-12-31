import { ImgProps } from './interfaces';
import { StyledImg } from './style/ImgAtomStyle';

const ImgAtom = (props: ImgProps) => {
  return <StyledImg {...props} />;
};

export default ImgAtom;

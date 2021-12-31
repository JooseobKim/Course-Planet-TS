import { Link, useLocation } from 'react-router-dom';
import { ButtonAtom, TextAtom, ListAtom, UListAtom } from '../atoms';
import { DefaultProps } from '../../../utils/interfaces';
import configStyle from '../../../utils/config/config.style';

const HeaderCenter = (props: DefaultProps) => {
  const { cssStyle } = props;
  const location = useLocation();
  const path = location.pathname;

  return (
    <UListAtom cssStyle={cssStyle}>
      <ListAtom>
        <Link to="/" onClick={() => window.scrollTo({ top: 0 })}>
          <ButtonAtom
            cssStyle={{
              backgroundColor:
                path === '/' ? configStyle.mainLightColor : configStyle.white,
              borderRadius: '10px',
              '@media (max-width: 768px)': { padding: '8px 12px' },
            }}
          >
            <TextAtom tag="span" text="홈페이지" />
          </ButtonAtom>
        </Link>
      </ListAtom>
      <ListAtom>
        <Link to="/courses" onClick={() => window.scrollTo({ top: 0 })}>
          <ButtonAtom
            cssStyle={{
              backgroundColor:
                path === '/courses'
                  ? configStyle.mainLightColor
                  : configStyle.white,
              borderRadius: '10px',
              '@media (max-width: 768px)': { padding: '8px 12px' },
            }}
          >
            <TextAtom tag="span" text="강의" />
          </ButtonAtom>
        </Link>
      </ListAtom>
      <ListAtom>
        <Link to="/about" onClick={() => window.scrollTo({ top: 0 })}>
          <ButtonAtom
            cssStyle={{
              backgroundColor:
                path === '/about'
                  ? configStyle.mainLightColor
                  : configStyle.white,
              borderRadius: '10px',
              '@media (max-width: 768px)': { padding: '8px 12px' },
            }}
          >
            <TextAtom tag="span" text="소개" />
          </ButtonAtom>
        </Link>
      </ListAtom>
    </UListAtom>
  );
};

export default HeaderCenter;

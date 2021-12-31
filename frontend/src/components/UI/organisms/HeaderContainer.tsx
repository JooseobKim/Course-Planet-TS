import { ButtonAtom, TextAtom } from '../atoms';
import { HeaderCenter, HeaderRight } from '../molecules';
import { StyledHeaderContainer } from './styles';
import { Link } from 'react-router-dom';
import { HeaderMenu } from '.';

const HeaderContainer = () => {
  return (
    <StyledHeaderContainer>
      <nav>
        <Link to="/" onClick={() => window.scrollTo({ top: 0 })}>
          <ButtonAtom cssStyle={{ padding: 0, opacity: 1 }}>
            <TextAtom
              tag="h1"
              text="CoursePlanet"
              cssStyle={{
                fontSize: '20px',
                fontWeight: 500,
                letterSpacing: '-1.2px',
                '@media (max-width: 512px)': {
                  fontSize: '25px',
                },
              }}
            />
          </ButtonAtom>
        </Link>
      </nav>
      <nav>
        <HeaderCenter
          cssStyle={{ '@media (max-width: 512px)': { display: 'none' } }}
        />
      </nav>
      <div>
        <HeaderRight
          cssStyle={{ '@media (max-width: 512px)': { display: 'none' } }}
        />
      </div>
      <HeaderMenu />
    </StyledHeaderContainer>
  );
};

export default HeaderContainer;

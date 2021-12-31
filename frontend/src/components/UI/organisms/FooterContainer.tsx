// eslint-disable-next-line prettier/prettier
import { DisplayFlexAtom, ListAtom, TextAtom, UListAtom } from '../atoms';
import { defaultTextStyle, StyledFooterContainer } from './styles';
import { FaPhoneAlt } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import ContactMeModal from './ContactMeModal';

const FooterContainer = () => {
  return (
    <StyledFooterContainer>
      <ContactMeModal />
      <DisplayFlexAtom
        displayColumn={true}
        displayCenter={true}
        cssStyle={{
          '@media (max-width: 768px)': { margin: '10px 0 15px' },
        }}
      >
        <TextAtom
          tag="span"
          text="Sitemap"
          cssStyle={{ fontWeight: 500, letterSpacing: '1px' }}
        />
        <UListAtom
          cssStyle={{
            flexDirection: 'column',
            marginTop: '7px',
            alignItems: 'center',
          }}
        >
          <ListAtom>
            <TextAtom
              tag="span"
              text="Courses"
              cssStyle={{ ...defaultTextStyle }}
            />
          </ListAtom>
          <ListAtom cssStyle={{ margin: '5px 0' }}>
            <TextAtom
              tag="span"
              text="Community"
              cssStyle={{ ...defaultTextStyle }}
            />
          </ListAtom>
          <ListAtom>
            <TextAtom
              tag="span"
              text="About Us"
              cssStyle={{ ...defaultTextStyle }}
            />
          </ListAtom>
        </UListAtom>
      </DisplayFlexAtom>
      <DisplayFlexAtom
        displayColumn={true}
        cssStyle={{
          alignItems: 'flex-end',
          '@media (max-width: 768px)': { alignItems: 'center' },
        }}
      >
        <DisplayFlexAtom>
          <FaPhoneAlt />
          <TextAtom
            tag="span"
            text="010 - 0000 - 0000"
            cssStyle={{ ...defaultTextStyle, marginLeft: '5px' }}
          />
        </DisplayFlexAtom>
        <DisplayFlexAtom cssStyle={{ margin: '7px 0 15px' }}>
          <GrMail />
          <TextAtom
            tag="span"
            text="josephkim42@naver.com"
            cssStyle={{ ...defaultTextStyle, marginLeft: '5px' }}
          />
        </DisplayFlexAtom>
        <DisplayFlexAtom>
          <TextAtom
            tag="span"
            text="&copy; 2021 CoursePlanet. All Rights Reserved"
            cssStyle={{ ...defaultTextStyle }}
          />
        </DisplayFlexAtom>
      </DisplayFlexAtom>
    </StyledFooterContainer>
  );
};

export default FooterContainer;

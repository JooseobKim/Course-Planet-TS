import { DisplayFlexAtom, TextAtom } from '../UI/atoms';
// eslint-disable-next-line prettier/prettier
import { defaultHeadingStyle, defaultLayoutStyle, defaultParagraphStyle, StyledAboutTemplate } from './style';
import { DefaultProps } from '../../utils/interfaces';

const AboutTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;

  return (
    <StyledAboutTemplate cssStyle={cssStyle}>
      <DisplayFlexAtom displayColumn={true} cssStyle={defaultLayoutStyle}>
        <TextAtom
          tag="h2"
          text="[리팩토링 버전] CoursePlaet 사이트 소개"
          cssStyle={defaultHeadingStyle}
        />
        <TextAtom
          tag="p"
          text="인프런과 패스트캠퍼스 사이트에 기재되어 있는 인터넷 강의들을 관리자 계정으로 스크래핑하여 강의 데이터를 저장한 후 유저들이 리뷰를 작성할 수 있는 사이트입니다."
          cssStyle={defaultParagraphStyle}
        />
        <TextAtom
          tag="h4"
          text="리팩토링 버전"
          cssStyle={defaultHeadingStyle}
        />
        <TextAtom
          tag="p"
          text="리팩토링 버전은 기존에 작성된 코드를 정리하고, JavaScript, JSX 문법으로 작성된 파일들을 TypeScript, TSX 파일로 변환을 하였습니다. 백엔드와 프론트엔드 로직은 자잘한 변화가 있었으나 전체적인 큰 틀은 동일합니다."
          cssStyle={defaultParagraphStyle}
        />
        <TextAtom
          tag="h4"
          text="리팩토링 개선점"
          cssStyle={defaultHeadingStyle}
        />
        <TextAtom
          tag="p"
          text="TypeScript를 배우고 해당 프로젝트를 TypeScript로 변환하는 경험을 하며 TypeScript 언어에 한 발자국 더 익숙해지는 시간을 가질 수 있었습니다. 또한 기존에 작성했던 코드는 구현에만 초점을 맞추어 개발을 하였기 때문에 리액트를 사용하기 이전에 기대했던 컴포넌트 재사용성을 체감하지 못한 아쉬움이 있었습니다. 그러나 JS, JSX 파일을 TS, TSX 파일로 변환하는 과정에서 리액트를 사용하기 이전에 기대했던 재사용성을 위해 컴포넌트들을 분리하고 작성할 수 있을 것이라고 생각을 하였습니다. 그래서 아토믹 디자인이라는 시스템을 도입하기로 하였고 최대한 이에 맞추어 리팩토링을 진행하며, 결론적으로 기존에 작성했던 코드보다 개선된 재사용성을 체감할 수 있었습니다. 추가적으로 기존에는 불필요하게 렌더링되는 성능 부분에 대해서 신경쓰지 못하였으나, 리팩토링을 거치며 state, prop 업데이트나 부모 컴포넌트 렌더링과 같은 상황에 생기는 불필요한 렌더링을 인지하고 방지하기 위해 구조를 바꾸어 렌더링을 최소화하는 경험도 할 수 있었습니다."
          cssStyle={defaultParagraphStyle}
        />
      </DisplayFlexAtom>
      <DisplayFlexAtom displayColumn={true} cssStyle={defaultLayoutStyle}>
        <TextAtom
          tag="h2"
          text="Course Planet 백엔드, 프론트엔드 소개"
          cssStyle={{ ...defaultHeadingStyle, margin: '10px 0' }}
        />
        <DisplayFlexAtom
          cssStyle={{
            '@media (max-width: 512px)': { flexDirection: 'column' },
          }}
        >
          <DisplayFlexAtom
            displayColumn={true}
            cssStyle={{
              flex: 1,
              '@media (min-width: 768px)': { marginRight: '10px' },
            }}
          >
            <TextAtom
              tag="h4"
              text="백엔드 소개"
              cssStyle={defaultHeadingStyle}
            />
            <TextAtom
              tag="p"
              text="백엔드의 경우 Node.js 환경을 기반으로 서버는 Express 프레임워크를 사용하였고, 데이터베이스는 Mongoose(MongoDB) 라이브러리를 사용하였습니다. 백엔드 로직은 REST API로 작성되었습니다."
              cssStyle={defaultParagraphStyle}
            />
          </DisplayFlexAtom>
          <DisplayFlexAtom displayColumn={true} cssStyle={{ flex: 1 }}>
            <TextAtom
              tag="h4"
              text="프론트엔드 소개"
              cssStyle={defaultHeadingStyle}
            />
            <TextAtom
              tag="p"
              text="프론트엔드의 경우 React 라이브러리와 Redux 상태관리 라이브러리 및 비동기 작업을 위한 redux-thunk 미들웨어를 사용하였습니다."
              cssStyle={defaultParagraphStyle}
            />
          </DisplayFlexAtom>
        </DisplayFlexAtom>
      </DisplayFlexAtom>
      <DisplayFlexAtom displayColumn={true} cssStyle={defaultLayoutStyle}>
        <TextAtom
          tag="h2"
          text="Course Planet 사이트 개발 이유"
          cssStyle={defaultHeadingStyle}
        />
        <DisplayFlexAtom
          cssStyle={{
            '@media (max-width: 768px)': { flexDirection: 'column' },
          }}
        >
          <DisplayFlexAtom
            displayColumn={true}
            cssStyle={{
              '@media (min-width: 768px)': { marginRight: '10px', flex: 1 },
            }}
          >
            <TextAtom
              tag="h4"
              text="인프런을 이용하며 개인적으로 아쉬웠던 부분"
              cssStyle={defaultHeadingStyle}
            />
            <TextAtom
              tag="p"
              text="인프런은 개인이 강의를 제작하고 판매하는 온라인 강의 플랫폼입니다. 인프런 사이트의 평점 서비스의 경우 강의의 수강생들이 대채적으로 4~5점의 고평가만 남기는 경향이 있습니다."
              cssStyle={defaultParagraphStyle}
            />
          </DisplayFlexAtom>
          <DisplayFlexAtom
            displayColumn={true}
            cssStyle={{
              '@media (min-width: 768px)': { flex: 1 },
            }}
          >
            <TextAtom
              tag="h4"
              text="패스트캠퍼스를 이용하며 개인적으로 아쉬웠던 부분"
              cssStyle={defaultHeadingStyle}
            />
            <TextAtom
              tag="p"
              text="패스트캠퍼스 사이트의 경우에는 평점 서비스 자체가 존재하지 않습니다. 인프런과는 다르게 패스트캠퍼스에서 직접 강의자를 섭외하고 제작한 후 홍보를 하는 것으로 예상됩니다. 다만, 마케팅의 일환으로서 강의에 대한 부정적 평가 자체를 배제하고 판매량을 높이기 위해 평점 서비스 자체를 도입하지 않은 것으로 보입니다."
              cssStyle={defaultParagraphStyle}
            />
          </DisplayFlexAtom>
        </DisplayFlexAtom>
        <TextAtom
          tag="h4"
          text="아쉬웠던 부분에 대한 개선방안"
          cssStyle={defaultHeadingStyle}
        />
        <TextAtom
          tag="p"
          text="일반적으로 고평가만 남기기 때문에 강의에 대한 변별력이 떨어지는 인프런과 평점 시스템 자체를 도입하지 않아 강의를 구입하기 전 사전 판단 자체가 불가능한 패스트캠퍼스와 분리되어 자유롭게 평점을 공유할 수 있는 분위기가 조성된 평점 사이트가 필요하다고 느꼈습니다. 그래서 만들게 된 웹 사이트가 Course Planet입니다."
          cssStyle={defaultParagraphStyle}
        />
      </DisplayFlexAtom>
    </StyledAboutTemplate>
  );
};

export default AboutTemplate;

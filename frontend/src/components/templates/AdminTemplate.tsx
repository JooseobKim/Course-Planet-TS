import { ScrapingData } from '../UI/molecules';
import { ScrapingDataSaveContainer } from '../UI/organisms';
import { defaultScrapingDataStyle, StyledAdminTemplate } from './style';
import { DefaultProps } from '../../utils/interfaces';

const AdminTemplate = (props: DefaultProps) => {
  const { cssStyle } = props;

  return (
    <StyledAdminTemplate cssStyle={cssStyle}>
      <ScrapingData
        platform="inflearn"
        cssStyle={{ ...defaultScrapingDataStyle }}
      />
      <ScrapingDataSaveContainer platform="inflearn" />
      <ScrapingData
        platform="fastcampus"
        cssStyle={{ marginTop: '10px', ...defaultScrapingDataStyle }}
      />
      <ScrapingDataSaveContainer platform="fastcampus" />
    </StyledAdminTemplate>
  );
};

export default AdminTemplate;

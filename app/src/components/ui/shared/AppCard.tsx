import {Card} from '@mui/material';
import {useCustomizerStore} from '@stores/customizerStore';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AppCard = ({children}: Props) => {
  // const customizer = useSelector((state: AppState) => state.customizer);
  const isCardShadow = useCustomizerStore((state) => state.isCardShadow);
  return (
      <Card
          sx={{display: 'flex', p: 0}}
          elevation={isCardShadow ? 9 : 0}
          variant={!isCardShadow ? 'outlined' : undefined}
      >
        {children}
      </Card>
  );
};

export default AppCard;

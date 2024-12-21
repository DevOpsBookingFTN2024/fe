import {Card, CardHeader, CardContent, Divider} from '@mui/material';
import {useCustomizerStore} from '@stores/customizerStore';

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

const BaseCard = ({title, children}: Props) => {
  // const customizer = useSelector((state: AppState) => state.customizer);
  const isCardShadow = useCustomizerStore((state) => state.isCardShadow);

  return (
      <Card
          sx={{padding: 0}}
          elevation={isCardShadow ? 9 : 0}
          variant={!isCardShadow ? 'outlined' : undefined}
      >
        <CardHeader title={title}/>
        <Divider/>
        <CardContent>{children}</CardContent>
      </Card>
  );
};

export default BaseCard;

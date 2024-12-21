import {useTheme} from '@mui/material/styles';
import {Card, CardHeader, CardContent, Divider, Box} from '@mui/material';
import {useCustomizerStore} from '@stores/customizerStore';

type Props = {
  title: string;
  footer?: string | JSX.Element;
  children: JSX.Element;
};

const ParentCard = ({title, children, footer}: Props) => {
  // const customizer = useSelector((state: AppState) => state.customizer);
  const isCardShadow = useCustomizerStore((state) => state.isCardShadow);

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
      <Card
          sx={{
            padding: 0,
            border: !isCardShadow ? `1px solid ${borderColor}` : 'none',
          }}
          elevation={isCardShadow ? 9 : 0}
          variant={!isCardShadow ? 'outlined' : undefined}
      >
        <CardHeader title={title}/>
        <Divider/>

        <CardContent>{children}</CardContent>
        {footer ? (
            <>
              <Divider/>
              <Box p={3}>{footer}</Box>
            </>
        ) : (
            ''
        )}
      </Card>
  );
};

export default ParentCard;

import {FC} from "react";
import {Link} from "react-router-dom";
import LogoLight from "/src/assets/images/logos/light-logo.svg?react";
import {styled} from "@mui/material";
import {useCustomizerStore} from "@stores/customizerStore";

const Logo: FC = () => {
  const customizer = useCustomizerStore();
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? "40px" : "180px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  }));

  return (
      <LinkStyled to="/">
        <LogoLight/>
      </LinkStyled>
  );
};

export default Logo;

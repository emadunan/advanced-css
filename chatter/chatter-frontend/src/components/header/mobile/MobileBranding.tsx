import ForumIcon from "@mui/icons-material/Forum";
import { Typography } from "@mui/material";
import router from "../../routes";

const MobileBranding = () => {
  return (
    <>
      <ForumIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        onClick={() => router.navigate("/")}
        component="a"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        CHATTER
      </Typography>
    </>
  );
};

export default MobileBranding;

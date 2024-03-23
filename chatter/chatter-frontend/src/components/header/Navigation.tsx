import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FC } from "react";
import { Page } from "../../interfaces/page.interface";
import router from "../router";

interface Props {
  pages: Page[];
}

const Navigation: FC<Props> = ({ pages }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.title}
            sx={{ my: 2, color: "white", display: "block" }}
            onClick={() => router.navigate(page.path)}
          >
            {page.title}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default Navigation;

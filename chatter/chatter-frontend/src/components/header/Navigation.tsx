import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FC } from "react";

interface Props {
  pages: string[];
}

const Navigation: FC<Props> = ({ pages }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default Navigation;

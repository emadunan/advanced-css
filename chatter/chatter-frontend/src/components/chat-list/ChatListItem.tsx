import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Fragment } from "react/jsx-runtime";
import { FC } from "react";
import { Divider } from "@mui/material";

interface Props {
  imageUrl: string;
  username: string;
  primaryText: string;
  secondaryText: string;
}

const ChatListItem: FC<Props> = ({
  imageUrl,
  username,
  primaryText,
  secondaryText,
}) => {
  return (
    <Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={username} src={imageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={primaryText}
          secondary={
            <Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {secondaryText}
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </Fragment>
  );
};

export default ChatListItem;

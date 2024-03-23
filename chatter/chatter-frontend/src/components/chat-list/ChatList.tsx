import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChatListItem from "./ChatListItem";
import { Stack } from "@mui/material";
import ChatListHeader from "./ChatListHeader";

const ChatList = () => {
  return (
    <Stack>
      <ChatListHeader />
      <Divider />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
        <ChatListItem
          imageUrl="/"
          key={"1"}
          username="emad"
          primaryText="Hi there"
          secondaryText="dslkdk dskfdsf ddf l sdfdflk dfjsdlfjsl"
        />
      </List>
    </Stack>
  );
};

export default ChatList;

import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Drawer from "@mui/joy/Drawer";
import { RxAvatar } from "react-icons/rx";
import ModalClose from "@mui/joy/ModalClose";
import { RiMenuFill } from "react-icons/ri";
import { MdCardGiftcard } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { List, ListItem, ListItemButton } from "@mui/joy";
export default function DrawerCloseButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        <RiMenuFill />
      </Button>
      <Drawer
        size="sm"
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalClose />
        <Box sx={{ p: 2 }}>
          <List>
            <ListItem>
              <ListItemButton>
                <div className="flex justify-center items-center gap-2">
                  <RxAvatar size={20} />
                  <div>My Account</div>
                </div>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <div className="flex justify-center items-center gap-2">
                  <MdCardGiftcard size={20} />
                  <div>My Orders</div>
                </div>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <div className="flex justify-center items-center gap-2">
                  <MdCardGiftcard size={20} />
                  <div>Cart</div>
                </div>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                {" "}
                <div className="flex justify-center items-center gap-2">
                  <RiLogoutCircleLine size={20} />
                  <div>LogOut</div>
                </div>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

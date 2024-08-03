"use client";

import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { DialogTitle, ModalClose } from "@mui/joy";

import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";
import { Nunito } from "next/font/google";

const auth = getAuth(app);

type Props = {};

const font = Nunito({
	subsets: ["latin"],
});

const MenuBar = (props: Props) => {
	const [open, setOpen] = useState(false);

	const toggleDrawer =
		(inOpen: boolean) =>
		(event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setOpen(inOpen);
		};

	const logOut = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
			});
	};

	return (
		<Box sx={{ display: "flex" }}>
			<Button
				variant="outlined"
				color="neutral"
				onClick={toggleDrawer(true)}
				className="bg-slate-800 text-white py-2 px-4 hover:bg-white hover:text-slate-800 hover:border-2 hover:border-slate-800 transition-all duration-150"
			>
				Menu
			</Button>
			<Drawer open={open} onClose={toggleDrawer(false)} size="sm">
				<ModalClose />
				<p className={`${font.className} text-2xl font-bold`}>Munch Maestro</p>
				<Box
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
				>
					<List>
						{["All Items", "Recipes"].map(
							(text) => (
								<ListItem key={text}>
									<ListItemButton>{text}</ListItemButton>
								</ListItem>
							)
						)}
					</List>
					<Divider />
					{/* <List>
						{["All mail", "Trash", "Logout"].map((text) => (
							<ListItem key={text}>
								<ListItemButton>{text}</ListItemButton>
							</ListItem>
						))}
					</List> */}
          <List>
            <ListItem>
              <ListItemButton onClick={logOut}>Logout</ListItemButton>
            </ListItem>
          </List>
				</Box>
			</Drawer>
		</Box>
	);
};

export default MenuBar;

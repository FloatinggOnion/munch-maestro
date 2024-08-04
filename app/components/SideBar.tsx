"use client";

import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FoodBankTwoTone } from "@mui/icons-material";
import Tooltip from "@mui/joy/Tooltip";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { closeSidebar } from "../utils";
import { signOut } from "firebase/auth";
import { font } from "@/lib/font";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

function Toggler({
	defaultExpanded = false,
	renderToggle,
	children,
}: {
	defaultExpanded?: boolean;
	children: React.ReactNode;
	renderToggle: (params: {
		open: boolean;
		setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	}) => React.ReactNode;
}) {
	const [open, setOpen] = React.useState(defaultExpanded);
	return (
		<React.Fragment>
			{renderToggle({ open, setOpen })}
			<Box
				sx={{
					display: "grid",
					gridTemplateRows: open ? "1fr" : "0fr",
					transition: "0.2s ease",
					"& > *": {
						overflow: "hidden",
					},
				}}
			>
				{children}
			</Box>
		</React.Fragment>
	);
}

interface Error {
	code: string;
	message: string;
}

export default function Sidebar() {
	const [error, setError] = useState<Error>();
	const router = useRouter();

	const { user, loading } = useAuth();

	const logOut = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				alert("Log out successful");
				router.push("/login");
			})
			.catch((error) => {
				// An error happened.
				setError({ code: error.code, message: error.message });
			});
	};

	return (
		<Sheet
			className="Sidebar"
			sx={{
				position: { xs: "fixed", md: "sticky" },
				transform: {
					xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
					md: "none",
				},
				transition: "transform 0.4s, width 0.4s",
				zIndex: 10000,
				height: "100dvh",
				width: "var(--Sidebar-width)",
				top: 0,
				p: 2,
				flexShrink: 0,
				display: "flex",
				flexDirection: "column",
				gap: 8,
				borderRight: "1px solid",
				borderColor: "divider",
			}}
		>
			<GlobalStyles
				styles={(theme) => ({
					":root": {
						"--Sidebar-width": "220px",
						[theme.breakpoints.up("lg")]: {
							"--Sidebar-width": "240px",
						},
					},
				})}
			/>
			<Box
				className="Sidebar-overlay"
				sx={{
					position: "fixed",
					zIndex: 9998,
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					opacity: "var(--SideNavigation-slideIn)",
					backgroundColor: "var(--joy-palette-background-backdrop)",
					transition: "opacity 0.4s",
					transform: {
						xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
						lg: "translateX(-100%)",
					},
				}}
				onClick={() => closeSidebar()}
			/>
			<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
				<IconButton variant="soft" color="primary" size="sm">
					{/* <BrightnessAutoRoundedIcon /> */}
					<FoodBankTwoTone />
				</IconButton>
				<h2 className={`${font.className} font-semibold`}>
					Munch Maestro
				</h2>
			</Box>
			{/* <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" /> */}
			<Box
				sx={{
					minHeight: 0,
					overflow: "hidden auto",
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					[`& .${listItemButtonClasses.root}`]: {
						gap: 1.5,
					},
				}}
			>
				<List
					size="sm"
					sx={{
						gap: 1,
						"--List-nestedInsetStart": "30px",
						"--ListItem-radius": (theme) => theme.vars.radius.sm,
					}}
				>
					<Link href="/">
						<ListItem>
							<ListItemButton>
								<HomeRoundedIcon />
								<ListItemContent>
									<Typography level="title-sm">
										Home
									</Typography>
								</ListItemContent>
							</ListItemButton>
						</ListItem>
					</Link>

					<Link href="/recipes">
						<ListItem>
							<ListItemButton>
								<DashboardRoundedIcon />
								<ListItemContent>
									<Typography level="title-sm">
										Recipes
									</Typography>
								</ListItemContent>
							</ListItemButton>
						</ListItem>
					</Link>

					{/* <ListItem>
            <ListItemButton selected>
              <ShoppingCartRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Orders</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}

					{/* <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Tasks</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>All tasks</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Backlog</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>In progress</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Done</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem> */}

					{/* <ListItem nested>
						<Toggler
							renderToggle={({ open, setOpen }) => (
								<ListItemButton onClick={() => setOpen(!open)}>
									<GroupRoundedIcon />
									<ListItemContent>
										<Typography level="title-sm">
											User
										</Typography>
									</ListItemContent>
									<KeyboardArrowDownIcon
										sx={{
											transform: open
												? "rotate(180deg)"
												: "none",
										}}
									/>
								</ListItemButton>
							)}
						>
							<List sx={{ gap: 0.5 }}>
								<ListItem sx={{ mt: 0.5 }}>
									<ListItemButton
										role="menuitem"
										component="a"
										href="/joy-ui/getting-started/templates/profile-dashboard/"
									>
										My profile
									</ListItemButton>
								</ListItem>
							</List>
						</Toggler>
					</ListItem> */}
				</List>
			</Box>
			<Divider />
			<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
				<IconButton
					size="sm"
					variant="outlined"
					color="neutral"
				>
					{user?.email?.[0]?.toUpperCase()}
				</IconButton>
				{/* <Box sx={{ minWidth: 0, flex: 1 }}> */}
					{/* <Typography level="title-sm">
						{user?.displayName}
					</Typography> */}
					<Typography level="body-xs">{user?.email}</Typography>
				{/* </Box> */}
			</Box>
				<Tooltip
					title="Sign out"
					variant="plain"
					size="md"
					placement="right"
					arrow
				>
					<IconButton
						size="sm"
						variant="plain"
						color="neutral"
						onClick={logOut}
					>
						<LogoutRoundedIcon />
					</IconButton>
				</Tooltip>
		</Sheet>
	);
}

"use client";

import { useState, useEffect, useMemo } from "react";

import {
	Box,
	Breadcrumbs,
	Typography,
	Link as JoyLink,
	CssVarsProvider,
	CssBaseline,
	Button,
	Stack,
	TextField,
	Modal,
	Input,
	IconButton,
	Select,
	Option,
} from "@mui/joy";
import { Add, HourglassEmpty, Remove } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import ErrorIcon from '@mui/icons-material/Error';

import OrderTable from "../components/OrderTable";
import OrderList from "../components/OrderList";

import { font } from "@/lib/font";
import { firestore } from "@/lib/firebase";
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	deleteDoc,
	getDoc,
	where,
} from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

interface Inventory {
	id: string;
	userId: string | undefined;
	date: Date;
	itemName: string;
	quantity: number;
}

export default function Home() {
	const [inventory, setInventory] = useState<Inventory[]>([]);
	const [open, setOpen] = useState(false);
	const [itemName, setItemName] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const { user, loading } = useAuth();

	const handleChangePage = (newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (newRowsPerPage: number) => {
		setRowsPerPage(newRowsPerPage);
		setPage(1);
	};

	const filteredInventory = useMemo(() => {
		return inventory.filter(item => {
		  const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
		  const matchesStatus = 
			statusFilter === "all" ||
			(statusFilter === "low" && item.quantity <= 2) ||
			(statusFilter === "medium" && item.quantity > 2 && item.quantity < 5) ||
			(statusFilter === "high" && item.quantity >= 5);
		  
		  return matchesSearch && matchesStatus;
		});
	  }, [inventory, searchTerm, statusFilter]);

	const paginatedInventory = inventory.slice(
		(page - 1) * rowsPerPage,
		page * rowsPerPage
	);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleStatusFilter = (
		event: React.SyntheticEvent | null,
		newValue: string | null
	  ) => {
		if (newValue !== null) {
			console.log(newValue);
		  setStatusFilter(newValue);
		}
	  };


	const updateInventory = async () => {
		const userId = user?.uid;
		const q = query(collection(firestore, "inventory"), where("userId", "==", userId));
		const snapshot = await getDocs(q);
		const inventoryList: Inventory[] = snapshot.docs.map((doc) => ({
			id: doc.id,
			userId: doc.data().userId,
			date: doc.data().date.toDate(),
			itemName: doc.data().itemName,
			quantity: doc.data().quantity,
		}));
		setInventory(inventoryList);
	};

	useEffect(() => {
		updateInventory();
	}, []);

	const addItem = async (item: Inventory) => {
		const userId = user?.uid;
		const docRef = doc(firestore, "inventory", `${userId}_${item.itemName}`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const existingQuantity = docSnap.data().quantity;
			await setDoc(
				docRef,
				{
					userId: userId,
					itemName: item.itemName,
					quantity: existingQuantity + item.quantity,
					date: new Date(),
				},
				{ merge: true }
			);
		} else {
			await setDoc(docRef, {
				userId: userId,
				itemName: item.itemName,
				quantity: item.quantity,
				date: new Date(),
			});
		}
		await updateInventory();
	};

	const removeItem = async (item: Inventory): Promise<void> => {
		const userId = user?.uid;
		const docRef = doc(firestore, "inventory", `${userId}_${item.itemName}`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const existingQuantity = docSnap.data().quantity;
			if (existingQuantity <= 1) {
				await deleteDoc(docRef);
			} else {
				await setDoc(
					docRef,
					{
						quantity: existingQuantity - 1,
						date: new Date(),
					},
					{ merge: true }
				);
			}
		}
		await updateInventory();
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleAddItem = () => {
		const userId = user?.uid;
		addItem({
			id: itemName, // Use itemName as the id
			userId: userId, // Add the userId property
			date: new Date(),
			itemName,
			quantity,
		});
		setItemName("");
		setQuantity(0);
		handleClose();
	};

	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<Box sx={{ display: "flex", minHeight: "100vh" }}>
				{/* <Header /> */}
				{/* <Sidebar /> */}
				<Box
					component="main"
					className="MainContent"
					sx={{
						px: { xs: 2, md: 6 },
						pt: {
							xs: "calc(12px + var(--Header-height))",
							sm: "calc(12px + var(--Header-height))",
							md: 3,
						},
						pb: { xs: 2, sm: 2, md: 3 },
						flex: 1,
						display: "flex",
						flexDirection: "column",
						minWidth: 0,
						height: "100dvh",
						gap: 1,
					}}
				>
					<Box
						sx={{
							display: "flex",
							mb: 1,
							gap: 1,
							flexDirection: { xs: "column", sm: "row" },
							alignItems: { xs: "start", sm: "center" },
							flexWrap: "wrap",
							justifyContent: "space-between",
						}}
					>
						<Typography level="h2" component="h1">
							Pantry Items
						</Typography>
						<Button
							color="primary"
							startDecorator={<Add />}
							size="sm"
							onClick={handleOpen}
						>
							Add Item
						</Button>
					</Box>
					{/* Search and Filter UI */}
					<Box sx={{ display: "flex", gap: 2, mb: 2, mt: 15 }}>
						<Input
							placeholder="Search items"
							value={searchTerm}
							onChange={handleSearch}
							startDecorator={<SearchIcon />}
							fullWidth
						/>
						<Select
							value={statusFilter}
							onChange={handleStatusFilter}
							placeholder="Filter by status"
							className="w-[50%]"
						>
							<Option value="all">All</Option>
							<Option value="low">Low</Option>
							<Option value="medium">Medium</Option>
							<Option value="high">High</Option>
						</Select>
					</Box>
					{paginatedInventory.length > 0 && (<OrderTable
						rows={paginatedInventory}
						onClick={removeItem}
						page={page}
						rowsPerPage={rowsPerPage}
						totalItems={filteredInventory.length}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>)}
					{paginatedInventory.length > 0 && (<OrderList
						rows={paginatedInventory}
						page={page}
						rowsPerPage={rowsPerPage}
						totalItems={filteredInventory.length}
						onPageChange={handleChangePage}
						onClick={removeItem}
					/>)}
					{paginatedInventory.length === 0 && (
						<div className="flex flex-col w-[70vw] h-full items-center justify-center p-4 m-4">
							<ErrorIcon sx={{ fontSize: 60 }} />
							<p className="text-2xl text-neutral-500">Nothing to see here.</p>
						</div>
					)}
				</Box>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: { xs: "90%", sm: "60%", md: "40%" },
							bgcolor: "white",
							boxShadow: 24,
							p: 4,
							borderRadius: 20,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography
							id="modal-modal-title"
							component="h2"
							level="h4"
						>
							Add Item
						</Typography>
						<Stack
							width="100%"
							direction={"column"}
							spacing={4}
							justifyContent={"center"}
						>
							<Input
								variant="outlined"
								fullWidth
								value={itemName}
								placeholder="Item name"
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => setItemName(e.target.value)}
							/>
							<Stack
								width="100%"
								direction={"row"}
								spacing={2}
								justifyItems={"center"}
							>
								<IconButton
									aria-label="reduce quantity"
									variant="outlined"
									color="neutral"
									size="sm"
									onClick={() => setQuantity(quantity - 1)}
								>
									<Remove />
								</IconButton>
								<Input
									variant="outlined"
									value={quantity}
									fullWidth
								/>
								<IconButton
									aria-label="increase quantity"
									variant="outlined"
									color="neutral"
									size="sm"
									onClick={() => setQuantity(quantity + 1)}
								>
									<Add />
								</IconButton>
							</Stack>
							<Button
								variant="outlined"
								className="bg-slate-800 text-white"
								onClick={handleAddItem}
							>
								Add
							</Button>
						</Stack>
					</Box>
				</Modal>
			</Box>
		</CssVarsProvider>
	);
}

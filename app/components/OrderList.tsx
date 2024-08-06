"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


interface Inventory {
  id: string;
  userId: string | undefined;
  date: Date;
  itemName: string;
  quantity: number;
}

type Props = {
  onClick: (item: Inventory) => Promise<void>;
  rows?: Inventory[];
  page: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
};

function RowMenu({ onClick, item }: { onClick: (item: Inventory) => Promise<void>; item: Inventory }) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        {/* <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem> */}
        <Divider />
        <MenuItem color="danger" onClick={() => onClick(item)}>Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderList(props: Props) {

  const handlePreviousPage = () => {
    if (props.page > 1) {
      props.onPageChange(props.page - 1);
    }
  };

  const handleNextPage = () => {
    if (props.page < Math.ceil(props.totalItems / props.rowsPerPage)) {
      props.onPageChange(props.page + 1);
    }
  };

  return (
    <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, width: '90vw' }}>
      {props.rows?.map((listItem) => (
        <List
          key={listItem.id}
          size="sm"
          sx={{
            '--ListItem-paddingX': 0,
          }}
        >
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
              {/* <ListItemDecorator>
                <Avatar size="sm">{listItem.customer.initial}</Avatar>
              </ListItemDecorator> */}
              <div>
                <Typography fontWeight={600} gutterBottom>
                  {listItem.itemName}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  Qty: {listItem.quantity}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography level="body-xs">{listItem.date.toDateString()}</Typography>
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">{listItem.date.toLocaleTimeString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Link level="body-sm" component="button">
                    Download
                  </Link>
                  <RowMenu onClick={props.onClick} item={listItem} />
                </Box>
              </div>
            </ListItemContent>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={
                {
                  High: <CheckRoundedIcon />,
                  Medium: <AutorenewRoundedIcon />,
                  Low: <BlockIcon />,
                }[listItem.quantity <= 2 ? "Low" : listItem.quantity > 2 && listItem.quantity < 5 ? "Medium" : "High"]
              }
              color={
                {
                  High: 'success',
                  Medium: 'neutral',
                  Low: 'danger',
                }[listItem.quantity <= 2 ? "Low" : listItem.quantity > 2 && listItem.quantity < 5 ? "Medium" : "High"] as ColorPaletteProp
              }
            >
              {listItem.quantity <= 2 ? "Low" : listItem.quantity > 2 && listItem.quantity < 5 ? "Medium" : "High"}
            </Chip>
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Box
        className="Pagination-mobile"
        sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', py: 2 }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={handlePreviousPage}
          disabled={props.page === 1}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" mx="auto">
          Page {props.page} of {Math.ceil(props.totalItems / props.rowsPerPage)}
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={handleNextPage}
          disabled={props.page === Math.ceil(props.totalItems / props.rowsPerPage)}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
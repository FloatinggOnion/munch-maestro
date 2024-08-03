import Image from "next/image";
import { Nunito } from "next/font/google";

import { Box, Breadcrumbs, Typography, Link as JoyLink, CssVarsProvider, CssBaseline, Button } from "@mui/joy";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import Sidebar from "../components/SideBar";
import OrderTable from "../components/OrderTable";
import OrderList from "../components/OrderList";

import { font } from "@/lib/font";


export default function Home() {

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* <Header /> */}
        {/* <Sidebar /> */}
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <JoyLink
                underline="none"
                color="neutral"
                href="#some-JoyLink"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </JoyLink>
              <JoyLink
                underline="hover"
                color="neutral"
                href="#some-JoyLink"
                fontSize={12}
                fontWeight={500}
              >
                Dashboard
              </JoyLink>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                Orders
              </Typography>
            </Breadcrumbs>
          </Box> */}
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Pantry Items
            </Typography>
            {/* <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
            >
              Download PDF
            </Button> */}
          </Box>
          <OrderTable />
          <OrderList />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

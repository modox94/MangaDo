import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const BreadcrumbTrail = () => (
  <Breadcrumbs>
    <Link underline="hover" color="inherit" href="#">
      Home
    </Link>
    <Link underline="hover" color="inherit" href="#">
      Catalog
    </Link>
    <Link underline="hover" color="inherit" href="#">
      Accessories
    </Link>
    <Link underline="hover" color="inherit" href="#">
      New Collection
    </Link>
    <Typography color="text.primary">Belts</Typography>
  </Breadcrumbs>
);

export default BreadcrumbTrail;

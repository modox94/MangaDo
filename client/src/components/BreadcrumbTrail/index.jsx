import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MaterialLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {
  useLocation,
  Link,
  // useNavigate,
  // useParams,
} from 'react-router-dom';

const BreadcrumbTrail = () => {
  const location = useLocation();
  // const navigate = useNavigate();

  // const pathArr = path.split('|')
  // const params = pathArr.slice(0, -1).join('|')

  // console.log('!!!location', location);
  console.log('!!!pathname', location?.pathname);
  console.log('!!!decodeURIComponent', decodeURIComponent(location?.pathname));

  return (
    <Breadcrumbs>
      <MaterialLink underline="hover" color="inherit">
        <Link to="/">Home</Link>
      </MaterialLink>
      <MaterialLink underline="hover" color="inherit" href="#">
        Catalog
      </MaterialLink>
      <MaterialLink underline="hover" color="inherit" href="#">
        Accessories
      </MaterialLink>
      <MaterialLink underline="hover" color="inherit" href="#">
        New Collection
      </MaterialLink>
      <Typography color="text.primary">Belts</Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbTrail;

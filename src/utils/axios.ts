import axios from 'axios';
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
const isDevelopment = process.env.NODE_ENV === 'development';
const prefix = isDevelopment ? '' : '';

const apiAuth = axios.create({
  baseURL: `${HOST_API}`,
});

const apiUser = axios.create({
  baseURL: `${HOST_API}/users`,
});

const apiLocus = axios.create({
  baseURL: `${HOST_API}/locus`,
});

const apiMovies = axios.create({
  baseURL: `${HOST_API}${prefix}/movies`,
});

const apiBusiness = axios.create({
  baseURL: `${HOST_API}/business`,
});

const apiBanners = axios.create({
  baseURL: `${HOST_API}/banners`,
});

const apiSite = axios.create({
  baseURL: `${HOST_API}/siteapi`,
});

export { apiAuth, apiBanners, apiBusiness, apiLocus, apiMovies, apiUser, apiSite };

// ----------------------------------------------------------------------

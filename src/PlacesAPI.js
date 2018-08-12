

const CLIENT_ID = 'HKWLQCAWE1AHPI3OIPM0CQKAEJERK2HRHTQCDJRUE0SOX4LD';
const CLIENT_SECRET = '01Y2BPAHZVTEICFMQ4IK03MZTP4OG2IHJMNIVH5GIL2A15JG';
const API = "https://api.foursquare.com/v2";
const VERSION = "20180811";
const RADIUS_M = 5000;
const SEARCH_RESULTS = 10;


export const getAllPlaces = (lat, lng, name) =>
fetch(`${API}/venues/search?ll=${lat},${lng}&limit=${SEARCH_RESULTS}
        &radius=${RADIUS_M}&query=${name}&client_id=${CLIENT_ID}
        &client_secret=${CLIENT_SECRET}&v=${VERSION}`)
    .then(res => res.json())
    .then(data => data.response.venues)
    .catch('error');


export const getPlaceDetails = (id) =>
fetch(`${API}/venues/${id}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
    .then(res => res.json())
    .catch('error')
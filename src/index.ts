import express from 'express';
import moment from 'moment';
import { Launches } from './spaceX/launches';

const app = express();
app.use(express.json());
const port = 8001; // default port to listen

// define a route handler for the default home page
app.get('/', async (request: any, response: any) => {
  response.send({});
});

// Handle get requests to /nasa
app.get('/yearly-launches', async (request: any, response: any) => {
  const daily = new Launches();
  // Sends in today's date as a formatted string
  const result = await daily.getLaunchesByYear(request.query.year);
  // Sends back the result of the image getter
  response.send(result);
});

// handles /range-launches get request
app.get('/range-launches', async (request: any, response: any) => {
    const launches = new Launches();

    //getting the params
    const queryString = window.location.search;
    console.log(queryString);

    const urlParams = new URLSearchParams(queryString);

    let start : string = urlParams.get('start');
    let end : string = urlParams.get('end');

    //sends in start and end year as strings
    const result = await launches.getLaunches(start, end);

    response.send(result);

});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

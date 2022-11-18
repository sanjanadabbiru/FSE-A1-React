
import {Tuits} from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_TUITS = [
  {tuit: "NASA", _id:"633b12c1f77b271b3fba92e7"},
  {tuit: "I am alice",  _id:"6348cd2257afe6220ceba2be"},
];

// test tuit list renders static tuit array
test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>
  );

  const linkElement = screen.getByText(/NASA/i);
  expect(linkElement).toBeInTheDocument();

});


test('tuits list renders mocked', async () => {
  axios.get.mockImplementation(() =>
  Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;
  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>);

  const tuit = screen.getByText(/alice/i);
  expect(tuit).toBeInTheDocument();
});
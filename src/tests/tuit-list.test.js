import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";


//jest.mock('axios');
const mock = jest.spyOn(axios, 'get');
mock.mockImplementation(() =>
    Promise.resolve({data: {tuits: MOCKED_TUITS}}));
mock.mockRestore();

// const MOCKED_USERS = [
//   "alice", "bob", "charlie"
// ];

const MOCKED_TUITS = [
  {_id: "123",
  tuit: "alice's tuit",
  postedBy: ""},
  {_id: "456",
    tuit: "bob's tuit",
    postedBy: ""},
  {_id: "789",
    tuit: "charlie's tuit",
    postedBy: ""}
];


test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits = {MOCKED_TUITS}/>
      </HashRouter>
  );
  const tuit = screen.getByText(/alice's/);
  expect(tuit).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);
  const linkElement = screen.getByText(/bob's first tuit/);
  expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
  const mock = jest.spyOn(axios, 'get');
  mock.mockImplementation(() =>
      Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;
  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);

  const tuitText = screen.getByText(/charlie's tuit/);
  expect(tuitText).toBeInTheDocument();
  mock.mockRestore();
});

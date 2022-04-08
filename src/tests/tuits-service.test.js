import {createUser, deleteUsersByUsername, findAllUsers} from "../services/users-service";
import { findAllTuits, createTuit, deleteTuit, findTuitById} from "../services/tuits-service"

//create a mock tuit

const mockTuit = {
    tuit: "This is a sample tuit for testing A3",
    postedBy: "6244a191b6f2a50b52b127dc"

}

// create a mock user
const mockUser = {
    username: "amrutha_v",
    password: "amrutha_v",
    email: "amrutha.v@gmail.com"
}

describe('can create tuit with REST API', () => {
  // TODO: implement this

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        return await deleteTuit(newTuit._id)
        //return deleteUsersByUsername(mockUser.username);
    });

    test('can insert new tuit with REST API', async () => {
        // insert new tuit in the database
        const newTuit = await createTuit(mockTuit.postedBy, mockTuit);

        //console.log(newTuit)
        // verify inserted and actual values of tuit
        expect(newTuit.tuit).toEqual(mockTuit.tuit);
        expect(newTuit.postedBy).toEqual(mockTuit.postedBy);
    });
});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
    let newTuit = null
    //In the setup phase, create a tuit
    beforeAll(async () => {
        newTuit = await createTuit(mockTuit.postedBy, mockTuit)
    });

    // clear the data created before test
    afterAll( async  () =>{
        return await deleteTuit(newTuit._id)
    })

    test('can delete new tuit with REST API', async () => {

        const deletionStatus = await deleteTuit(newTuit._id)

        // verify we deleted at least one tuit by its tuit ID
        expect(deletionStatus.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
    // TODO: implement this
    let newTuit = null
    //In the setup phase, create a tuit
    beforeAll(async () => {
        newTuit = await createTuit(mockTuit.postedBy, mockTuit)
    });

    // clear the data created before test
    afterAll( async  () =>{
        return await deleteTuit(newTuit._id)
    })

    test('can fetch a tuit with REST API', async () => {

         newTuit = await findTuitById(newTuit._id)

        // verify retrieved and actual values of tuit
        expect(newTuit.tuit).toEqual(mockTuit.tuit);
        expect(newTuit.postedBy._id).toEqual(mockTuit.postedBy);
    });
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
    // sample users we'll insert to then retrieve
    const tuits =[
       {
            tuit: "tuit 1",
            postedBy: mockTuit.postedBy
        },
        {
            tuit: "tuit 2",
            postedBy: mockTuit.postedBy
        },
       {
            tuit: "tuit 3",
            postedBy: mockTuit.postedBy
        }
    ]

    const tuitIDsCreated = [];

    // setup data before test
    beforeAll ( ()  =>{
        tuits.map(  async tuitDetails => {
            const newTuit = await createTuit(tuitDetails.postedBy, tuitDetails)
            tuitIDsCreated.push(newTuit._id)
        })
    })

    // clean up after ourselves
    afterAll(() =>
        // delete the users we inserted
        tuitIDsCreated.map(tuit =>
            deleteTuit(tuit)
        )
    );

    test('can retrieve all tuits from REST API', async () => {
        // retrieve all the users
        const tuitsRetrieved = await findAllTuits();

        // there should be a minimum number of tuits
        expect(tuitsRetrieved.length).toBeGreaterThanOrEqual(tuits.length);

        // let's check each user we inserted
        const tuitsWeInserted = tuitsRetrieved.filter(
            tuit => tuitIDsCreated.indexOf(tuit._id) >= 0);

        // compare the actual users in database with the ones we sent
        tuitsWeInserted.forEach(tuit => {
            const tuitDetails = tuits.find(currentTuit => currentTuit.tuit === tuit.tuit
                && currentTuit.postedBy === tuit.postedBy._id);
            //expect(tuitDetails.length).toEqual(1);
            expect(tuitDetails.tuit).toEqual(tuit.tuit);
            expect(tuitDetails.postedBy).toEqual(tuit.postedBy._id);
        });
    });
});
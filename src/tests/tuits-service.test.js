import {
  createTuit,
  deleteTuit, findAllTuits,
  findTuitById
} from "../services/tuits-service";
import {createUser,deleteUsersByUsername,findAllUsers} from "../services/users-service";
 const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
      };

    const tuit1 = {
      tuit: 'our @NASAPersevere Mars rover landed and our Ingenuity helicopter took flight.',
      postedOn: '2022-12-06',
      _id : '636343b540e5a60ce9f4cc42'
    };

describe('can create tuit with REST API', () => {
  // TODO: implement this
    // sample tuit to insert

    // setup test before running test
      beforeAll(async() => {
        // remove any/all tuits to make sure we create it in the test
        return await deleteTuit(tuit1._id);
      })
      // clean up after test runs
      afterAll(async() => {
        // remove any data we created
        await deleteUsersByUsername(ripley.username);
        return await deleteTuit(tuit1._id);
      })

      test('can insert new tuit with REST API', async () => {
        // insert new tuit in the database
        const newUser = await createUser(ripley);
        const userId = newUser._id;
        const newTuit = await createTuit(userId,tuit1);
        // verify inserted tuits's properties match parameter tuit
        expect(newTuit.tuit).toEqual(tuit1.tuit);
        expect(newTuit.postedOn).toEqual("2022-12-06T00:00:00.000Z");
      });
});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
    let userId;

    beforeAll(async() => {
      const newUser = await createUser(ripley);
      const userId = newUser._id;
      return createTuit(userId,tuit1);
    });

    afterAll(() => {
      return deleteTuit(tuit1._id);
    })

    test('can delete with REST API', async () => {
      const status = await deleteTuit(tuit1._id);
      expect(status.deletedCount)
        .toBeGreaterThanOrEqual(1);
    });

});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this

  beforeAll(() => {
    return deleteTuit(tuit1._id)
  });

  afterAll(() => {
    return deleteTuit(tuit1._id);
  });

  test('can retrieve with REST API', async () => {
    const newUser = await createUser(ripley);
    const userId = newUser._id;
    const newTuit = await createTuit(userId,tuit1);

    expect(newTuit.tuit).toEqual(tuit1.tuit);
    expect(newTuit.postedOn).toEqual("2022-12-06T00:00:00.000Z");

    const existingTuit =
      await findTuitById(newTuit._id);
    expect(existingTuit.tuit).toEqual(tuit1.tuit);
    expect(existingTuit.postedOn).toEqual("2022-12-06T00:00:00.000Z");
  });


});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this

  const tuits = [
      "When InSight — a shortening of Interior Exploration using Seismic Investigations",
       "In early February, Dr. Posiolova and other scientists were working to take a three-dimensional, stereo image of a part of Mars",
       "It was so big that it was visible in daily global weather images taken by another camera on the orbiter"
    ];

  const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const newUser = createUser(ripley);
    const userId = newUser._id;
    beforeAll(async() =>

      tuits.map(tuit =>
        createTuit({
          tuit,
          postedOn: '2022-11-26'
        })
      )

    );

    afterAll(async() =>
      tuits.map(tuit =>
        deleteTuit(tuit._id)
      ),
      deleteUsersByUsername(ripley.username),
    );

    test('retrieve all tuits from REST API', async () => {
      const listOfTuits = await findAllUsers();

      expect(listOfTuits.length)
        .toBeGreaterThanOrEqual(tuits.length);

      const tuitsWeInserted = listOfTuits.filter(
        tuit => tuits.indexOf(listOfTuits.tuit) >= 0);

      tuitsWeInserted.forEach(tuit => {
        const tuitName = tuits
          .find(tuit => tuit === listOfTuits.tuit);
        expect(listOfTuits.tuit).toEqual(tuit);
        expect(listOfTuits.postedOn)
          .toEqual("2022-12-06T00:00:00.000Z");
      });
    });
});
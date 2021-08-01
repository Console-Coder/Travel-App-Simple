import {createCard,doNotSave,postThenGetToAddTrip} from '../src/client/js/funcs';

test("seeting if client functionality works!", () => {
    expect(createCard).toBeDefined();
    expect(doNotSave).toBeDefined();
    expect(postThenGetToAddTrip).toBeDefined();
});
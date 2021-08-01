import {chainAndGet} from '../src/server/serverFuncs.js';

test("seeting if server functionality works!", () => {
    expect(chainAndGet).toBeDefined();
});
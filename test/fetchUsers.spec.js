const fetch = require('node-fetch');
const sinon = require('sinon');
const expect = require('chai').expect;

describe('fetchUsers', () => {
    beforeEach(() => {
        sinon.stub(global, 'fetch').resolves({ json: () => Promise.resolve([{ name: 'John Doe' }, { name: 'Jane Smith' }]) });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should log the names of the users', async () => {
        await fetchUsers();
        expect(console.log).to.have.been.calledWith('John Doe');
        expect(console.log).to.have.been.calledWith('Jane Smith');
    });
});
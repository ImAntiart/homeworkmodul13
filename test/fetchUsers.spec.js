const fetch = require('node-fetch');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

// Подключаем  индексный файл
const fetchUsers = require('./index'); 

describe('fetchUsers', () => {
    let consoleLogSpy;

    beforeEach(() => {
        // Создаем шпион на функцию console.log
        consoleLogSpy = sinon.spy(console, 'log');

        // Создаем заглушку для fetch
        sinon.stub(global, 'fetch').resolves({
            json: () => Promise.resolve([
                { name: 'John Doe' },
                { name: 'Jane Smith' }
            ])
        });
    });

    afterEach(() => {

        sinon.restore();
    });

    it('should log the names of the users', async () => {
        await fetchUsers();


        expect(consoleLogSpy.calledWith('John Doe')).to.be.true;
        expect(consoleLogSpy.calledWith('Jane Smith')).to.be.true;
    });
});
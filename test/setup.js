const path = require('path');
const { promises: fs } = require('fs');

(async () => {
    const chai = (await import('chai')).default;
    const chaiHttp = (await import('chai-http')).default;
    const app = require('../index');

    chai.use(chaiHttp);

    global.chai = chai;
    global.expect = chai.expect;
    global.request = chai.request;
    global.app = app;
    global.fs = fs;

    const initialData = [
        { "id": 12, "hours": 8, "timestamp": 1716070974887 },
        { "id": 5, "hours": 6, "timestamp": 1716071036594 },
        { "id": 10, "hours": 12, "timestamp": 1716071426377 },
        { "id": 2, "hours": 7, "timestamp": 1716072135535 },
        { "id": 3, "hours": 9, "timestamp": 1716072144601 },
        { "id": 11, "hours": 5, "timestamp": 1716072163402 }
    ];

    beforeEach(async () => {
        // Reset data.json before each test
        await fs.writeFile(path.join(__dirname, '../data.json'), JSON.stringify(initialData, null, 2));
    });
})();

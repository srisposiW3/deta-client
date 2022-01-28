//https://vdzjg3.deta.dev/

const express = require('express');
const { Deta } = require('deta');

const deta = Deta('b0ibn44p_iW7aSQ4gkTsSD4gJUFVWUPRRmfJqdhz9');
const db = deta.Base('system_ticketing_db');

const app = express();

app.use(express.json())

app.post('/issue', async (req, res) => {
    const { projectName, description } = req.body;
    const issue = { projectName, description};
    const insertedIssue = await db.put(issue);
    res.status(201).json(insertedIssue);
}); 

app.get('/issue/:id', async (req, res) => {
    const { id } = req.params;
    const issue = await db.get(id);
    if (issue) {
        res.json(issue);
    } else {
        res.status(404).json({"message": "issue not found"});
    }
});

app.get('/search-by-project/:projectName', async (req, res) => {
    const { projectName } = req.params;
    const result = await db.fetch({"projectName":projectName});
    if (result.items.length > 0) {
        return result.items;
    } else {
        res.status(404).json({"message": "Project not found"});
    }
});

//===============Prueba================================
// app.post('/users', async (req, res) => {
//     const { name, age, hometown } = req.body;
//     const toCreate = { name, age, hometown};
//     const insertedUser = await db.put(toCreate);
//     res.status(201).json(insertedUser);
// }); 

module.exports = app
var users = [{
    id: 1,
    name: 'test'
}, {
    id: 2,
    name: 'test2'
}, {
    id: 3,
    name: 'test3'
}];


const index = function (req, res) {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
}

const show =  function (req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    const user = users.filter((user) => {
        return user.id === id;
    })[0];
    if (!user) {
        return res.status(404).end();
    }
    res.json(user);
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    const user = users.filter((user) => {
        return user.id !== id;
    });
    res.status(204).end();
};
const create =  (req, res) => {
    const name = req.body.name;
    if (!name) {
        res.status(400).end();
        return true;
    }
    const isExist = users.filter(user => user.name === name).length;
    if (isExist) {
        res.status(409).end();
        return true;
    }
    const id = Date.now();
    const user = {
        id,
        name
    };
    users.push(user);
    res.status(201).json(user);
};

const update =  (req, res) => {
    const id = parseInt(req.params.id, 10);
    const name = req.body.name;
    if (!name) {
        res.status(400).end();
        return true;
    }

    if (Number.isNaN(id)) {
        res.status(400).end();
        return true;
    }
    const isExist = users.filter(user => user.name === name).length;
    if (isExist) {
        res.status(409).end();
        return true;
    }

    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();

    user.name = name;
    res.json(user);
};

module.exports = {
    index,
    show,
    destroy,
    create,
    update
};
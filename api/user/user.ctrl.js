const models = require('../../models');

const users = [{
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

    models.User.
        findAll({
            limit: limit
        })
        .then(users=>{
            res.json(users.slice(0, limit));
            return true;
        })
}

const show =  function (req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    models.User.findOne({
        where:{id}
    }).then(user=>{
        if (!user) {
            return res.status(404).end();
        }
        res.json(user);
    });
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    models.User.destroy({
        where:{id}
    }).then(()=>{
        res.status(204).end();
    })

};
const create =  (req, res) => {
    const name = req.body.name;
    if (!name) { res.status(400).end();return true;}
    
    models.User.create({name})
        .then(user=>{
        res.status(201).json(user);
        })
        .catch(err =>{
            console.log(err.message);
            if(err.name === 'SequelizeUniqueConstraintError'){
                res.status(409).end();
                return true;
                        
            };
            res.status(500).end();
            return true;
        })
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

    models.User.findOne({where:{id}})
        .then(user=>{
        if(!user) return res.status(404).end(0);
        user.name = name;
        user.save()
            .then(_=> {
                res.json(user);
            })
            .catch(err=> {
                if(err.name === 'SequelizeUniqueConstraintError'){
                    res.status(409).end();
                    return true;
                };
                res.status(500).end();
                return true;
            })
        })
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
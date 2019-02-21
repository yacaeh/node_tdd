const app = require('../index');
const port = 3100;
const syncDb = require('./sync-db');

syncDb().then(_=>{
    console.log('Sync Database');
    app.listen(port,function(){
        console.log("Server on "+port)
    });
})
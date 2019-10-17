var restify = require('restify');
const server = restify.createServer(); //Para crear el createServer

//settings
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

const items={
    1:{
        name: 'urbana',
        lastName: 'bicolor',
        precio: '45'
    },2:{
        name: 'air',
        lastName: 'blues',
        precio: '60'
    }
};

let itemsCount = 2;

//routes
// Listar
server.get('/item', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(items))
});

//Buscar por ID
// server.post('/item/:id', (req, res, next) => {
server.get('/item/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(items[parseInt(req.params.id)]))
});

// Subir o añadir un nuevo dato
server.put('/item/:id', (req, res, next) => {
    const item = items[parseInt(req.params.id)];
    const act = req.body
    for (let campo in act){
        item[campo] = act[campo]
    }
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(item))
})

//Actualizar, aumenta el ID
server.post('/item', (req, res) => {
    const item = req.body;
    itemsCount++;
    item.id = itemsCount;
    items[item.id] = item;
    res.writeHead(200);
    res.end(JSON.stringify(item))
});

server.del('/item/:id', (req, res, next) => {
    delete items[parseInt(req.params.id)];
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200)
    res.end(JSON.stringify(true));
});

server.del('/item', (req, res, next) => {

    for (let field in items){
        delete items[(field)]
    }

    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200)
    res.end(JSON.stringify(true));
});

// start the server
server.listen(3000, () => {
    console.log('%s escuchando en %s', server.name, server.url)
})

let express = require('express');
let cors = require('cors');
let bodyParser = require("body-parser");
let app = express();
let cluster = require('cluster');
let helmet = require('helmet');

let cpus = require('os').cpus();
let isMaster = cluster.isMaster;
let numberOfWorker = cpus.length;

let log = require('./module/logs');

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
let api = require("./routes/api");

app.use('/api/v1', api);

// Set Port
let port = process.env.PORT || 3000;

// Check if is master
if (cluster.isMaster) {
    log(`Master ${process.pid} is running`);

    log(`Forking ${numberOfWorker} workers`)

    let workers = [...Array(numberOfWorker)].map(_ => cluster.fork())

    cluster.on('online', (worker) => log(`Worker ${worker.process.pid} is online`))
    cluster.on('exit', (worker, exitCode) => {
        log(`Worker ${worker.process.id} exited with code ${exitCode}`)
        log(`Starting a new worker`)
        cluster.fork()
    });
} else {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
}

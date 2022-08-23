import express from 'express';
 
import { router } from '../routes/emailing.js';

export default class server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            emailing: '/emailing'
        };

        this.middlewares();

        this.routes();
    }

    middlewares() {
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.emailing, router);

        this.app.use('*', (req, res) => {
            res.status(404).send('404 - Page not found');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`);
        });
    }
}

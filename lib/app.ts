import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
// import * as cors from "cors";
import { Routes } from "./routes/crmRoutes";

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes;
    // public mongoUrl: string = 'mongodb+srv://construapp:construapp@construapp-o7wkj.mongodb.net/test?retryWrites=true&w=majority';

    constructor() { 
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // this.app.use(cors());
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });    
    }
}

export default new App().app;
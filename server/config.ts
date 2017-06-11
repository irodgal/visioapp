import * as Cloudant from "cloudant";
import * as nano from "nano";
import * as prom from 'nano-promises';

class config {

    private readonly BD_LOCAL_HOST = 'http://localhost:5984';

    public clientDB;

    init = () => {
        if (process.env.host_db == 'localhost') {
            console.log("BD en local");
            // bd en local (CouchDb)
            var db = nano(this.BD_LOCAL_HOST);
            this.clientDB = prom(db).db.use(process.env.cloudant_database);
        } else if (process.env.host_db == 'cloudant') {
            console.log('en init()')
            //credenciales para cloudant
            var me = process.env.cloudant_username || "nodejs",
                password = process.env.cloudant_password,
                databaseName = process.env.cloudant_database;

            var db = Cloudant({ account: me, password: password });
            this.clientDB = prom(db).db.use(databaseName);
        }

        //this.client = new Client("http://localhost:5984", "visio");
        //console.log(this.client);

        /*
        var cloudant = Cloudant({ account: "irodgal", password: "1Kastilla1" });
        //console.log(cloudant);
        this.client = cloudant.db.use("visio");
        console.log(this.client);
        */
        /*
    var db = nano('http://localhost:5984');
    this.client = db.db.use("visio");
    console.log(this.client);
    */
        //var db = nano('http://localhost:5984');
        //var db = Cloudant({ account: "irodgal", password: "1Kastilla1" });
        //this.clientDB = prom(db).db.use('visio');
        //this.client = prom(nano('http://localhost:5984')).db.use('visio');
        //console.log(this.client);

        //this.client.
    };

    public initForTest = () => {
        if (process.env.host_db_test == 'localhost') {
            console.log("BD en local");
            // bd de test en local (CouchDb)
            var db = nano(this.BD_LOCAL_HOST);
            this.clientDB = prom(db).db.use(process.env.cloudant_database_test);
        } else if (process.env.host_db_test == 'cloudant_test') {
            //credenciales para cloudant; bd de test
            var me = process.env.cloudant_username || "nodejs",
                password = process.env.cloudant_password,
                databaseName = process.env.cloudant_database_test;

            var cloudant = Cloudant({ account: me, password: password });
            this.clientDB = prom(db).db.use(databaseName);
        }
    };
}
export default new config();
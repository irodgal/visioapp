import config from "../../server/config";
import * as dotenv from 'dotenv';

//Este seria el equivalente a index.ts

dotenv.config();
config.initForTest();
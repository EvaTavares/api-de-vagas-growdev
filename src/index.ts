import "reflect-metadata";
import { Database } from "./main/database/database.connection";
import { Server } from "./main/server/express.server";
import { CacheDatabase } from "./main/database/cache.connection";

Promise.all([Database.connect(), CacheDatabase.connect()]).then(() => {
  Server.listen();
});

import express from "express";
<<<<<<< HEAD
import router from "../routes/index.js"
import { connectMongoDB  } from "../config/mongoDb.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport"
=======
import router from "../routes/index.js";
import { connectMongoDB } from "../config/mongoDb.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
>>>>>>> 7d0c390b05f1d3be5c357818f3ddbaeef6c9cae9
import initializePassport from "../config/passport.config.js";
import cookieParser from "cookie-parser";

connectMongoDB();

<<<<<<< HEAD
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser("secret"))
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://admin:tomastauscher@e-commerce.pgblped.mongodb.net/ecommerce",
        ttl: 15
    }),
    secret: "CodigoSecreto",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
initializePassport()

app.use("/api", router)



app.listen(8082, () => {
    console.log("Escuchando el servidor en el puerto 8082")
})
=======
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secreto"));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://admin:tomastauscher@e-commerce.pgblped.mongodb.net/ecommerce",
      ttl: 15,
    }),
    secret: "CodigoSecreto",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
initializePassport();


app.use("/api", router);

app.listen(8080, () => {
  console.log("Escuchando el servidor en el puerto 8080");
});
>>>>>>> 7d0c390b05f1d3be5c357818f3ddbaeef6c9cae9

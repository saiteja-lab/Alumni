import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from "pg";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db = new pg.Client({
    user : "postgres",
    host : "localhost",
    database : "alumni",
    password : "0000",
    port : 5432
})
db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Assuming your EJS files are in a 'views' folder

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res)=>{
    res.render("home")
})

let name = ""

app.post("/login", (req, res) => {
    res.render('login');
    console.log('Rendering');
    console.log(name)
});

app.post("/detail", (req,res)=>{
    res.send("<h1> This Page is Under Devlopment</h1>")
})


// Error handling middleware
app.use((err, req, res, next) => {
    //console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

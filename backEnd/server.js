const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',       
    password: '',      
    database: 'techfest2026' 
});

con.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to database!');
    }
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const pages = '../frontEnd/pages/'
const register_pages = `${pages}register/`
const comleague_pages = `${register_pages}comleague/`

const api_register = '/register/'
const api_comleague = `${api_register}comleague/`

app.use(express.json());
app.use('/styles', express.static(path.join(__dirname, '../frontEnd/styles')))
app.use('/js', express.static(path.join(__dirname, '../frontEnd/js')))
app.use('/icons', express.static(path.join(__dirname, 'icons')));
app.use('/bg', express.static(path.join(__dirname, 'background')))

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


// Landing page routes
app.get('/', (req, res) => {
    res.redirect('/TechFest')
});

app.get('/TechFest', (req, res) => {
    res.sendFile(path.join(__dirname, `${pages}index.html`))
});
// end


// registration routes
app.get(`${api_register}valorant`, (req, res) => {
    res.sendFile(path.join(__dirname, `${register_pages}valorant.html`))
})

app.get(`${api_register}mlbb`, (req, res) => {
    res.sendFile(path.join(__dirname, `${register_pages}mlbb.html`))
})

app.get(`${api_register}comleague`, (req, res) => {
    res.sendFile(path.join(__dirname, `${register_pages}comLeague.html`))
})

app.get(`${api_register}trojanShowdown`, (req, res) => {
    res.sendFile(path.join(__dirname, `${register_pages}showdown.html`))
})

app.get(`${api_register}techtalks`, (req, res) => {
    res.sendFile(path.join(__dirname,`${register_pages}techtalks.html`))
})

app.get(`${api_register}cosplay`, (req, res) => {
    res.sendFile(path.join(__dirname, `${register_pages}cosplay.html`))
})

app.get(`${api_register}collide`, (req, res) => {
    res.sendFile(path.join(__dirname, `${register_pages}collide.html`))
})
// end

// comleague registration routes
app.get(`${api_comleague}station-1`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_1.html`))
})
app.get(`${api_comleague}station-2`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_2.html`))
})
app.get(`${api_comleague}station-3`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_3.html`))
})
app.get(`${api_comleague}station-4`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_4.html`))
})
app.get(`${api_comleague}station-5`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_5.html`))
})
app.get(`${api_comleague}station-6`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_6.html`))
})
app.get(`${api_comleague}station-7`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_7.html`))
})


// FORM HANDLING

app.post('/register/techtalks', (req, res) => {
    const { full_name, student_number } = req.body;

    const sql = "INSERT INTO techtalks_registrations (full_name, student_number) VALUES (?, ?)";
    con.query(sql, [full_name, student_number], (err, result) => {
        if (err) {
            console.error("Error inserting:", err);
            return res.status(500).send("Database error");
        }
        console.log("Inserted:", result);
        res.send("Registration successful!");
    });
});

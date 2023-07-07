var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const fs = require("fs");
const { Pool } = require("pg");
const cors = require('cors')
var port = 3000;

db = new Pool({
    user:'postgres',
    password:'root',
    host:'db'
    // password:'postgres',
    // host:'localhost'
}) 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname,"./build")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
})

app.get("/notes", (req, res) => {
    console.log("loading")
    try {
        db.query(`
            CREATE TABLE IF NOT EXISTS notes (
                id SERIAL PRIMARY KEY,
                content VARCHAR(255),
                modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `, [],
        (err0, result0) => {
            try {
                db.query(
                    "SELECT * FROM notes ORDER BY id", 
                    [],
                    (err, result) => {
                        if(result) {
                            res.json({
                                notes: result.rows ? result.rows : []
                            });
                        } else if (err) {
                            res.send(err.message)
                        }
                    }
                )
            } catch (err) {
                res.send(err.message)
            }
        })
    } catch (err) {
        res.send(err.message)
    }
    
    
})

app.post("/add", async (req, res) => {
    console.log("adding")
    try {
        db.query(
            "INSERT INTO notes(content) VALUES($1)",
            [req.body.content],
            (err, result) => {
                if (result) {
                    res.json({message: "inserted"});
                } else if (err) {
                    res.end(err)
                }
            }
            );
        } catch (err) {
        res.end(err);
    }
}
)

app.post("/edit", async (req, res) => {
    console.log("editing")
    try {
        db.query(
            `UPDATE notes set content = $1, modified = now() WHERE id = $2`,
            [req.body.content, req.body.noteid],
            (err, result) => {
                if (result) {
                    res.json({message: "edited"});
                } else if (err) {
                    res.send(err)
                }
            }
        );
      } catch (err) {
        res.end(err);
      }
    }
)

app.post("/delete", async(req, res) => {
    console.log("deleting")
    try {
        db.query(
            "DELETE FROM notes WHERE id = $1",
            [req.body.noteid],
            (err, result) => {
                if (result) {
                    res.json({message: "deleted"});
                } else if (err) {
                    res.send(err)
                }
            }
        );
      } catch (err) {
        res.end(err);
      }
    }
)

app.listen(port, '0.0.0.0', function () {
  console.log(`app running on port ${port}`);
});

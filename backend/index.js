const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const mysql = require("mysql");
const multer = require("multer");
const cors = require("cors");

const db = mysql.createPool({
  connectionLimit: 100,
  host: "localhost", //This is your localhost IP
  user: "unni", // "newuser" created in Step 1(e)
  password: "unni123", // password for the new user
  database: "intern_portal", // Database name
});
db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected successful: " + connection.threadId);
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("resume"));

app.post("/studentlogin", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    db.query(
      "SELECT * FROM STUDENT WHERE stu_email = ? AND stu_password = ?",
      [username, password],
      function (error, results, fields) {
        if (error) {
          console.log(error);
          response.status(500).send("Internal server error");
        } else {
          if (results.length > 0) {
            response.status(200).send(results[0]);
            //200-success
          } else {
            response.status(400).send("Incorrect Username and/or Password!");
            //400-bad request
          }
          response.end();
        }
      }
    );
  } else {
    response.status(204).send("Please enter Username and Password!");
    //204-no content
    response.end();
  }
});

app.post("/account", function (req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const dob = req.body.dob;
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  const quali = req.body.quali;
  const inst = req.body.inst;

  const sql = `INSERT INTO STUDENT (stu_fname,stu_lname,stu_dob,stu_email,stu_password,GENDER,QUALIFICATION,INSTITUITION) VALUES (?,?,?,?,?,?,?,?)`;
  db.query(
    sql,
    [fname, lname, dob, email, password, gender, quali, inst],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "REGISTRATION SUCCESSFULL" });
    }
  );
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "resume");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + file.originalname.replace(" ", "_"));
  },
});
const upload = multer({ storage: storage });
app.post("/apply", upload.single("resume"), function (req, res) {
  const stu_id = req.body.stu_id;
  const phone = req.body.phone;
  const from = req.body.from;
  const to = req.body.to;
  const inst = req.body.inst;
  const file = req.file;
  const resume = `http://localhost:3000/${file.filename}`;

  db.getConnection((err, connection) => {
    if (err) res.status(500).send("Internal server error");
    if (connection) {
      const sql = `INSERT INTO APPLICATIONS (appli_phone,from_date,to_date,resume,stu_id,appli_college) VALUES (?,?,?,?,?,?)`;
      db.query(sql, [phone, from, to, resume, stu_id,inst], (err, result) => {
        if (err) {
          console.log(err.message);
          res.status(404).send(err.message);
          //no content
          res.end();
        }
        res.status(200).send("Applied successfully");
        res.end();
      });
    }
  });
});

app.post("/validate", (req, res) => {
  const referenceID = req.body.referenceID;
  // Query the database to check if the reference ID exists
  db.query(
    `SELECT s.stu_fname, s.stu_lname,a.appli_college,s.stu_email,a.from_date,a.to_date,a.appli_gender
    FROM applications a
    JOIN CERTIFICATE c1 ON a.stu_id = c1.stu_id
    JOIN STUDENT s ON s.stu_id = c1.stu_id
    WHERE c1.reference_no = ?`,
    [referenceID],
    (err, results) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ error: "An error occurred while processing your request" });
      } else if (results.length === 0) {
        res.status(400).send("Invalid reference number");
      } else {
        res.status(200).send(results[0]);
      }
    }
  );
});

app.post("/hrlogin", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    db.query(
      "SELECT * FROM HR WHERE hr_email = ? AND hr_password = ?",
      [username, password],
      function (error, results, fields) {
        if (error) {
          console.log(error);
          response.status(500).send("Internal server error");
        } else {
          if (results[0]) {
            response.status(200).send(results[0]);
          } else {
            response.status(400).send("Incorrect Username and/or Password!");
          }
          response.end();
        }
      }
    );
  } else {
    response.status(204).send("Please enter Username and Password!");
    response.end();
  }
});

app.get("/view_applications", (req, res) => {
  const uid = req.query.uid;
  const aid = req.query.aid;
  if (uid) {
    db.query(
      "SELECT * FROM APPLICATIONS WHERE stu_id=?",
      [uid,aid],
      (err, results, fields) => {
        if (err) res.status(500).send("Internal server error");
        res.status(200).send(results);
      }
    );
  } else {
    db.query(
      "SELECT s.stu_fname,s.stu_id,s.stu_lname,a.appli_college,a.appli_phone,a.status_check,a.appli_id,a.RESUME from APPLICATIONS a join student s where a.stu_id=s.stu_id",
      (err, results, fields) => {
        if (err) {
          console.log(err.message);
          res.status(500).send("INTERNAL SERVER ERROR");
        } else {
          console.log(results);
          res.status(200).send(results);
        }
      }
    );
  }
});

app.post("/accept_applications", function (req, res) {
  const appli_id = req.body.appli_id;
  //const status=req.body.status;

  db.query(
    'UPDATE APPLICATIONS SET status_check ="ACCEPTED" WHERE appli_id=?',
    [appli_id],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send("Internal server error");
      } else {
        res.status(200).json({ message: "UPDATED" });
      }
    }
  );
});

app.post("/reject_applications", function (req, res) {
  const appli_id = req.body.appli_id;
  //const status=req.body.status;

  db.query(
    'UPDATE APPLICATIONS SET status_check ="REJECTED" WHERE appli_id=?',
    [appli_id],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send("Internal server error");
      } else {
        res.status(200).json({ message: "UPDATED" });
      }
    }
  );
});

app.get("/view_certificates", (req, res) => {
  const uid = req.query.uid;
  if (uid) {
    db.query(
      "SELECT c.certi_id,a.from_date,a.to_date,a.resume FROM applications a JOIN CERTIFICATE c ON a.stu_id = c.stu_id WHERE c.stu_id = ?",
      [uid],
      (err, results, fields) => {
        if (err) res.status(500).send("Internal server error");
        res.status(200).send(results);
      }
    );
  } else {
    db.query("SELECT * from CERTIFICATE", (err, results, fields) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(results);
      }
    });
  }
});

const moment = require("moment");
app.post("/generate", function (req, res) {
  const stu_id = req.body.stu_id;
  const appli_id = req.body.appli_id;
  const hr_id = req.body.hr_id;
  const reference_id = `${stu_id}_${appli_id}_${moment().format("YYYYMMDDHH")}`;
  const { stu_lname, stu_fname, appli_college, from_date, to_date } = req.body;

  db.getConnection((err, connection) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Internal server error");
    }

    const sql = `INSERT INTO CERTIFICATE (appli_id, stu_id, reference_no, hr_userid)
                     VALUES (?, ?, ?, ?)`;
    connection.query(
      sql,
      [appli_id, stu_id, reference_id, hr_id],
      (err, result) => {
        // Release the connection back to the pool

        if (err) {
          console.error(err.message);
          return res.status(500).send(err.message);
        } else {
          const sql2 = `SELECT s.stu_fname, s.stu_lname, s.stu_id,
                a.appli_id, a.appli_college, a.from_date,c.reference_no, a.to_date FROM STUDENT s
                 JOIN applications a ON a.stu_id = s.stu_id
                  JOIN certificate c ON c.appli_id = a.appli_id WHERE c.appLi_id=? && c.stu_id=?;`;
          db.query(sql2, [appli_id, stu_id], (err, getResult) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ error: "An error occurred while fetching data." });
            } else {
              res.send(getResult[0]);
            }
          });
        }
      }
    );
  });
});

app.post("/certificate/get_certificate",(req,res)=>{
  const id = req.body.id;
  const aid = req.body.aid;
  console.log(id,aid);
  db.query("SELECT REFERENCE_NO FROM CERTIFICATE WHERE stu_id=? and appli_id=?",[id,aid],(err,results,fields)=>{
    if(err)res.status(500).send("Internal server error");
    if(results){
      res.status(200).send(results[0]);}
    // }else{
    //   res.status(400).send("no certificate");
    // }
  })
})
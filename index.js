const sqlite3 = require('sqlite3').verbose();

// Connecting My database made in DB browser
//1st way ->
const db = new sqlite3.Database('./MyFirstDatabase.db');

db.all("SELECT studentId, studentName FROM students", (error, rows) => {
   rows.forEach((row) => {
       console.log(row.studentId + " " + row.studentName);
   })
});

//2nd Way ->
let db1 = new sqlite3. Database('MyFirstDatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("error")
    console.error (err.message);
    
}

console. log( 'Connected to the mydb database.');
});
// Perform SELECT operation
db1. all('SELECT * FROM Students', [], (err, rows) => {
    if (err) {
        throw err;
        }

        rows. forEach( (row) => {
            console. log(row.studentId + ': ' + row.studentName);
        });
    });

    // Close database connection
db1.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console. log( 'Close the database connection.');
});

// Creating a new database using inline memory
const db2 = new sqlite3.Database(':memory:');
db2.serialize(() => {
    db2.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db2.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db2.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        console.log(row.id + ": " + row.info);
    });
});

db2.close();
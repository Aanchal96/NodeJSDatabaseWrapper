const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('./MyFirstDatabase.db');

db.all("SELECT studentId, studentName FROM students", (error, rows) => {
   rows.forEach((row) => {
       console.log(row.studentId + " " + row.studentName);
   })
});

const db1 = new sqlite3.Database(':memory:');
db1.serialize(() => {
    db1.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db1.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db1.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        console.log(row.id + ": " + row.info);
    });
});

db.close();
db1.close();
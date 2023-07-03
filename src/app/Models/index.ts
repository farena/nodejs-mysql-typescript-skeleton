import db from "../Config/db.config"

db.authenticate().then(() => {
  console.log('Connected to DB');
})


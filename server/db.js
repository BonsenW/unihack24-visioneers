import knex from 'knex';
import bcrypt from 'bcrypt';

bcrypt.genSalt(10, function (err, salt) {

})

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: "mydatabase.db"
    },
    useNullAsDefault: true
});

export async function createTable() {
    const doesTableExist = await db.schema.hasTable('users')

    if (!doesTableExist) {
        await db.schema.createTable('users', function (table) {
            table.increments();
            table.string('name');
            table.string('password');
            table.string("salt")
        })
    } else {
        console.log("Table exists")
    }
}

export async function createAccount(name, password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await db('users').insert({ name, password: hash, salt });
}



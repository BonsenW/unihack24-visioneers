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

export async function createUserTable() {
    const doesTableExist = await db.schema.hasTable('users')

    if (!doesTableExist) {
        await db.schema.createTable('users', function (table) {
            table.increments();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string("salt").notNullable();
        })
    } else {
        console.log("User Table Already Exists")
    }
}

export async function createHealthTable() {
    const doesTableExist = await db.schema.hasTable('healthRecord');

    if (!doesTableExist) {
        await db.schema.createTable('healthRecord', function (table) {
            table.increments('id');
            table.string('username').notNullable();
            table.integer('age').notNullable();
            table.string('longTermConditions').nullable();
            table.decimal('weight', 5, 2).nullable(); // Decimal format with precision 5 and scale 2
            table.integer('height').nullable(); // Assuming height is measured in centimeters
            table.string('bloodType').nullable();
            table.string('allergies').nullable();
            table.text('other').nullable(); // Using text type for longer descriptions
        });
        console.log("Health record table created successfully");
    } else {
        console.log("Health record table already exists");
    }
}

export async function createAccount(username, password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await db('users').insert({ username, password: hash, salt });
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTableIfNotExists("urls", (t) => {
          t.increments().primary();
          t.timestamps();
          t.text("original_url");
          t.string("short_url");
          t.boolean("is_deleted").default(false);
        }),
      ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return Promise.all([knex.schema.dropTableIfExists("urls")]);
};

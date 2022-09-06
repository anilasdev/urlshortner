var Model = require("../lib/db");

class Url extends Model {
  static get tableName() {
    return "urls";
  }

  static get relationMappings() {
    return {
    };
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  $beforeInsert() {
    this.updated_at, (this.created_at = new Date().toISOString());
  }


  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
      },
    };
  }

  static get modelPaths() {
    return [__dirname];
  }
}

module.exports = Url;

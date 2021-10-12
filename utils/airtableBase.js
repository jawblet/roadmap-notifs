const airtable = require("airtable");

export const base = airtable.base(process.env.AIRTABLE_BASE_ID);

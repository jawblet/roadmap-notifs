const airtable = require("airtable");

export default async function queryAirtable() {
    const base = airtable.base(process.env.AIRTABLE_BASE_ID);
    let data = [];
    
    await base('Product DB').select({
        view: "Full view by Product domain",
        filterByFormula: "NOT({Phase} = 'Backlog')"
    }).eachPage(function page(records, fetchNextPage) {        
        records.forEach(function(record) {
            data.push(record._rawJson);
        });
        fetchNextPage();
    });

    return data;
}
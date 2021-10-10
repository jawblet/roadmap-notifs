import axios from "axios";
import Cors from "cors";
const airtable = require("airtable");
import Feature from "../../../models/Feature";
import mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async function handler(req, res) {
    try {
        const base = airtable.base(process.env.AIRTABLE_BASE_ID);
        const data = [];
        
        await base('Product DB').select({
            // Selecting the first 3 records in Upcoming Releases (DO NOT EDIT):
            view: "Full view by Product domain",
            filterByFormula: "NOT({Phase} = 'Backlog')"
        }).eachPage(function page(records, fetchNextPage) {        
            records.forEach(function(record) {
                data.push(record._rawJson);
            });
            fetchNextPage();
        });

        const features = data.map(el => {
            const { id, fields } = el;
            return {
                id: id,
                name: fields["Feature"],
                description: fields["Description"],
                phase: fields["Phase"],
                owner: fields["Owner"],
                date: fields["Est. delivery"],
                dev_team: fields["Dev team"],
                product_domain: fields["Product domain"]
            }
        })

        await Feature.insertMany(features);

        return res.status(201).json({ features })
    } catch(err) {
        console.log("error")
        res.status(400).json(err)
    }
  }

  /**
   * 
   * 
new Airtable({ 
    apiKey: process.env.AIRTABLE_API_KEY })

    const data = await axios.get(process.env.AIRTABLE_ENDPOINT,
          {headers: {'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`}})
        .then(res => {return {length: res.data.records.length, data: res.data}})
        .catch(err => console.log(err))
   */
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const plantController = require("../Controllers/plantController");
const { User, Type, Plant } = require("../models");
require('dotenv').config()
const axios =require("axios")

const gemini = async (location) => {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_KEY_GEMINIAI);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    let plants = JSON.stringify(await Plant.findAll({include:{
        model:Type
    }}))
    
    // let {q}= req.query
    const {data} = await axios({
        url: `http://api.weatherapi.com/v1/current.json?key=${process.env.APICUACA}&q=${location}`,
        method: "get"
    })
    


    const prompt = `give me reconmendation about plants in ${data}, just 3 plant 
    response must be a json format.
    base on ${plants}
    create without \`\`\`json and \`\`\``;
    console.log({prompt});
    try {
        
        const result = await model.generateContent(prompt);
        console.log(result.response.text(),"ini respone");
        
        return(JSON.parse(result.response.text().trim()));   
    } catch (error) {
        console.log(error,"erorrdi");
        
    }
    
}
module.exports = gemini
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()


const gemini = async (location) => {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_KEY_GEMINIAI);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `give me reconmendation about plants in ${location} pros and cons about plant 
    response must be a json format.
    create without \'\'\'json and \'\'\'`;
    
    const result = await model.generateContent(prompt);
    
    return(JSON.parse(result.response.text().trim()));   
}
module.exports = gemini
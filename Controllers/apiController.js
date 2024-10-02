const { Axios, default: axios } = require("axios");

class ApiController{
    static async cuaca(req,res,next){
        try {
            let searchInput = req.body
            let {q}= req.query
            const {data} = await axios({
                url: `http://api.weatherapi.com/v1/current.json?key=${process.env.APICUACA}&q=${q}`,
                method: "get"
            })
            console.log(data);
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            
        }
    }
}

module.exports = ApiController
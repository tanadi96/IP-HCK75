const { beforeAll, afterAll, expect, describe, test } = require("@jest/globals");
const { User,sequelize } = require("../models");
const request = require("supertest");
const app = require("../app");
const { restart } = require("nodemon");
const { hashPassword } = require("../Helpers/bycripts");


 beforeAll( async () => {
    try {
        await User.destroy({
            truncate: true,
            restartIdentity: true,
            cascade: true
        })
        const data = require("../data/users.json").map((e) => {
            e.password = hashPassword(e.password);
            e.createdAt = e.updatedAt = new Date();
            return e;
        })
        
        
        await sequelize.queryInterface.bulkInsert("Users",data,{})

    } catch (error) {
        console.log(error,"beforeALl");
        
    }
 })

 

 test("POST/login succes", async () => {
    
        const res = await request(app).post("/login").send({
            email:"fdumbar0@biblegateway.com",
            password:"kkkkk"
        })
        console.log(res.status, res.body);
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("acces_token",expect.any(String))
    
    
 })
 
 describe("POST /login failed", () => {
    test.only("Email/Password Invalid",async () => {
        const res = await request(app).post("/login").send({
            email:"fdumbar0@biblegatewa.com",
            password:"kkkkk"
        })
        console.log(res.status, res.body);
    })
 })


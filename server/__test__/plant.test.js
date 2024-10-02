// const {
//     beforeAll,
//     afterAll,
//     expect,
//     describe,
//     test,
//   } = require("@jest/globals");
//   const { User, sequelize } = require("../models");
//   const request = require("supertest");
//   const app = require("../app");
//   const { restart } = require("nodemon");
//   const { hashPassword } = require("../Helpers/bycripts");
  
//   beforeAll(async () => {
//     try {
//       await User.destroy({
//         truncate: true,
//         restartIdentity: true,
//         cascade: true,
//       });
//       const data = require("../data/users.json").map((e) => {
//         e.password = hashPassword(e.password);
//         e.createdAt = e.updatedAt = new Date();
//         return e;
//       });
  
//       await sequelize.queryInterface.bulkInsert("Users", data, {});
//     } catch (error) {
//       console.log(error, "beforeALl");
//     }
//   });
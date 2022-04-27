process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();
const Test = require("../Models/test");

chai.use(chaiHttp);

describe("Tests", (done) => {
  after((done) => {
    //Before each test we empty the database
    server.close(function () {
      done();
    });
  });
  describe("GET all docs", () => {
    it("first api: it should GET all test documents", (done) => {
      chai
        .request(server)
        .get("/test")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          // res.body.length.should.be.eql(0);
          res.body.err.should.be.eql(false);
          done();
        });
    });
  });
  describe("POST a docs", () => {
    it("second api: should create document and insert to db", (done) => {
      let data = {
        name: "aliakbar",
        id: "12",
      };
      chai
        .request(server)
        .post("/test/create")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.err.should.be.eql(false);
          res.body.message.should.be.eql("created successfully");
          done();
        });
    });
  });
  describe("PUT a doc", () => {
    it("third api: should update successfully", (done) => {
      let data = {
        name: "aliasghar",
        id: "12",
      };
      Test.findOne({ name: "aliakbar" })
        .exec()
        .then((doc) => {
          chai
            .request(server)
            .put("/test/" + doc._id)
            .send(data)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.err.should.be.eql(false);
              res.body.message.should.be.eql("successfully updated");
              done();
            });
        });
    });
  });
  describe("DELETE a doc", () => {
    it("fourth api: should delete successfully", (done) => {
      Test.findOne({ name: "aliasghar" }, { useFindAndModify: false })
        .exec()
        .then((doc) => {
          chai
            .request(server)
            .delete("/test/" + doc._id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.err.should.be.eql(false);
              res.body.message.should.be.eql("successfully deleted");
              done();
            });
        });
    });
  });
});

const express = require('express');
const router = express.Router();
//const yeuai = require('yeuai')();
//const vntk = require('vntk');
//const pos_tag = vntk.pos_tag;
const mongoose = require('mongoose');

const Question = require('../models/question');
const db = 'mongodb://viet:viet@ds161346.mlab.com:61346/qnamaker'

mongoose.Promise = global.Promise;
mongoose.connect(db, { useMongoClient: true }, function (err) {
    if (err) {
        console.error("error!" + error);
    }
});

//router.post('/classification', function (req, res, next) {

//    const text = req.body.text;
//    yeuai.classify_qtype(text).then((result) => {
//        if (text == null && text == undefined) {
//            res.json("please check your input again !");
//        }
//        console.log(result);
//        return res.json({
//            result: result,
//            statusCode: 201,
//            status: true
//        });
//    }, (error) => {
//        return res.json({
//            message: "please check your input again !",
//            statusCode: 190,
//            status: false
//        });
//    });

//    // if(text == null && text == undefined){
//    //     return res.json({
//    //                 message:"please check your input again !",
//    //                  statusCode: 190,
//    //                  status: false
//    //          });
//    // }else{
//    //     return res.json({
//    //         result: pos_tag.tag(text),
//    //         statusCode: 201,
//    //         status: true
//    //     });
//    // };

//    // yeuai.word_tokenize(text, function(err, response){
//    //     if(err) throw err;
//    //     if(response){
//    //         return res.json(response);
//    //         console.log(response);
//    //     }
//    // })
//});

//// second api
//router.post('/classification2', function (req, res, next) {

//    const text = req.body.text;
//    //  yeuai.classify_qtype(text).then((result) => {
//    //      if (text == null && text == undefined) {
//    //          res.json("please check your input again !");
//    //      }
//    //      console.log(result);
//    //      return res.json({
//    //          result:result, 
//    //          statusCode: 201, 
//    //          status: true
//    //      });
//    //  }, (error) => {
//    //     return res.json({
//    //          message:"please check your input again !",
//    //          statusCode: 190,
//    //          status: false
//    //  });
//    //  });

//    if (text == null && text == undefined) {
//        return res.json({
//            message: "please check your input again !",
//            statusCode: 190,
//            status: false
//        });
//    } else {
//        return res.json({
//            result: pos_tag.tag(text),
//            statusCode: 201,
//            status: true
//        });
//    };

//    // yeuai.word_tokenize(text, function(err, response){
//    //     if(err) throw err;
//    //     if(response){
//    //         return res.json(response);
//    //         console.log(response);
//    //     }
//    // })
//});
// post a question
router.post('/addQuestion', function (req, res, next) {
    var newQuestion = new Question({
        question: req.body.question
    });
    newQuestion.save(function (err, callback) {
        if (err) return console.log(err);
        return res.json({
            result: newQuestion.question,
            statusCode: 201,
            status: true
        });
    });
});
// get all questions
router.get('/questions', function (req, res) {
    Question.find(function (err, questions) {
        if (err) return console.error(err);
        return res.json({
            result: questions,
            statusCode: 201,
            status: true
        });
    })
});

router.get('/question/:id', function (req, res) {
    Question.findById(req.body.findById)
        .exec(function (err, question) {
            if (err) {
                console.log("error retrieving a question");
            } else {
                return res.json({
                    result: question,
                    statusCode: 201,
                    status: true
                });
            }
        })
})

module.exports = router;
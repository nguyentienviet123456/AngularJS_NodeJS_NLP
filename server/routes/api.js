const express = require('express');
const router = express.Router();
const yeuai = require('yeuai')();
const vntk = require('vntk');
const pos_tag = vntk.pos_tag;

router.post('/classification', function (req, res, next) {

    const text = req.body.text;
     yeuai.classify_qtype(text).then((result) => {
         if (text == null && text == undefined) {
             res.json("please check your input again !");
         }
         console.log(result);
         return res.json({
             result:result, 
             statusCode: 201, 
             status: true
         });
     }, (error) => {
        return res.json({
             message:"please check your input again !",
             statusCode: 190,
             status: false
     });
     });

    // if(text == null && text == undefined){
    //     return res.json({
    //                 message:"please check your input again !",
    //                  statusCode: 190,
    //                  status: false
    //          });
    // }else{
    //     return res.json({
    //         result: pos_tag.tag(text),
    //         statusCode: 201,
    //         status: true
    //     });
    // };

    // yeuai.word_tokenize(text, function(err, response){
    //     if(err) throw err;
    //     if(response){
    //         return res.json(response);
    //         console.log(response);
    //     }
    // })
});

// second api
router.post('/classification2', function (req, res, next) {
    
        const text = req.body.text;
        //  yeuai.classify_qtype(text).then((result) => {
        //      if (text == null && text == undefined) {
        //          res.json("please check your input again !");
        //      }
        //      console.log(result);
        //      return res.json({
        //          result:result, 
        //          statusCode: 201, 
        //          status: true
        //      });
        //  }, (error) => {
        //     return res.json({
        //          message:"please check your input again !",
        //          statusCode: 190,
        //          status: false
        //  });
        //  });
    
         if(text == null && text == undefined){
             return res.json({
                         message:"please check your input again !",
                          statusCode: 190,
                          status: false
                  });
         }else{
             return res.json({
                 result: pos_tag.tag(text),
                 statusCode: 201,
                 status: true
             });
         };
    
        // yeuai.word_tokenize(text, function(err, response){
        //     if(err) throw err;
        //     if(response){
        //         return res.json(response);
        //         console.log(response);
        //     }
        // })
    });
module.exports = router;
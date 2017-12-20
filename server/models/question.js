const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: String
});

var question = module.exports = mongoose.model('question', questionSchema, 'question');

module.exports.getQuestionById = function(id, callback){
    question.findById(id, callback);
}

module.exports.getQuestionByQuestion = function(question, callback){
    const query = {question: question}
    question.findOne(query, callback);
}

module.exports.addQuestion = function(newQuestion, callback){
    if(err) throw err;
    newQuestion.save(function(err, callback){
        if(err) return console.log(err);
        newQuestion.speak();
    });
};
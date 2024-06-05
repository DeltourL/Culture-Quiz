const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();
app.use(cors());


mongoose.connect('mongodb://localhost:27017/culture_quiz', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch(err => console.error('Erreur de connexion à MongoDB :',
        err));

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    category: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    wrongAnswers: [{ type: String, required: true }]
});
const Question = mongoose.model('Question', questionSchema, "questions");
module.exports = Question;


app.get('/categories', async (req, res) => {
    try {
        const categories = await Question.distinct("category");

        console.log(categories);
        res.send(categories);
    } catch (err) {
        console.error('Error finding categories :', err);
        res.status(500).send('Error finding categories');
    }
});

app.get('/questions/:category', async (req, res) => {
    try {
        const questions = await Question.find({category : req.params.category});

        console.log(questions);
        res.send(questions);
    } catch (err) {
        console.error('Error finding questions :', err);
        res.status(500).send('Error finding questions');
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
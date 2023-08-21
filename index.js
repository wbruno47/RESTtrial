/* GET / comments - list all comments
POST / comments - create a new comments
GET / comments / :id -- get ONE comment 
PATCH / comments / :id - update on comment
DELETE / comments / :id - remove one comment*/


const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');

const { v4: uuidv4 } = require('uuid');
uuidv4();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

let comments = [
    {
        id: uuidv4(),
        username: "Todd",
        comment: "That's funn"
    },
    {
        id: uuidv4(),
        username: "Will",
        comment: "That's so not funn"
    },
    {
        id: uuidv4(),
        username: "Brian",
        comment: "I drive fast"
    },
    {

        id: uuidv4(),
        username: "Mark",
        comment: "Please send this to me (DM)"
    },
    {

        id: uuidv4(),
        username: "Scott",
        comment: "Scott's Tots"
    }
]

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuidv4() });
    //console.log(comments);
    //res.send("IT WORKED");
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const comment = comments.find(c => c.id === id);
    console.log(id);
    console.log(comment);
    res.render('comments/details', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    console.log(req.body);
    console.log(newCommentText);
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/tacos', (res, req) => {
    res.send("GET /tacos response");
})

app.post('/tacos', (res, req) => {
    const { meat, qty } = req.body;
    res.send(`OK, here are you ${qty} ${meat} tacos`);
})

app.listen(3000, () => {
    console.log("ON PORT 3000!");
})
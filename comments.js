// Create web server
// Run the server

// Load the express module
import express from 'express';
const app = express();

// Load the body-parser module
import { json } from 'body-parser';
app.use(json());

// Load the comment module
import comments, { find, findById, findByIdAndUpdate, findByIdAndRemove } from './comments';

// Load the cors module
import cors from 'cors';
app.use(cors());

// Load the mongoose module
import { connect } from 'mongoose';
connect('mongodb://localhost/comments');

// Create a new comment
app.post('/comments', (req, res) => {
    const newComment = comments(req.body);
    newComment.save().then(() => {
        res.send('Comment created');
    }).catch((error) => {
        res.status(500).send('Internal Server Error: ' + error);
    });
});

// Get all comments
app.get('/comments', (req, res) => {
    find().then((comments) => {
        res.json(comments);
    }).catch((error) => {
        res.status(500).send('Internal Server Error: ' + error);
    });
});

// Get a comment
app.get('/comments/:id', (req, res) => {
    findById(req.params.id).then((comment) => {
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).send('Comment not found');
        }
    }).catch((error) => {
        res.status(500).send('Internal Server Error: ' + error);
    });
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    findByIdAndUpdate(req.params.id, req.body).then((comment) => {
        if (comment) {
            res.send('Comment updated');
        } else {
            res.status(404).send('Comment not found');
        }
    }).catch((error) => {
        res.status(500).send('Internal Server Error: ' + error);
    });
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    findByIdAndRemove(req.params.id).then((comment) => {
        if (comment) {
            res.send('Comment deleted');
        } else {
            res.status(404).send('Comment not found');
        }
    }).catch((error) => {
        res.status(500).send('Internal Server Error: ' + error);
    });
});

// Run

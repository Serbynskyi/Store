const express = require('express');
const Notebooksrouter = express.Router();
const Notebookmodel = require('../models/notebook');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get notebook list
Notebooksrouter.get('/', (req, res) =>
    Notebookmodel.findAll({raw:true})
        .then( notebooksqueryresult => {
            res.render('notebooks', {
                notebooksqueryresult
            });
        })
        .catch(err => console.log(err)));

//Display a add notebook form
Notebooksrouter.get('/add', (req,res) => res.render('add'));

//Add a notebook
Notebooksrouter.post('/add', (req, res) => {
    let {vendor, cpu, display} = req.body;
    //Insert into table
    Notebookmodel.create({
        vendor,
        cpu,
        display
    })
        .then( () => res.redirect('/notebooks'))
        .catch(err => console.log(err))
});

//Search for notebooks
Notebooksrouter.get('/search', (req, res) => {

    const termvendor = req.query.termvendor;
    const termcpu = req.query.termcpu;
    const termdisplay = req.query.termdisplay;
    const sortingorder = req.query.sortingorder;

    Notebookmodel.findAll({raw:true,
        where: { [Op.and]: [
                {vendor: {[Op.iLike]: '%' + termvendor + '%'}},
                {cpu: {[Op.iLike]: '%' + termcpu + '%'}},
                {display: {[Op.eq]:  termdisplay }}
                ]},
        order:[sortingorder]
    })
        .then(notebooksqueryresult => {
            res.render('notebooks', {notebooksqueryresult})
        })
        .catch(err => console.log(err));
});

//Display a detail notebook form
Notebooksrouter.get('/detail', (req, res) => {
    const itemdetail = req.query.itemdetail;

    Notebookmodel.findAll({raw:true,
        where: { id: {[Op.eq]:  itemdetail }}
    })
        .then(notebooksqueryresult => {
            res.render('detail', {notebooksqueryresult})
        })
        .catch(err => console.log(err));
});

module.exports = Notebooksrouter;
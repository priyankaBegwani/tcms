const express = require('express');
var router = express.Router();
var dbConfig = require('../dbConfig.js');
var constants = require('../constants');


router.post('/getAllData', function(req, res) {
    var actions = req.body ;
    let columnNames = constants.Columns[actions.columnType];
    let columns =  columnNames.map(a => a.key);
      console.log("columns >>>",columns)
    var query = "SELECT "+columns.join()+" from transportentry;";
    dbConfig.connectToDB(query, function(err, rows){
      console.log("err >>",err);
      if(err){

      }else{
        res.status(200).json({
          "success":true,
          "data": {
            "columns": columnNames,
            "data": rows
          }
        })
      }
    });
});

module.exports = router;

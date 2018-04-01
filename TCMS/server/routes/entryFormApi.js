const express = require('express');
var router = express.Router();
var dbConfig = require('../dbConfig.js');
var finalJson = {},count = 0;
var ActionTypes = {
   "getParties": function(finalJson){
                     var query = "select id,name from parties ORDER BY name;"
                     var that = this;
                     dbConfig.connectToDB(query, function(err, rows,context){
                            if(rows.length > 0){
                               var data = rows.map((entry) => {
                                  const party = {
                                    "value" : entry.id,
                                    "label" : entry.name
                                  };
                                  return party;
                                })

                                context.updateJson("parties",data);
                          }else{

                          }
                     },that);
                },
  "updateJson": function(key, data){
    finalJson = Object.assign({}, finalJson, {[key]:data});
    count = count + 1;
  },
  "getTransporters": function(finalJson){
                        var query = "select id,name from transporters ORDER BY name;"
                        dbConfig.connectToDB(query, function(err, rows,context){
                             if(rows.length > 0){
                               var data = rows.map((entry) => {
                                  const trnsp = {
                                    "value" : entry.id,
                                    "label" : entry.name
                                  };
                                  return trnsp;
                                })
                             context.updateJson("transporters",data);
                             }else{
                                //todo: no data scenario
                             }
                        }, this);
                     }
}

router.post('/getData', function(req, res) {
    var actions = req.body.action ;
    actions.forEach(function(action){
       ActionTypes[action](finalJson);
    });
    var sendResp = setInterval(function(){
      if (count == actions.length){
        console.log("finalJson >",finalJson);
        res.status(200).json({
          "success":true,
          "data": finalJson
        })
        count = 0;
        clearInterval(sendResp);
      }
    },300)
});


router.post('/addParty', function(req, res) {
  var data = req.body.data ;
  var action = req.body.action ;
  var query, str="";
  if(action === "ADD"){
     query = "INSERT INTO parties (name, city, state, phone_no) VALUES ('"+data.name+"','"+data.city+"','"+data.state+"','"+data.phone+"')";
  }else if(action === "UPDATE"){
      str =  data.name ?str + " name='"+data.name+"'" : str +"";
      str = data.city ?str + " ,city='"+data.city+"'" :str + "";
      str =  data.state ?str + " ,state='"+data.state+"'" : str +"";
      str =  data.phone ?str + " ,phone_no='"+data.phone+"'" : str +"";
      query = "UPDATE parties SET "+str+" WHERE id="+req.body.id+";";
  }dbConfig.connectToDB(query, function(err, rows){
      console.log("err >>",err);
      if(err){

      }else{
        res.status(200).json({
          "success":true,
          "data": {
            "success":true
          }
        })
      }
});
});


router.post('/getParty', function(req, res) {
    var id = req.body.id ;
    console.log("id >",id);
    var query = "SELECT * from parties WHERE id="+id;
    console.log("query >",query);
    dbConfig.connectToDB(query, function(err, rows){
      console.log("err >>",err);
      if(err){

      }else{
        res.status(200).json({
          "success":true,
          "data": {
            "success":true,
            "data": rows
          }
        })
      }
});
});

router.post('/getTransporter', function(req, res) {
    var id = req.body.id ;
    var query = "SELECT * from transporters WHERE id="+id;
    dbConfig.connectToDB(query, function(err, rows){
      console.log("err >>",err);
      if(err){

      }else{
        res.status(200).json({
          "success":true,
          "data": {
            "success":true,
            "data": rows
          }
        })
      }
});
});


router.post('/addTransporter', function(req, res) {
    var data = req.body.data ;
    var action = req.body.action ;
    var query, str = "";
    if(action === "ADD"){
       query = "INSERT INTO transporters (name, city, state, phone_no) VALUES ('"+data.name+"','"+data.city+"','"+data.state+"','"+data.phone+"')";
    }else if(action === "UPDATE"){
         str =  data.name ?str + " name='"+data.name+"'" : str +"";
         str = data.city ?str + " ,city='"+data.city+"'" :str + "";
         str =  data.state ?str + " ,state='"+data.state+"'" : str +"";
         str =  data.phone ?str + " ,phone_no='"+data.phone+"'" : str +"";
       query = "UPDATE transporters SET"+str+" WHERE id="+req.body.id+";";
       console.log("query >>>",query);
    }
    dbConfig.connectToDB(query, function(err, rows){
      console.log("err >>",err);
      if(err){

      }else{
        res.status(200).json({
          "success":true,
          "data": {
            "success":true
          }
        })
      }
});
});

router.post('/submitEntry', function(req, res) {
    var data = req.body ;

    console.log("data >>>",data);

    var query = "INSERT INTO transportentry (invoice_no, bill_date, party, item_desc, amount, cgst, sgst,igst, total, transporter, lr_no, booking_stn, bilty_date,bale_qty, weight, freight,bale_numbers,bale_type) VALUES ('"+data.invoice_no+"', STR_TO_DATE('"+data.date+"','%d/%m/%Y'), '"+data.party+"','"+data.item_desc+"',"+data.amount+","+data.cgst+","+data.sgst+","+data.igst+","+data.total+",'"+data.transporter+"','"+data.lr_no+"','"+data.booking_stn+"',STR_TO_DATE('"+data.bilty_date+"','%d/%m/%Y'),'"+data.qty+"','"+data.weight+"','"+data.freight+"','"+data.bales+"','"+data.baleType+"');"

  //  var query = "INSERT INTO transportentry (invoice_no, bill_date, party, item_desc, amount, cgst, sgst,igst, total, transporter, lr_no, booking_stn, bilty_date,bale_qty, weight, freight,bale_numbers,bale_type) VALUES ('"+data.invoice_no+"', '2018-03-22T15:00:30', '"+data.party+"', '"+data.item_desc+"',"+data.amount+","+data.cgst+","+data.sgst+","+data.igst+","+data.total+",'"+data.transporter+"','"+data.lr_no+"','"+data.booking_stn+"','2018-03-22T15:00:30','"+data.qty+"','"+data.weight+"','"+data.freight+"','"+data.bales+"','"+data.baleType+"');"

    dbConfig.connectToDB(query, function(err, rows){
      console.log("err >>",err);
      if(err){

      }else{
        res.status(200).json({
          "success":true,
          "data": {
            "success":true
          }
        })
      }


    })
});

module.exports = router;

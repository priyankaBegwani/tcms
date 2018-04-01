import { Labels, Apis, Keys } from '../../constants';
import * as Utils from '../../utils';
import moment from 'moment';

function fetchData( keys, identifier, id){
    let that = this,
        actions = keys ? keys : ["getParties", "getTransporters"];

    Utils.fetchService.call(this, {
        "method": "POST",
        "url": Apis.entryFormData,
        "body": JSON.stringify({
            "action": actions
        }),
        "callBack": (data) => {
            setTimeout(function(){
              that.setState((prevState, props) => {
                return { "formData": data }
              });
              if(identifier){
                var obj = that.state[identifier];
                var arr = data[Keys[identifier]];
                var result = arr.filter(function( item ) {
                    return item.label === id;
                });
                obj["label"] = result[0].label;
                obj["value"] = result[0].value;

                that.setState((prevState, props) => {
                  return { obj }
                });

              }
            },200)  

        }
      });

}

function updateBales(){
    let initialNo = parseInt(this.state.bale_no);
    let qty = parseInt(this.state.qty);
    let baleType = this.state.baleType;
    if(initialNo && qty && baleType){
      let baleNos = initialNo, count = 1, nextNo = initialNo;
      if(baleType === "autoIncrement"){
          while(count < qty){
            nextNo = nextNo + 1;
            baleNos = baleNos + "," + nextNo;
            count++;
          }
      }else if(baleType === "allSame"){
        while(count < qty){
          baleNos = baleNos + "," + initialNo;
          count++;
        }
      }
      this.setState((prevState, props) => {
        return { "bales": baleNos }
      });
    }

}

function updateSelectedOption(data, type){
  this.setState((prevState, props) => {
    return {[type]:data};
  });
}

function updateTotal(name, value){
    let totalAmt = 0,
        that = this;
    that.setState((prevState, props) => {
      return { [name]: value }
    });

    setTimeout(function(){
      totalAmt = Number(that.state.amount) + Number(that.state.cgst) + Number(that.state.sgst) + Number(that.state.igst) ;
      that.setState((prevState, props) => {
        return { total: totalAmt }
      });
    }, 10);
}

function handleInputChange(name, value, update){
  if(update && (update==="newParty" || update==="newTransporter") ){
    var obj = this.state[update];
    obj[name] = value;
    this.setState((prevState, props) => {
      return { obj }
    });
  }else{
    this.setState((prevState, props) => {
      return { [name]: value }
    });
  }

  if(update && update==="updateBale"){
    var that = this;
    setTimeout(function(){
      updateBales.call(that);
    },200);
  }
}

function resetFields(type){
  var obj = this.state[type];
  if(type==="newParty" || type==="newTransporter"){
    obj = {
      name: "",
      city: "",
      state:"",
      phone:""
    }
  }
  this.setState((prevState, props) => {
    return { obj }
  });
}

function onOpenModal(key, action){
  var that = this,
      selectedItem = this.state[Keys[key]];
      if(action==="edit" && !(selectedItem && selectedItem.value)){
        alert("Please select some name from dropdown to edit");
        return;
      }else{
        if(selectedItem && selectedItem.value && action==="edit"){
          this.setState((prevState, props) => {
            return { modalAction: "edit" }
          });
          Utils.fetchService.call(this, {
              "method": "POST",
              "url": Apis[Keys[key]],
              "body": JSON.stringify({"id" : selectedItem.value}),
              "callBack": (result) => {
                if(result.success){
                    if(key==="partyModal"){
                        var obj = this.state.newParty;
                        obj["name"]= result.data[0].name ? result.data[0].name : "";
                        obj["city"]= result.data[0].city ? result.data[0].city : "";
                        obj["state"]= result.data[0].state ? result.data[0].state : "";
                        obj["phone"]= result.data[0].phone_no ? result.data[0].phone_no : "";
                        this.setState((prevState, props) => {
                          return { obj }
                        });

                    }else if(key==="transporterModal"){
                        var obj = this.state.newTransporter;
                        obj["name"]= result.data[0].name ? result.data[0].name : "";
                        obj["city"]= result.data[0].city ? result.data[0].city : "";
                        obj["state"]= result.data[0].state ? result.data[0].state : "";
                        obj["phone"]= result.data[0].phone_no ? result.data[0].phone_no : "";
                        this.setState((prevState, props) => {
                          return { obj }
                        });
                    }
                }
              }
          });
        }else{
          if(key==="partyModal"){
              var obj = this.state.newParty;
              obj["name"]=  "";
              obj["city"]=  "";
              obj["state"]=  "";
              obj["phone"]=  "";
              this.setState((prevState, props) => {
                return { obj }
              });

          }else if(key==="transporterModal"){
              var obj = this.state.newTransporter;
              obj["name"]=  "";
              obj["city"]=  "";
              obj["state"]= "";
              obj["phone"]= "";
              this.setState((prevState, props) => {
                return { obj }
              });
          }
        }
        this.setState((prevState, props) => {
          return {[key]:true}
        });
      }


}
function onCloseModal(key){
    this.setState((prevState, props) => {
      return { [key]: false }
    });
    this.setState((prevState, props) => {
      return { modalAction: "new" }
    });
}

function handleChange(event, date, name) {

    this.setState((prevState, props) => {
      return {[name]:date};
    });
}

function handleModalSubmit(event, type, modalId){
   event.preventDefault();
   var obj = this.state[type];
   var that = this, actionType = "ADD", id = "";
   if(this.state[Keys[modalId]] && this.state[Keys[modalId]].value && this.state.modalAction === "edit"){
      actionType = "UPDATE";
      id = this.state[Keys[modalId]].value;
   }
   Utils.fetchService.call(this, {
       "method": "POST",
       "url": Apis[type],
       "body": JSON.stringify({"data":obj, "action":actionType, "id":id}),
       "callBack": (result) => {
         if(result.success){
           alert("data added successfully");
           setTimeout(function(){
              var action = "";
              resetFields.call(that,type);
              if(that.state.modalAction === "edit"){
                var data = that.state[Keys[modalId]];
                data.label = obj.name;
                that.setState((prevState, props) => {
                  return { data }
                });
              }
              onCloseModal.call(that,modalId);
              if(modalId === "partyModal"){
                action = "getParties";
              }else if(modalId === "transporterModal"){
                action = "getTransporters";
              }
              fetchData.call(that, [action], Keys[modalId], obj.name);
           },200);
         }
       }
   });
}
function handleSubmit(event){
  event.preventDefault();
  var txt;
  var r = confirm("Do you really want to submit the form ?");
  if (r == true) {
      submitData.call(this);
  } else {

  }
}
function submitData(){
    let data = {
      "invoice_no": this.state.invoice_no,
      "item_desc": this.state.item_desc,
      "party": JSON.stringify(this.state.selectedParty),
      "amount": this.state.amount,
      "cgst": this.state.cgst,
      "igst": this.state.igst,
      "sgst": this.state.sgst,
      "total": this.state.total,
      "date": this.state.billDate,
      "bales": this.state.bales,
      "qty": this.state.qty,
      "transporter": JSON.stringify(this.state.selectedTransporter),
      "baleType": this.state.baleType,
      "lr_no": this.state.lr_no,
      "bilty_date": this.state.bilty_date,
      "booking_stn": this.state.booking_stn,
      "weight": this.state.weight,
      "freight": this.state.freight
    }

    Utils.fetchService.call(this, {
        "method": "POST",
        "url": Apis.submitEntry,
        "body": JSON.stringify(data),
        "callBack": (result) => {
          if(result.success){
            alert("data added successfully");
            setTimeout(function(){
              window.location.reload();
            },300);
          }
        }
      });


}
export default {
    updateTotal,
    fetchData,
    handleInputChange,
    updateSelectedOption,
    updateBales,
    handleSubmit,
    handleModalSubmit,
    resetFields,
    onOpenModal,
    onCloseModal,
    handleChange
}

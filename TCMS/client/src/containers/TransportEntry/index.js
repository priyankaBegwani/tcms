import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Handler from './handler';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewPartyForm from '../../components/NewPartyForm.jsx';
import NewTransporterForm from '../../components/NewTransporterForm.jsx';
import * as Actions from './actions';
import Calendar from 'react-input-calendar';


class TransportEntry extends Component {
    constructor(props) {
      super(props);

      this.state = {
        errors: {},
        partyModal: false,
        transporterModal: false,
        bale_no: '',
        formData: {},
        invoice_no:"",
        billDate: moment(new Date()).format("DD/MM/YYYY"),
        selectedParty: {},
        item_desc:"",
        amount: 0,
        igst:0,
        cgst:0,
        sgst:0,
        total:0,
        selectedTransporter: {},
        lr_no:"",
        bilty_date: moment(new Date()).format('DD/MM/YYYY'),
        booking_stn:"",
        weight:"",
        freight:"",
        qty: '',
        baleType: "autoIncrement",
        bales:"",
        newParty:{
          "name":"",
          "city":"",
          "state":"",
          "phone":""
        },
        newTransporter:{
          "name":"",
          "city":"",
          "state":"",
          "phone":""
        },
        modalAction: "new"
      };
      Handler.onOpenModal = Handler.onOpenModal.bind(this);
      Handler.onCloseModal = Handler.onCloseModal.bind(this);
      Handler.handleChange = Handler.handleChange.bind(this);
      Handler.updateTotal = Handler.updateTotal.bind(this);
      Handler.fetchData = Handler.fetchData.bind(this);
      Handler.updateSelectedOption = Handler.updateSelectedOption.bind(this);
      Handler.handleInputChange = Handler.handleInputChange.bind(this);
      Handler.updateBales = Handler.updateBales.bind(this);
      Handler.handleSubmit = Handler.handleSubmit.bind(this);
      Handler.handleModalSubmit = Handler.handleModalSubmit.bind(this);
      Handler.resetFields = Handler.resetFields.bind(this);
    }
    componentDidMount() {
      console.log("fetchData")
         Handler.fetchData();
    }

    render() {
        const { validate } = this.props;
        const { selectedParty, selectedTransporter } = this.state;

        return (
          <div className="entry-form-container">
            <form id="myForm" name="myForm" onSubmit={Handler.handleSubmit}>
               <div>
                 <div>
                   <div>
                     <h3 className="form-heading">Bill Details<hr/></h3>
                   </div>
                   <div>
                     <div className="form-style-1 ">
                         <div className="display-inline">
                           <ul className="form-style-1 ">
                             <li className="display-inline">
                               <label>Invoice No<span className="required">*</span></label>
                               <input type="text" required name="invoice_no" className="field-divided" maxLength="16" onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value)}  placeholder="Invoice No" />
                             </li>
                             <li className="display-inline">
                               <label>Date<span className="required">*</span></label>
                              <Calendar required format='DD/MM/YYYY' date={this.state.billDate} closeOnSelect={true} hideTodayButton={true} maxDate={this.state.billDate} computableFormat={'DD/MM/YYYY'} inputName="billDate" onBlur={Handler.handleChange} />
                             </li>
                             <li className="party">
                               <label>Party Name<span className="required">*</span></label>
                               <Select
                                 ref="combo"
                               className="field-select display-inline"
                                 name="party"
                                 required
                                 value={selectedParty}
                                 onChange={(event) => Handler.updateSelectedOption(event, "selectedParty")}
                                 options={this.state.formData.parties}
                               />
                               <a className="display-inline" href="javascript:void();" onClick={(event) => Handler.onOpenModal("partyModal","new")}><div className={"add-icon"}></div></a>
                               <a className="display-inline" href="javascript:void();" onClick={(event) => Handler.onOpenModal("partyModal","edit")}><div className={"edit-icon"}></div></a>
                             </li>
                             <li >
                               <label>Item Description</label>
                               <textarea name="item_desc" className="field-textarea" onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value)}></textarea>
                             </li>
                           </ul>
                         </div>
                         <div className="display-inline amt">
                             <div><h4>Payment Details<hr/></h4></div>
                             <div className="amt-table">
                               <div className="amt-table-row">
                                   <label className="amt-table-cell">Amount before Tax<span className="required">*</span></label>
                                   <input required className="field-divided amt-table-cell" name="amount"  placeholder="Amount" type="number" onChange={(event) => Handler.updateTotal(event.target.name, event.target.value)}/>
                               </div>
                               <div className="amt-table-row">
                                   <label className="amt-table-cell">IGST(Rs)</label>
                                   <input name="igst"  className="amt-table-cell field-divided" placeholder="IGST(Rs)" type="number" onChange={(event) => Handler.updateTotal(event.target.name, event.target.value)}/>
                                 </div>
                                 <div className="amt-table-row">
                                   <label className="amt-table-cell">CGST(Rs)</label>
                                   <input className="field-divided amt-table-cell" name="cgst"  placeholder="CGST(Rs)" type="number" onChange={(event) => Handler.updateTotal(event.target.name, event.target.value)}/>
                                 </div>
                                 <div className="amt-table-row">
                                   <label className="amt-table-cell">SGST(Rs)</label>
                                   <input className="field-divided amt-table-cell" name="sgst"  placeholder="SGST(Rs)" type="number" onChange={(event) => Handler.updateTotal(event.target.name, event.target.value)}/>
                                 </div>
                                 <div className="amt-table-row">
                                   <label className="amt-table-cell">Total(Rs)</label>
                                   <input className="field-divided amt-table-cell" name="total"  placeholder="Total(Rs)" type="number" value={this.state.total} disabled />
                                 </div>
                             </div>
                         </div>
                     </div>
                   </div>
                 </div>
                 <div>
                   <div>
                     <h3 className="form-heading">Transport Details<hr/></h3>
                   </div>
                   <div>
                     <ul className="form-style-1">
                           <li className="display-inline">
                             <ul className="form-style-1">
                               <li className="party">
                                 <label>Transporter Name<span className="required">*</span></label>
                                 <Select
                                 className="field-select display-inline"
                                   name="transporter"
                                   required
                                   value={selectedTransporter}
                                   onChange={(event) => Handler.updateSelectedOption(event, "selectedTransporter")}
                                   options={this.state.formData.transporters}
                                 />
                                 <a className="display-inline" href="javascript:void();" onClick={(event) => Handler.onOpenModal("transporterModal","new")}><div className={"add-icon"}></div></a>
                                 <a className="display-inline" href="javascript:void();" onClick={(event) => Handler.onOpenModal("transporterModal","edit")}><div className={"edit-icon"}></div></a>
                               </li>
                               <li className="top_0">
                                 <ul className="form-style-1 padding_0">
                                   <li className="display-inline" >
                                     <label>LR No.<span className="required">*</span></label>
                                     <input required type="text" name="lr_no" className="field-divided" placeholder="LR No." onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value)}/>
                                   </li>

                                   <li className="display-inline">
                                     <label>Bale Qty<span className="required">*</span></label>
                                     <input type="number" name="qty" required placeholder="Bale Qty" max="10" value={this.state.qty} onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value, "updateBale")}/>
                                   </li>
                                 </ul>
                              </li>
                              <li className="top_0">
                                <ul className="form-style-1 padding_0">
                                  <li className="display-inline">
                                    <label>Bale Number<span className="required">*</span></label>
                                    <input type="number" required name="bale_no" className="field-divided" value={this.state.bale_no} placeholder="Bale Number" onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value, "updateBale")}/>
                                  </li>
                                  <li className="display-inline">
                                    <label>
                                      <input name="baleType" type="radio" value="allSame" checked={this.state.baleType === "allSame"} onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value, "updateBale")} />
                                      all same
                                    </label>
                                  </li>
                                  <li className="display-inline">
                                    <label>
                                      <input name="baleType" type="radio" value="autoIncrement" checked={this.state.baleType === "autoIncrement"} onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value, "updateBale")} />
                                      auto
                                    </label>
                                  </li>
                                </ul>
                              </li>


                             </ul>
                           </li>
                           <li className="display-inline amt">
                             <ul className="form-style-1 padding_0">
                               <li className="top_0">
                                 <ul className="form-style-1">
                                   <li className="display-inline">
                                     <label>Bilty Date<span className="required">*</span></label>
                                     <Calendar format='DD/MM/YYYY' date={this.state.bilty_date} closeOnSelect={true} hideTodayButton={true}  maxDate={this.state.bilty_date} inputName="bilty_date" computableFormat={'DD/MM/YYYY'} onBlur={Handler.handleChange} />
                                     </li>

                                   <li className="display-inline">
                                     <label>Booking Station<span className="required">*</span></label>
                                     <input type="text" name="booking_stn"  required placeholder="Booking Station" onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value)} />
                                   </li>

                                 </ul>
                               </li>
                               <li>
                                 <ul className="form-style-1">
                                   <li className="display-inline">
                                     <label>Weight(kg)</label>
                                     <input type="text" name="weight" className="field-divided" placeholder="Weight(kg)" onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value)}/>
                                   </li>
                                   <li className="display-inline">
                                     <label>Freight(Rs)</label>
                                     <input type="text" name="freight"   placeholder="Freight(Rs)" onChange={(event) => Handler.handleInputChange(event.target.name, event.target.value)}/>
                                   </li>
                                   <li >
                                     <label>Generated Bale Numbers</label>
                                     <textarea name="bales" className="field-textarea" disabled value={this.state.bales}></textarea>
                                   </li>
                                 </ul>
                               </li>

                             </ul>
                           </li>
                     </ul>
                   </div>
                 </div>
               </div>
               <div className="text-center"><input className="submit-button" type="submit" value="Submit" /></div>
            </form>
            <Modal className="modal" open={this.state.partyModal} onClose={(event) => Handler.onCloseModal("partyModal")} >
              <NewPartyForm onSubmit={Handler.handleModalSubmit} onChange={Handler.handleInputChange} errors={this.state.errors} data={this.state.newParty}/>
            </Modal>
            <Modal className="modal" open={this.state.transporterModal} onClose={(event) => Handler.onCloseModal("transporterModal")} >
              <NewTransporterForm onSubmit={Handler.handleModalSubmit} onChange={Handler.handleInputChange} errors={this.state.errors} data={this.state.newTransporter}/>
            </Modal>
          </div>
          );
      }
  };

  const mapStateToProps = (state, ownProps) => {
    return {

    }
  };

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch)
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransportEntry);

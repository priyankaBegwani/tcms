export const ActionsTypes = {
  "UPDATE_USER": "UPDATE_USER",
  "MESSAGE_BOX_ACTION":"MESSAGE_BOX_ACTION"
}

export const ErrorCode = {
    "SOMETHING_WRONG" : 999
}

export const Apis = {
   "validateUser":"/auth/login",
   "entryFormData":"/api/getData",
   "submitEntry":"/api/submitEntry",
   "newParty": "/api/addParty",
   "selectedParty": "/api/getParty",
   "newTransporter": "/api/addTransporter",
   "selectedTransporter": "/api/getTransporter",
   "gridData": "/grid/getAllData"
}

export const Keys = {
    "partyModal": "selectedParty",
    "transporterModal": "selectedTransporter",
    "selectedParty": "parties",
    "selectedTransporter": "transporters"

}
export const Labels = {
  "messageBox" : {
      "errorHeader" : "ERROR",
      "emailExistsMsg" : "This user already exists in IDHUB",
      "errorMsg" : "Something went wrong",
      "sendTempPwdFailMsg" : "Fail to Send Temp Password",
      "userCreationSuccess" : "User is created successfully",
      "updateUserSuccess" : "User updated successfully",
      "userCreationFail" : "User creation fail",
      "updateUserFail" : "Update user fail",
      "createUserForm" : "Create User Form",
      "updateUserForm" : "Update User Form"
  },

  "heading" : {
  },
  "buttons" : {
  }

}



module.exports = {
  "DB": {
    "HOST": "localhost",
    "USER": "root",
    "PSWD": "Admin@123",
    "DB_NAME": "tcms",
    "PORT": "3306"
  },
  "Columns":{
    "transportEntry":[
      {"key":"invoice_no", "name": "Invoice No", "resizable": true},
      {"key":"bill_date", "name": "Bill Date" , "resizable": true},
      {"key":"party", "name": "Party" , "resizable": true},
      {"key":"item_desc", "name": "Item Description", "resizable": true},
      {"key":"amount", "name": "Amount"},
      {"key":"cgst", "name": "Cgst"},
      {"key":"sgst", "name": "Sgst"},
      {"key":"igst", "name": "Igst"},
      {"key":"total", "name": "Total"},
      {"key":"transporter", "name": "Transporter", "resizable": true},
      {"key":"lr_no", "name": "LR No"},
      {"key":"booking_stn", "name": "Booking Station", "resizable": true},
      {"key":"bilty_date", "name": "Bilty Date", "resizable": true},
      {"key":"bale_qty", "name": "Bale Quantity"},
      {"key":"weight", "name": "Weight"},
      {"key":"freight", "name": "Freight"},
      {"key":"bale_numbers", "name": "Bale Numbers", "resizable": true},
      {"key":"bale_type", "name": "Bale Type", "resizable": true},
  ]

}
}

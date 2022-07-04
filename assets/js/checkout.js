
    
    var getEl = document.getElementById.bind(document);
    var formatter = Razorpay.setFormatter(getEl("parent-form"));
    var cvvField = getEl('card_cvv');
    
    
    formatter.add('card', getEl('card_number'))
      .on('network', function(o) {
    
        var type = this.type; // e.g. 'visa'
    
        // set length of cvv element based on amex card
        var cvvlen = type === 'amex' ? 4 : 3;
        cvvField.maxLength = cvvlen;
        cvvField.pattern = '^[0-9]{' + cvvlen + '}$';
    
        getEl('card_type').innerHTML = type;
      })
      .on('change', function() {
        var isValid = this.isValid();
        getEl('card_valid').innerHTML = isValid ? 'valid' : 'invalid';
    
        // automatically focus next field if card number is valid and filled
        if (isValid && this.el.value.length === this.caretPosition) {
          getEl('card_expiry').focus();
        }
      })
    
    formatter.add('expiry', getEl('card_expiry'))
      .on('change', function() {
        var isValid = this.isValid();
        getEl('expiry_valid').innerHTML = isValid ? 'valid' : 'invalid';
    
        // automatically focus next field if card number is valid and filled
        if (isValid && this.el.value.length === this.caretPosition) {
          getEl('card_cvv').focus();
        }
      })
    
      // method specific fields
      
    
    
    function pay(){
        console.log("Asdasd");
    // has to be placed within user initiated context, such as click, in order for popup to open.
    var data = {
      amount: '<%= amount %>', // in currency subunits. Here 1000 = 1000 paise, which equals to ₹10
      currency: "INR",// Default is INR. We support more than 90 currencies.
      email: 'Vijay.kumar@example.com',
      contact: '95489*****',
      notes: {
        address: 'Ground Floor, SJR Cyber, Laskar Hosur Road, Bengaluru',
      },
      order_id: '<%= order_id %>',// Replace with Order ID generated in Step 4
      method: 'card',
      card:{
        number: $("#card_number").val(),
        name: $("#name").val(),
        expiry_month: parseInt($('#card_expiry').val().split('/')[0]),
        expiry_year: parseInt($('#card_expiry').val().split('/')[1]),
        cvv: parseInt($('#card_cvv').val())
      }
    };
    console.log("data:",data);
    razorpay.createPayment(data);
    
    
    razorpay.on('payment.success', function(resp) {
      swal("Success!", "Your payment is sucess", "success");
      $.ajax({
        url: '/razorpay/pay-verify',
        type: 'POST',
        data: {
          razorpay_payment_id: resp.razorpay_payment_id,
          razorpay_order_id: resp.razorpay_order_id,
          razorpay_signature: resp.razorpay_signature,
        },
          success:function(data)
          {
            alert("payment done");
          }, error: function(error){
                    console.log(error.responseText);
              }
        })
    }); // will pass payment ID, order ID, and Razorpay signature to success handler.
      razorpay.on('payment.error', function(resp){swal("Error", "Your payment cannot be happend contact to admin", "error");}); // will pass error object to error handler
    };
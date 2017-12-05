/**
 * @casestudy Calvin Schmidt
 */

goog.require('goog.dom');
goog.require('goog.json');
goog.require('goog.proto2.ObjectSerializer');
goog.require('goog.string.StringBuffer');
goog.require('i18n.phonenumbers.AsYouTypeFormatter');
goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberType');
goog.require('i18n.phonenumbers.PhoneNumberUtil');
goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');

function getValidation(form) {
  var xhr = new XMLHttpRequest(), method = "GET", url = "https://6ryfkdjpzc.execute-api.eu-central-1.amazonaws.com/dev/experiment/?url=evaluatevalidate&type=json";
  xhr.open(method, url, true);
  xhr.withCredentials = true;
  xhr.addEventListener('load', function(event) {
    if (xhr.DONE && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var variant = parseInt(response["ca7509b0-d1f5-11e7-9f93-dfe0bf0c1a6e"],10);
      var result;
      switch (variant) {
        case 0:
          result = emailRegExParser();
          break;
        case 1:
          result = emailFullRegExParser();
          break;
        case 2:
          result = phoneNumberParser();
          break;
        case 3:
          result = phoneNumberRegExParser();
          break;
      }
      if (result) {
        var $ = goog.dom.getElement;
        $('success').style.display = 'block';
        var xhreq = new XMLHttpRequest(), method = "GET", url = "https://6ryfkdjpzc.execute-api.eu-central-1.amazonaws.com/dev/experiment/track/vgrvz249kwmryu79x75z08yqkmh4vqvzryz";
        xhreq.open(method, url, true);
        xhreq.withCredentials = true;
        xhreq.addEventListener('load', function(event) {
          if (xhreq.DONE && xhreq.status === 200) {
            return form.submit();
          }
        });
        xhreq.send();
      }
      else {
        return form.submit();
      }
    }
  });
  xhr.send();
}

function emailRegExParser() {
  try {
    var $ = goog.dom.getElement;
    var email = $('email').value;
    var regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (regex.test(email));
  }
  catch (e) {
    $('failure').style.display = 'block';
    window.alert("Invalid email address provided. Validation not possible!\nError: " + e);
  }
}

function emailFullRegExParser() {
  try {
    var $ = goog.dom.getElement;
    var email = $('email').value;
    var regex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])");
    return (regex.test(email));
  }
  catch (e) {
    $('failure').style.display = 'block';
    window.alert("Invalid email address provided. Validation not possible!\nError: " + e);
  }
}

function phoneNumberRegExParser() {
  try {
    var $ = goog.dom.getElement;
    var phoneNumber = $('phoneNumber').value;
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return (regex.test(phoneNumber));
  }
  catch (e) {
    $('failure').style.display = 'block';
    window.alert("Invalid phone number provided. Validation not possible!\nError: " + e);
  }
}

function phoneNumberParser() {
  try {
    var $ = goog.dom.getElement;
    var phoneNumber = $('phoneNumber').value;
    var regionCode = "";
    var carrierCode = "";
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
    var isPossible = phoneUtil.isPossibleNumber(number);
    if (!isPossible) {
      var PNV = i18n.phonenumbers.PhoneNumberUtil.ValidationResult;
      switch (phoneUtil.isPossibleNumberWithReason(number)) {
        case PNV.INVALID_COUNTRY_CODE:
          console.log('INVALID_COUNTRY_CODE');
          break;
        case PNV.TOO_SHORT:
          console.log('TOO_SHORT');
          break;
        case PNV.TOO_LONG:
          console.log('TOO_LONG');
          break;
      }
      return false;
    }
    else {
      var isNumberValid = phoneUtil.isValidNumber(number);
      if (!isNumberValid) {
        console.log('NUMBER INVALID');
        return false;
      }
      var PNT = i18n.phonenumbers.PhoneNumberType;
      var numberType = phoneUtil.getNumberType(number);
      if (numberType !== PNT.MOBILE && numberType !== PNT.FIXED_LINE_OR_MOBILE) {
        return false;
      }
    }
    return true;
  }
  catch (e) {
    $('failure').style.display = 'block';
    window.alert("Invalid phone number provided. Validation not possible!\nError: " + e);
  }
}

goog.exportSymbol('phoneNumberParser', phoneNumberParser);
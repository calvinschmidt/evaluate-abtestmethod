/**
 * @license
 * Copyright (C) 2010 The Libphonenumber Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview  Phone Number Parser Demo.
 *
 * @author Nikolaos Trogkanis
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

function createInstance() {
  var file = {"groups": [], "projectId": "9500982220", "experiments": [{"status": "Running", "audienceIds": [], "variations": [{"id": "9504193299", "key": "0"}, {"id": "9500892522", "key": "1"}, {"id": "9496992037", "key": "2"}, {"id": "9525691499", "key": "3"}], "id": "9504162394", "key": "Validation", "layerId": "9522624127", "trafficAllocation": [{"entityId": "9496992037", "endOfRange": 2500}, {"entityId": "9500892522", "endOfRange": 5000}, {"entityId": "9504193299", "endOfRange": 7500}, {"entityId": "9525691499", "endOfRange": 10000}], "forcedVariations": {}}, {"status": "Running", "audienceIds": [], "variations": [{"id": "9506392484", "key": "0"}, {"id": "9506112323", "key": "1"}], "id": "9556530964", "key": "Form", "layerId": "9520991658", "trafficAllocation": [{"entityId": "9506112323", "endOfRange": 5000}, {"entityId": "9506392484", "endOfRange": 10000}], "forcedVariations": {}}], "audiences": [], "version": "2", "attributes": [], "accountId": "9501622533", "events": [{"experimentIds": ["9504162394"], "id": "9501663564", "key": "validated"}, {"experimentIds": ["9556530964"], "id": "9503173970", "key": "submit"}], "revision": "10"};
  return optimizelyClient.createInstance({ datafile: file });
}

function generateForm(id, instance) {
  var variant = parseInt(instance.activate("Form", id),10);
  switch (variant) {
    case 0:
      document.getElementById("formfield").innerHTML = "<label for=\"email\">Specify an email address:</label><input type=\"text\" name=\"email\" id=\"email\" size=\"25\" />";
      break;
    case 1:
      document.getElementById("formfield").innerHTML = "<label for=\"phoneNumber\">Specify a Phone Number (starting with a +, e.g +49):</label><input type=\"text\" name=\"phoneNumber\" id=\"phoneNumber\" size=\"25\" />";
      break;
  }
}

function validateForm(id, instance, form) {
  var variant = parseInt(instance.activate("Validation", id),10);
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
    instance.track('submit', id);
    instance.track('validated', id);
  }
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

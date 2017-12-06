# Info

The evaluation of the developed ab testing method from the bachelor thesis "Design und Entwicklung eines A/B-Testing Systems basierend auf Serverless Computing"

# How to setup 

1.  We will need to checkout Google's JavaScript library libphonenumber amongst its dependencies. So checkout:

* `git clone https://github.com/calvinschmidt/evaluate-abtestmethod.git`

* `git clone https://github.com/googlei18n/libphonenumber/`

* `git clone https://github.com/google/closure-library/`

* `git clone https://github.com/google/closure-compiler.git`

* `git clone https://github.com/google/closure-linter.git`

* `git clone https://github.com/google/python-gflags.git`

2. Run the unit tests to make sure everything is working. Open the following pages with your web browser:
  `libphonenumber/javascript/i18n/phonenumbers/phonenumberutil_test.html`
  `libphonenumber/javascript/i18n/phonenumbers/asyoutypeformatter_test.html`

3. Run the Optimizely demo: `evaluate-abtestmethod/demo.html`
4. Run the systems demo: `evaluate-abtestmethod/demo_system.html`

# How to use

Ideally use Google's Chrome Browser and open the integrated developer tools to get access to cookies and disable the cache! If you do not disable the cache, cookies may not be reset and the functionality in all cases can not be demonstrated.

1. To run the Optimizely demo, open `evaluate-abtestmethod/demo.html`, type a valid value into the form field and submit the form. Very soon you will run into errors as there are no dependencies defined.
1. To run the own systems demo, open `evaluate-abtestmethod/demo_system.html`, type a valid value into the form field and submit the form. There are dependencies defined, so you will always get a success message (if you provide a valid input). To reset the current variant, delete all cookies. The relevant cookies start with `ISEAB...`

# How to provide valid inputs

1. A phone number must be in international format starting with a +, e.g. +491631737743
2. An email address is well-defined, e.g. support@telekom.de

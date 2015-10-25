/* globals angular */
var app = angular.module('shuffling', []);

app.controller('FormController', [function(){

    var vm = this;
    vm.localStorageKey = 'OCSHPN';

    /* form cache; all Strings */
    vm.fname = '';
    vm.lname = '';
    vm.txdate = '';
    vm.loc = '';

    /*
        RECORD CRUD STACK
    */

    /*
    PURPOSE: adds a cached user's info to localStorage
    ARGUMENTS: void
    RETURN: void
    POSSIBLE ERRORS: localStorage might not accept record but unlikely
    */
    vm.addNewRecord () {
        var record = vm.newRecord( fname, lname, txdate, loc );
        // TODO: Get the manifest
        // TODO: Push the new record to the manifest
        // TODO: Save the manifest
        // TODO: Clear the cache
    };

    /*
    PURPOSE: returns a person record based on passed values
    ARGUMENTS: vales can be null
    RETURN: void
    POSSIBLE ERRORS: record could be null but unlikely
    */
    vm.newRecord = function ( fname, lname, txdate, loc ) {
        // id as date; computationally cheap and good enough here
         var id = new Date();
         var record = {
            fname:fname,
            lname:lname,
            txdate:txdate,
            loc:loc,
            id:id,
            deleted:false
        };
        return record;
    };

    /*
        REGISTER CRUD STACK
    */

    /*
    PURPOSE: prepopulates register if needed
    ARGUMENTS: void
    RETURN: array of json objects
    POSSIBLE ERRORS: TODO
    */
    vm.createRegister = function() {

    };

    /*
    PURPOSE: pulls the register in localStorage
    ARGUMENTS: void
    RETURN: array of json objects
    POSSIBLE ERRORS: TODO
    */
    vm.retrieveRegister = function() {

    };

    /*
    PURPOSE: pushes the register to localStorage
    ARGUMENTS: void
    RETURN: void
    POSSIBLE ERRORS: TODO
    */
    vm.updateRegister = function( manifest ) {

    };

    /*
        TAB PANE 1 STACK: RECORD VIEW
    */

    /*
        TAB PANE 2 STACK: REGISTER VIEW
    */

}]);

app.controller('TabController', [function(){

}]);

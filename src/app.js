/* globals angular */
var app = angular.module('shuffling', []);

app.controller('FormController', [function(){

    var vm = this;

    // private key for localStorage
    vm._lsKey = 'OCSHPN';

    /*
        RECORD CACHE
    */
    // private
    vm._recordCache = '';

    // public
    vm.fname = ''; // string
    vm.lname = ''; // string
    vm.txdate = ''; // string
    vm.loc = ''; // string
    vm.registerCache = ''; // array



    /*
        RECORD CRUD STACK

        Record operations are handled as atomic tasks, with each interacting with
        localStorage via the register CRUD functions. This is inefficient when
        scaled, but good enough for this project.

        Record operations only work with the actual array of records. All JSON
        operations are handled in the register CRUD functions.
    */

    /*
    PURPOSE: adds a cached user's info to localStorage
    ARGUMENTS: void
    RETURN: void
    */
    vm.createRecord = function () {
        var record = vm._newRecord( vm.fname, vm.lname, vm.txdate, vm.loc );
        vm.retrieveRegister();
        vm.registerCache.push( record );
        vm.updateRegister();
        vm._clearRecordCache();
    };

    /*
    PURPOSE: gets the editable info for a record and posts to the cache
    ARGUMENTS: record id as string
    RETURN: void
    */
    vm.retrieveRecord = function ( id ) {
        /*
        console.log('retrieveRecord');
        vm.registerCache = vm.retrieveRegister();
        vm._recordCache = vm._getRecordByID( id );
        if ( !vm._recordCache ) {
            console.log('record ' + id + ' could not be found');
            return;
        }
        // populate the cache with the record info
        vm.fname = vm._recordCache.fname;
        vm.lname = vm._recordCache.lname;
        vm.txdate = vm._recordCache.txdate;
        vm.loc = vm._recordCache.loc;
        */
    };

    /*
    PURPOSE: updates the editable info for a cached record
    ARGUMENTS: record id as string
    RETURN: void
    */
    vm.updateRecord = function ( id ) {
        /*
        console.log('updateRecord');
        vm.registerCache = vm.retrieveRegister();
        vm._recordCache = vm._getRecordByID( id );
        if ( !vm._recordCache ) {
            console.log('record ' + id + ' could not be found');
            return;
        }
        vm._recordCache.fname = vm.fname;
        vm._recordCache.lname = vm.lname;
        vm._recordCache.txdate = vm.txdate;
        vm._recordCache.loc = vm.loc;
        var ubound = vm.registerCache.length;
        // doing this search twice is bad
        for (var i = 0; i < ubound; i++) {
            var record = vm.registerCache[i];
            if ( record.id === id ) {
                vm.registerCache[i] = vm._recordCache;
                vm.updateRegister( vm.registerCache );
                vm._clearRecordCache();
            }
        }
        */
    };

    /*
    PURPOSE: deletes a record from the register
    ARGUMENTS: record id as string
    RETURN: void
    */
    vm.deleteRecord = function ( id ) {
        /*
        console.log('deleteRecord');
        vm.registerCache = vm.retrieveRegister();
        vm._recordCache = vm._getRecordByID( id );
        if ( !vm._recordCache ) {
            console.log('record ' + id + ' could not be found');
            return;
        }
        vm._recordCache.deleted = true;
        vm.updateRegister( vm.registerCache );
        */
    };



    /*
        REGISTER CRUD STACK

        This stack handles all JSON operations and localStorage. Functions only
        accept and return the actual register array of records.
    */

    /*
    PURPOSE: prepopulates register if needed
    ARGUMENTS: void
    RETURN: void
    */
    vm.createRegister = function() {
        // init the store
        vm.registerCache = [];
        vm.updateRegister();
        // prepopulate with dummy values
        vm.fname = 'Tyler';
        vm.lname = 'Durden';
        vm.txdate = new Date();
        vm.loc = 'Boston';
        vm.createRecord();

        vm.fname = 'Robert';
        vm.lname = 'Paulson';
        vm.txdate = new Date();
        vm.loc = 'Chicago';
        vm.createRecord();
    };

    /*
    PURPOSE: pulls the register from localStorage
    ARGUMENTS: void
    RETURN: void
    */
    vm.retrieveRegister = function() {
        var str = localStorage.getItem( vm._lsKey );
        // extract the array of records
        var cache = JSON.parse( str );
        console.log('retrieveRegister.str = ' + str);
        vm.registerCache = cache.register;
    };

    /*
    PURPOSE: pushes the register to localStorage
    ARGUMENTS: array of JSON objects
    RETURN: void
    */

    vm.updateRegister = function() {

        // wrap the array of records in a JSON object
        var cache = {
            'register' : vm.registerCache
        };
        var str = JSON.stringify( cache );
        localStorage.setItem( vm._lsKey, str );
        // log output per project spec
        //console.log( 'register:' + vm.registerCache );
        //console.log( 'json:' + str );

    };

    /* CRUD STACK */

    /*
    PURPOSE: returns a person record based on passed values
    ARGUMENTS: values can be null
    RETURN: void
    */

    vm._newRecord = function ( fname, lname, txdate, loc ) {
        // id as date; computationally cheap and good enough here
         var id = new Date();
         var record = {
            'fname':fname + '',
            'lname':lname + '',
            'txdate':txdate + '',
            'loc':loc + '',
            'id':id + '',
            'deleted':false
        };
        return record;
    };

    /*
    PURPOSE: clears the cache values
    ARGUMENTS: void
    RETURN: void
    */
    vm._clearRecordCache = function () {
        vm.fname = '';
        vm.lname = '';
        vm.txdate = '';
        vm.loc = '';
        vm._recordCache = '';
    };

    /*
    PURPOSE: returns the index of an item in an array based on the id
    ARGUMENTS: target register, target id
    RETURN: integer or null if no value
    */
    vm._getRecordByID = function ( arr, id ) {
        var ubound = arr.length;
        for (var i = 0; i < ubound; i++) {
            var record = arr[i];
            if ( record.id === id ) {
                return i;
            }
        }
        return null;
    };

    /*
        VIEW STACK
        Manages the exchange of data between the view and the model
    */

    /*
        TAB PANE 1 STACK: RECORD VIEW
    */

    /*
        TAB PANE 2 STACK: REGISTER VIEW
    */

    // init the register
    vm.createRegister();

}]);

app.controller('TabController', [function(){

}]);

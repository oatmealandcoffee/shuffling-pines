/* globals angular */
var app = angular.module('shuffling', []);

/*
    Record creation helper
*/
app.factory('RecordFactory', [function(){
    var _createRecord = function(index){
        console.log(index);
    };
  return {
    createRecord: _createRecord
  };
}]);

/*
    RegisterFactory handles all low-level localStorage transactions.
    Data caches are held in GuestFactory
*/
app.factory('RegisterFactory', ['RecordFactory', function( RecordFactory ){
    var _foo = function () {
        return true
    };
    return {
        foo: _foo
    }
}]);
/*
    GuestFactory handles the interactions between the FormController and the RegisterFactory.
    Holds cache for the Registry (complete collection of Records).
    Creates public Guest list (Records that have not been soft-deleted)
*/
app.factory('GuestFactory', ['RegisterFactory', 'RecordFactory', function( RegisterFactory, RecordFactory ){
    var _foo = function () {
        return true
    };
    return {
        foo: _foo
    }
}]);

/*
    FormController manages the interactions betwen the View and the GuestFactory
    Holds cache for a Record being created in the Form tab
*/
app.controller('FormController', ['RegisterFactory', 'GuestFactory',  function( RegisterFactory, GuestFactory ){

    var vm = this;

    /*
        CACHES
        All CRUD operations point to these caches. There is only one record held
        in the Record cache. Records are pulled from the Registry cache, which is
        always pulled from and pushed to localStorage on each operation.
    */
    // private
    vm._recordCache = {};

    // public
    vm.guestname = '';
    vm.txdate = '';
    vm.loc = '';
    vm.status = '';
    vm.registerCache = [];

    // used to ensure that status updates go in the correct order
    vm.statusMap = {
        'Pick-up': 'Arrived',
        'Drop-off': 'Arrived',
        'Arrived': 'Pick-up'
    };


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

        var record = vm._newRecord( vm.guestname, vm.txdate, vm.status, vm.loc );
        vm.retrieveRegister();
        vm.registerCache.push( record );
        vm.updateRegister();
        vm._clearRecordCache();
        // TODO: switch to guests tab
    };

    /*
    PURPOSE: gets the editable info for a record and posts to the cache
    ARGUMENTS: record id as string
    RETURN: void
    */
    vm.retrieveRecord = function ( id ) {

        vm.retrieveRegister();
        var index = vm._getIndexByID( id );
        if ( index === null ) {
            console.log('record ' + index + ' could not be found');
            return;
        }
        // populate the cache with the record info
        vm._recordCache = vm.registerCache[index];
        vm.guestname = vm._recordCache.guestname;
        vm.txdate = vm._recordCache.txdate;
        vm.status = vm._recordCache.status;
        vm.loc = vm._recordCache.loc;

    };

    /*
    PURPOSE: updates the editable info for a cached record
    ARGUMENTS: record id as string, key-value pair as discrete strings
    RETURN: void
    */
    vm.updateRecord = function ( id, key, value ) {

        vm.retrieveRegister();
        var idx = vm._getIndexByID( id );
        vm._recordCache = vm.registerCache[idx];
        if ( !vm._recordCache ) {
            console.log('record ' + id + ' could not be found');
            return;
        }

        // check the key before making the update because certain properties have
        // particular rules that apply

        if ( key === 'id' || key === 'deleted' ) {
            // id is immutable
            // deleted should be handled via deleteRecord only
        } else if ( key === 'status' ) {
            // check to be sure that the passed value aligns with the map
            var currentStatus = vm._recordCache[key];
            vm._recordCache[key] = vm.statusMap[currentStatus];
        } else {
            vm._recordCache[key] = value;
        }
        // note the day and time, and then save
        vm._recordCache.txdate = new Date();
        vm.updateRegister();

    };

    /*
    PURPOSE: deletes a record from the register. This is the canonical way to delete
    a record; do not use updateRecord(id, 'deleted', true) as it will block you
    ARGUMENTS: record id as string
    RETURN: void
    */
    vm.deleteRecord = function ( id ) {

        vm.retrieveRegister();
        var index = vm._getIndexByID( id );
        vm._recordCache = vm.registerCache[ index ];
        if ( !vm._recordCache ) {
            console.log('record ' + index + ' could not be found');
            return;
        }
        vm._recordCache.deleted = true;
        vm.updateRegister();

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

        // init the register
        vm.updateRegister();
        // get the register to see if anything already exists
        vm.retrieveRegister();
        if ( vm.registerCache.length > 0 ) {
            return;
        }

        // prepopulate with dummy values
        vm.guestname = 'Tyler Durden';
        vm.txdate = new Date();
        vm.status = vm.statusMap.Arrived;
        vm.loc = 'Boston';
        vm.createRecord();

        vm.guestname = 'Robert Paulson';
        vm.txdate = new Date();
        vm.status = vm.statusMap.Arrived;
        vm.loc = 'Chicago';
        vm.createRecord();

    };

    /*
    PURPOSE: pulls the register from localStorage
    ARGUMENTS: void
    RETURN: void
    */
    vm.retrieveRegister = function() {

        var str = localStorage.getItem( 'OCSHPN' );
        // extract the array of records
        var json = JSON.parse( str );
        vm.registerCache = json.register;
    };

    /*
    PURPOSE: pushes the register to localStorage
    ARGUMENTS: array of JSON objects
    RETURN: void
    */
    vm.updateRegister = function() {

        // wrap the array of records in a JSON object
        var json = {};
        json.register = vm.registerCache;
        var str = JSON.stringify( json );
        localStorage.setItem( 'OCSHPN' , str );
        // log output per project spec
        console.log( str );

    };

    /* CRUD HELPER STACK */

    /*
    PURPOSE: returns a person record based on passed values
    ARGUMENTS: values can be null
    RETURN: void
    */

    vm._newRecord = function ( guestname, txdate, status, loc ) {
        // create a uuid; not computationally cheap but needed here as the project's
        // data points aren't granular enough with the speed of testing
        // citation: http://jsfiddle.net/briguy37/2mvfd/
         var id = function generateUUID() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c==='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
            };
         var record = {
            'guestname':guestname + '',
            'txdate':txdate + '',
            'status': status,
            'loc':loc + '',
            'id':id() + '',
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

        vm.guestname = '';
        vm.txdate = '';
        vm.status = '';
        vm.loc = '';
        vm._recordCache = '';

    };

    /*
    PURPOSE: returns the index of an item in an array based on the id
    ARGUMENTS: target register, target id
    RETURN: integer or null if no value
    */
    vm._getIndexByID = function ( id ) {

        var ubound = vm.registerCache.length;
        for (var i = 0; i < ubound; i++) {
            var record = vm.registerCache[i];
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
    var vm = this;

    vm.formTab = 1;
    vm.guestsTab = 2;

    vm.currentTab = vm.formTab;

}]);

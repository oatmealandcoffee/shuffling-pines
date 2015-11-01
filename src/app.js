/* globals angular */
var app = angular.module('shuffling', []);

/*
    RegisterFactory handles all data manipulation.
    * The complete collection of guests, regardless of state, is called the Register
    * An individual guest is maintained within a Record
    * The Guests list is the Register excluding soft-deleted Records
*/
app.factory('RegisterFactory', [function(){

    /*
        CACHES
        All CRUD operations point to these caches. There is only one record held
        in the Record cache. Records are pulled from the Registry cache, which is
        always pulled from and pushed to localStorage on each operation.
    */
    // private
    var _recordCache = {};

    // public
    var _guestname = '';
    var _txdate = '';
    var _loc = '';
    var _status = '';
    var _registerCache = [];

    // used to ensure that status updates go in the correct order
    var _statusMap = {
        'Pickup': 'Arrived',
        'Dropoff': 'Arrived',
        'Arrived': 'Pickup'
    };

    /*
        RECORD CRUD STACK

        Record operations are handled as atomic tasks, with each interacting with
        localStorage via the register CRUD functions.

        Record operations only work with the actual array of records. All JSON
        operations are handled in the register CRUD functions.
    */

    /*
    PURPOSE: adds a cached guest's info to localStorage
    ARGUMENTS: void
    RETURN: Register Array
    */
    var _createRecord = function ( guestname, txdate, status, loc ) {
        var record = _newRecord( guestname, txdate, status, loc );
        _retrieveRegister();
        _registerCache.push( record );
        _clearRecordCache();
        _updateRegister();
        return _registerCache;
    };

    /*
    PURPOSE: gets the editable info for a record and posts to the cache
    ARGUMENTS: record id as string
    RETURN: Record
    */
    var _retrieveRecord = function ( id ) {
        _retrieveRegister();
        var index = _getIndexByID( id );
        if ( index === null ) {
            console.log('record ' + index + ' could not be found');
            return;
        }
        return _registerCache[index];
    };

    /*
    PURPOSE: updates the editable info for a cached record
    ARGUMENTS: record id as string, key-value pair as discrete strings
    RETURN: Register Object
    */
    var _updateRecord = function ( id, key, value ) {

        _retrieveRegister();
        var index = _getIndexByID( id );
        if ( index === null ) {
            console.log('record ' + index + ' could not be found');
            return;
        }
        _recordCache = _registerCache[index];

        // check the key before making the update because certain properties have
        // particular rules that apply

        if ( key === 'id' || key === 'deleted' ) {
            return _registerCache;
        } else if ( key === 'status' ) {
            /*
            Status is updated per the statusMap. The current status is grabbed,
            and then the current status is used to capture the next expected
            status. The value is ignored.
            */
            var currentStatus = _recordCache[key];
            _recordCache[key] = _statusMap[currentStatus];
        } else {
            _recordCache[key] = value;
        }
        // note the day and time, and then save
        _recordCache.txdate = new Date();
        _updateRegister();
        return _registerCache;
    };

    /*
    PURPOSE: deletes a record from the register. This is the canonical way to delete
    a record; do not use updateRecord(id, 'deleted', true) as it will block you
    ARGUMENTS: record id as string
    RETURN: Register Array
    */
    var _deleteRecord = function ( id ) {

        _retrieveRegister();
        var index = _getIndexByID( id );
        if ( index === null ) {
            console.log('record ' + index + ' could not be found');
            return;
        }
        _recordCache = _registerCache[index];

        _recordCache.deleted = true;
        _updateRegister();
        return _registerCache;

    };

    var _guests = function () {

    };

    /*
        REGISTER CRUD STACK

        This stack handles all JSON operations and localStorage. Functions only
        accept and return the actual register array of records.
    */

    /*
    PURPOSE: prepopulates register if needed
    ARGUMENTS: void
    RETURN: Register Array
    */
    var _createRegister = function() {
        // init the register
        _updateRegister();
        // get the register to see if anything already exists
        _retrieveRegister();
        if ( _registerCache.length > 0 ) {
            return;
        }

        // prepopulate with dummy values
        _registerCache = _createRecord( 'Tyler Durden', new Date(), _statusMap.Dropoff, 'Boston' );
        _registerCache = _createRecord( 'Robert Paulson', new Date(), _statusMap.Dropoff, 'Chicago');

        return _registerCache;
    };

    /*
    PURPOSE: pulls the register from localStorage
    ARGUMENTS: void
    RETURN: Register Array
    */
    var _retrieveRegister = function() {
        var str = localStorage.getItem( 'OCSHPN' );
        // extract the array of records
        var json = JSON.parse( str );
        _registerCache = json.register;
        return _registerCache;
    };

    /*
    PURPOSE: pushes the register to localStorage
    ARGUMENTS: array of JSON objects
    RETURN: void
    */
    var _updateRegister = function() {
        // wrap the array of records in a JSON object
        var json = {};
        json.register = _registerCache;
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

    var _newRecord = function ( guestname, txdate, status, loc ) {
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
    var _clearRecordCache = function () {

        _guestname = '';
        _txdate = '';
        _status = '';
        _loc = '';
        _recordCache = '';

    };

    /*
    PURPOSE: returns the index of an item in an array based on the id
    ARGUMENTS: target register, target id
    RETURN: integer or null if no value
    */
    var _getIndexByID = function ( id ) {

        var ubound = _registerCache.length;
        for (var i = 0; i < ubound; i++) {
            var record = _registerCache[i];
            if ( record.id === id ) {
                return i;
            }
        }
        return null;

    };

    return {
        registerCache : _registerCache,
        createRecord : _createRecord,
        retrieveRecord : _retrieveRecord,
        updateRecord : _updateRecord,
        deleteRecord : _deleteRecord,
        guests : _guests,
        createRegister : _createRegister
    };
}]);

/*
    FormController manages the interactions betwen the View and the RegisterFactory
    Holds cache for a Record being created in the Form tab
*/
app.controller('FormController', ['RegisterFactory', function( RegisterFactory ){

    var vm = this;

    // private
    vm._recordCache = {};

    // public
    vm.guestname = '';
    vm.txdate = '';
    vm.loc = '';
    vm.status = '';
    vm.registerCache = [];

    /*
        RECORD CRUD STACK

        Record operations are handled as atomic tasks, with each interacting with
        localStorage via the register CRUD functions. This is inefficient when
        scaled, but good enough for this project.

        Record operations only work with the actual array of records. All JSON
        operations are handled in the register CRUD functions.
    */

    /*
    PURPOSE: pushes a cached user's info to RegisterFactory
    ARGUMENTS: void
    RETURN: void
    */
    vm.createRecord = function () {

        vm.registerCache = RegisterFactory.createRecord( vm.guestname,  vm.txdate, vm.status, vm.loc );
        vm._clearRecordCache();
    };

    vm._clearRecordCache = function () {
        vm._recordCache = {};
        vm.guestname = '';
        vm.txdate = ''
        vm.loc = '';
        vm.status = '';
    };

    /*
    PURPOSE: gets the editable info for a record and posts to the cache
    ARGUMENTS: record id as string
    RETURN: void
    */
    vm.retrieveRecord = function ( id ) {

        vm._recordCache = RegisterFactory.retrieveRecord( id );
        vm.guestname = vm._recordCache.guestname;
        vm.txdate = vm._recordCache.txdate;
        vm.loc = vm._recordCache.loc;
        vm.status = vm._recordCache.status;

    };

    /*
    PURPOSE: updates the editable info for a cached record
    ARGUMENTS: record id as string, key-value pair as discrete strings
    RETURN: void
    */
    vm.updateRecord = function ( id, key, value ) {

        vm.registerCache = RegisterFactory.updateRecord( id, key, value );

    };

    /*
    PURPOSE: deletes a record from the register. This is the canonical way to delete
    a record; do not use updateRecord(id, 'deleted', true) as it will block you
    ARGUMENTS: record id as string
    RETURN: void
    */
    vm.deleteRecord = function ( id ) {
        if (window.confirm("Do you really want to delete this guest record?")) {
            vm.registerCache = RegisterFactory.deleteRecord( id );
        }
    };

    /*
        REGISTER CRUD STACK

        This stack handles all JSON operations and localStorage. Functions only
        accept and return the actual register array of records.
    */

    /*
    PURPOSE: calls RegisterFactory to prepopulate if necesary
    ARGUMENTS: void
    RETURN: void
    */
    vm.createRegister = function() {

        vm.registerCache = RegisterFactory.createRegister();

    };

    vm.createRegister();

}]);

app.controller('TabController', [function(){
    var vm = this;

    vm.formTab = 1;
    vm.guestsTab = 2;

    vm.currentTab = vm.formTab;

}]);

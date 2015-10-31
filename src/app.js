/* globals angular */
var app = angular.module('shuffling', []);

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
    _createRecord = function () {

        RegisterFactory.guestname = _guestname;
        RegisterFactory.txdate = _txdate;
        RegisterFactory.loc = _loc;
        RegisterFactory.status = _status;
        RegisterFactory.createRecord();
        // TODO: switch to guests tab
    };

    /*
    PURPOSE: gets the editable info for a record and posts to the cache
    ARGUMENTS: record id as string
    RETURN: void
    */
    _retrieveRecord = function ( id ) {

        _retrieveRegister();
        var index = __getIndexByID( id );
        if ( index === null ) {
            console.log('record ' + index + ' could not be found');
            return;
        }
        // populate the cache with the record info
        __recordCache = _registerCache[index];
        _guestname = __recordCache.guestname;
        _txdate = __recordCache.txdate;
        _status = __recordCache.status;
        _loc = __recordCache.loc;

    };

    /*
    PURPOSE: updates the editable info for a cached record
    ARGUMENTS: record id as string, key-value pair as discrete strings
    RETURN: void
    */
    _updateRecord = function ( id, key, value ) {

        _retrieveRegister();
        var idx = __getIndexByID( id );
        __recordCache = _registerCache[idx];
        if ( !__recordCache ) {
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
            var currentStatus = __recordCache[key];
            __recordCache[key] = _statusMap[currentStatus];
        } else {
            __recordCache[key] = value;
        }
        // note the day and time, and then save
        __recordCache.txdate = new Date();
        _updateRegister();

    };

    /*
    PURPOSE: deletes a record from the register. This is the canonical way to delete
    a record; do not use updateRecord(id, 'deleted', true) as it will block you
    ARGUMENTS: record id as string
    RETURN: void
    */
    _deleteRecord = function ( id ) {

        _retrieveRegister();
        var index = __getIndexByID( id );
        __recordCache = _registerCache[ index ];
        if ( !__recordCache ) {
            console.log('record ' + index + ' could not be found');
            return;
        }
        __recordCache.deleted = true;
        _updateRegister();

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
    _createRegister = function() {

        // init the register
        _updateRegister();
        // get the register to see if anything already exists
        _retrieveRegister();
        if ( _registerCache.length > 0 ) {
            return;
        }

        // prepopulate with dummy values
        _guestname = 'Tyler Durden';
        _txdate = new Date();
        _status = _statusMap.Arrived;
        _loc = 'Boston';
        _createRecord();

        _guestname = 'Robert Paulson';
        _txdate = new Date();
        _status = _statusMap.Arrived;
        _loc = 'Chicago';
        _createRecord();

    };

    /*
    PURPOSE: pulls the register from localStorage
    ARGUMENTS: void
    RETURN: void
    */
    _retrieveRegister = function() {

        var str = localStorage.getItem( 'OCSHPN' );
        // extract the array of records
        var json = JSON.parse( str );
        _registerCache = json.register;
    };

    /*
    PURPOSE: pushes the register to localStorage
    ARGUMENTS: array of JSON objects
    RETURN: void
    */
    _updateRegister = function() {

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

    __newRecord = function ( guestname, txdate, status, loc ) {
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
    __clearRecordCache = function () {

        _guestname = '';
        _txdate = '';
        _status = '';
        _loc = '';
        __recordCache = '';

    };

    /*
    PURPOSE: returns the index of an item in an array based on the id
    ARGUMENTS: target register, target id
    RETURN: integer or null if no value
    */
    __getIndexByID = function ( id ) {

        var ubound = _registerCache.length;
        for (var i = 0; i < ubound; i++) {
            var record = _registerCache[i];
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
    _createRegister();

}]);

app.controller('TabController', [function(){
    var vm = this;

    _formTab = 1;
    _guestsTab = 2;

    _currentTab = _formTab;

}]);

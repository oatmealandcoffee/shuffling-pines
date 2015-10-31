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
        'Pick-up': 'Arrived',
        'Drop-off': 'Arrived',
        'Arrived': 'Pick-up'
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
    RETURN: void
    */
    var _createRecord = function () {
        var record = _newRecord( _guestname, _txdate, _status, _loc );
        _retrieveRegister();
        _registerCache.push( record );
        _updateRegister();
        _clearRecordCache();
    };

    var _retrieveRecord = function () {

    };

    var _updateRecord = function () {

    };

    var _deleteRecord = function () {

    };

    var _guests = function () {

    };

    /*
        REGISTER CRUD STACK

        This stack handles all JSON operations and localStorage. Functions only
        accept and return the actual register array of records.
    */

    var _createRegister = function() {

    };

    var _retrieveRegister = function() {

    };

    var _updateRegister = function() {

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
        guestname : _guestname,
        txdate : _txdate,
        loc : _loc,
        status : _status,
        createRecord : _createRecord,
        retrieveRecord : _retrieveRecord,
        deleteRecord : _deleteRecord,
        guests : _deleteRecord
    }
}]);

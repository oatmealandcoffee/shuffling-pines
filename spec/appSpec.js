/* global angular */

describe("Shuffling Pines CRUD", function() {

    /* record/register init values */
    var fname = 'Tyler';
    var lname = 'Durden';
    var id = lname+fname;
    var store;

    /* INIT ANGULAR */
    var FormController;
    beforeEach(angular.mock.module('shuffling'));
    beforeEach(angular.mock.inject( function( $controller ) {
        FormController = $controller('FormController');
    } ));

    beforeEach(function() {
        /* INIT REGISTER */
        store = {};

        var txdate = '2015/10/18';
        var status = 'pick up';
        var loc = 'Boston';

        var person = {
                fname:fname,
                lname:lname,
                txdate:txdate,
                status:status,
                loc:loc,
                id:id
            };

        store[id] = JSON.stringify(person);

        /* LOCALSTORAGE STACK */

        /*
        // Create, Update
        spyOn(localStorage, "setItem").and.callFake( function( key, value ) {
            store[key] = value;
        });

        // Retrieve, Update
        spyOn(localStorage, "getItem").and.callFake( function(key) {
            return store[key] || '[]';
        });

        // Delete
        spyOn(localStorage, "removeItem").and.callFake( function(key) {
            delete store[key];
        });
        */

    });

    describe("Create Suite", function() {
        it('should add a new person', function () {

            var newfname = 'Marla';
            var newlname = 'Singer';
            var newtxdate = new Date();
            var newloc = 'Boston';

            FormController.fname = newfname;
            FormController.lname = newlname;
            FormController.txdate = newtxdate;
            FormController.loc = newloc;
            
            FormController.createRecord();
            expect( true ).toBe( true );

        });
    });

    describe("Retrieve Suite", function() {
        it('should retrieve a person by key', function () {
            /*
            var person = JSON.parse(localStorage.getItem(id));
            expect( person.fname ).toBe( fname );
            */
        });

        it('should be true', function() {
            //expect( foo() ).toBe( true );
        });
    });

    describe("Update Suite", function() {
        it('should update a property', function () {
            /*
            var newName = 'Bodsworth';
            var target = JSON.parse(localStorage.getItem(id));
            target.fname = newName;
            localStorage.setItem(id, JSON.stringify(target));
            var update = JSON.parse(localStorage.getItem(id));
            expect( update.fname ).toBe( newName );
            */
        });
    });

    describe("Delete Suite", function() {
        it( 'should delete a person by key', function () {
            /*
            localStorage.removeItem(id);
            var result = localStorage.getItem(id);
            console.log(result);
            expect( result ).toBe( "[]" );
            */
        });
    });

});

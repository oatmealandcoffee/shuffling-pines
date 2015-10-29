/* global angular */

describe("Shuffling Pines CRUD", function() {

    /* INIT ANGULAR */
    var FormController;
    beforeEach(angular.mock.module('shuffling'));
    beforeEach(angular.mock.inject( function( $controller ) {
        FormController = $controller('FormController');
    } ));

    beforeEach(function() {
        /* LOCALSTORAGE STACK */

        var store = {};

        // Create, Update
        spyOn(localStorage, "setItem").and.callFake( function( key, value ) {
            store[key] = value;
        });

        // Retrieve, Update
        spyOn(localStorage, "getItem").and.callFake( function( key ) {
            return store[key];
        });

        // Delete
        spyOn(localStorage, "removeItem").and.callFake( function( key ) {
            delete store[key];
        });

        spyOn( localStorage, "clear").and.callFake( function () {
            store = {};
        });
    });

    afterEach(function() {
        localStorage.clear();
    });


    describe("Create Suite", function() {

        xit('should init new people', function () {

            expect( FormController.registerCache.length ).toBeGreaterThan( 0 );

        });

        it('should add a new person', function () {
            console.log('should add a new person');

            /*
            vm.fname = 'Tyler';
            vm.lname = 'Durden';
            vm.txdate = new Date();
            vm.loc = 'Boston';
            vm.createRecord();
            */

            FormController.fname = 'Marla';
            FormController.lname = 'Singer';
            FormController.txdate = new Date();
            FormController.loc = 'New York';

            var oldRegisterLength = FormController.registerCache.length;
            console.log( oldRegisterLength );

            FormController.createRecord();

            expect( FormController.registerCache.length ).toBeGreaterThan( oldRegisterLength );

            console.log('should add a new person');
        });
    });

    xdescribe("Retrieve Suite", function() {

    });

    xdescribe("Update Suite", function() {

    });

    xdescribe("Delete Suite", function() {

    });

});

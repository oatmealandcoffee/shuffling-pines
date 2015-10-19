describe("Shuffling Pines CRUD", function() {

    var store = [
        {
            fname:"Tyler",
            lname:"Durden",
            txdate:"2015/10/18",
            status:"pick up",
            loc:"Boston"
        },
        {
            fname:"Marla",
            lname:"Singer",
            txdate:"2015/10/18",
            status:"arrived",
            loc:"Boston"
        },
        {
            fname:"Robert",
            lname:"Paulson",
            txdate:"2015/10/18",
            status:"drop off",
            loc:"Boston"
        }
    ];

    beforeEach(function() {

        // Create, Update
        spyOn(localStorage, "setItem").and.callFake( function( key, value) {
            store[key] = value + '';
        });

        // Retrieve, Update
        spyOn(localStorage, "getItem").and.callFake( function(key) {
            return store[key] || '[]';
        });

        // Delete
        spyOn(localStorage, "removeItem").and.callFake( function(key) {
            delete store[key];
        });

    });

    describe("Create Suite", function() {
        it('should add a new person', function () {

            var person = {
                fname:"Raymond",
                lname:"Kessel",
                txdate:"2015/10/18",
                status:"drop off",
                loc:"Boston"
            };
            var preLen = store.length;
            localStorage.setItem(preLen, person);
            var postLen = store.length;
            expect( preLen ).toBeLessThan( postLen );

            });
    });

    describe("Retrieve Suite", function() {

    });

    describe("Update Suite", function() {

    });

    describe("Delete Suite", function() {

    });

    // stub test to obviate false failures
    it('should do something', function(){
      expect(true).toBe(true);
    });

});

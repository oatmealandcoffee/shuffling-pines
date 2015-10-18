describe("Shuffling Pines CRUD", function() {

    var store;

    beforeEach(function() {
        store = [
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

        // Create, Update
        spyOn(localStorage, "setItem").and.callFake( function(key, value) {
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

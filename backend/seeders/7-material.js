module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Material', [
            {

                name: "Brick Pavers",
                quantity: 3,
                price: 4.51,
                isBillable: false,
                type: "consumable",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {

                name: "Doors, Frames & Hardware",
                quantity: 18,
                price: 168.85,
                isBillable: false,
                type: "consumable",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {

                name: "Drywall & Acoustical (FED)",
                quantity: 12,
                price: 14,
                isBillable: false,
                type: "consumable",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {

                name: "Wall Protection",
                quantity: 4,
                price: 3,
                isBillable: true,
                type: "consumable",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {

                name: "Soft Flooring and Base",
                quantity: 9,
                price: 10.5,
                isBillable: true,
                type: "consumable",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {

                name: "Overhead Doors",
                quantity: 2,
                price: 500,
                isBillable: false,
                type: "consumable",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {

                name: "Roofing (Metal)",
                quantity: 14,
                price: 21.84,
                isBillable: true,
                type: "consumable",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {

                name: "Retaining Wall",
                quantity: 3,
                price: 23.51,
                isBillable: false,
                type: "consumable",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {

                name: "Glass & Glazing",
                quantity: 4,
                price: 41.25,
                isBillable: false,
                type: "consumable",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Bulldozer",
                quantity: 4,
                price: 161.00,
                type: "static",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Grader",
                quantity: 5,
                price: 105.00,
                type: "static",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Crawler",
                quantity: 5,
                price: 88,
                type: "static",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Scraper",
                quantity: 6,
                price: 212.00,
                type: "static",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Compactor",
                quantity: 10,
                price: 158,
                type: "static",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Crawler",
                quantity: 3,
                price: 133.00,
                type: "static",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Dump Truck",
                quantity: 2,
                price: 92.00,
                type: "static",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Excavator",
                quantity: 6,
                price: 204.00,
                type: "static",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Fiber Cement",
                quantity: 3,
                price: 6.10,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "EIFS",
                quantity: 2,
                price: 82.00,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Metal Wall Panels",
                quantity: 6,
                price: 233.00,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Masonry veneer",
                quantity: 10,
                price: 158.00,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Metal coatings",
                quantity: 32,
                price: 100.55,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Natural stone",
                quantity: 600,
                price: 54.00,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Oriented strand board",
                quantity: 20,
                price: 18.70,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Laminated strand lumber",
                quantity: 10,
                price: 11.00,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Premium Lamination Adhesive",
                quantity: 21,
                price: 46.00,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Normal Lamination glue",
                quantity: 50,
                price: 10.69,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Dimensional lumber 2x4",
                quantity: 23,
                price: 12.62,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Raised panel",
                quantity: 23,
                price: 20.96,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            ,
            {
                name: "Adobe",
                quantity: 25,
                price: 200.00,
                type: "consumable",
                isBillable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Material', null, {});
    }
};
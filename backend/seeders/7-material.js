module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Material', [
            {
                idMaterial: 1,
                name: "Brick Pavers",
                quantity: 3,
                price: 4.51,
                isBillable: false,
                type: "consumable", 
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idMaterial: 2,
                name: "Doors, Frames & Hardware",
                quantity: 18,
                price: 168.85,
                isBillable: false,
                type: "consumable", 
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idMaterial: 3,
                name: "Drywall & Acoustical (FED)",
                quantity: 12,
                price: 14,
                isBillable: false,
                type: "consumable", 
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idMaterial: 4,
                name: "Wall Protection",
                quantity: 4,
                price: 3,
                isBillable: true,
                type: "consumable", 
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idMaterial: 5,
                name: "Soft Flooring and Base",
                quantity: 9,
                price: 10.5,
                isBillable: true,
                type: "consumable", 
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idMaterial: 6,
                name: "Overhead Doors",
                quantity: 2,
                price: 500,
                isBillable: false,
                type: "consumable", 
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idMaterial: 7,
                name: "Roofing (Metal)",
                quantity: 14,
                price: 21.84,
                isBillable: true,
                type: "consumable", 
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idMaterial: 8,
                name: "Retaining Wall",
                quantity: 3,
                price: 23.51,
                isBillable: false,
                type: "consumable", 
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idMaterial: 9,
                name: "Glass & Glazing",
                quantity: 4,
                price: 41.25,
                isBillable: false,
                type: "consumable",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Material', null, {});
    }
};
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Project', [{
        name: 'Test',
        idPerson: 1,
        status: 'Accepted',
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "1-550 - Vehicular Access and Parking",
        idPerson: 1,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "9-800 - Acoustical Treatment",
        idPerson: 2,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "14-600 - Hoists and Cables",
        idPerson: 3,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "14-700 - Turntables",
        idPerson: 4,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "10-290 - Pest Control",
        idPerson: 5,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "1-520 - Construction Facilities",
        idPerson: 6,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "11-500 - Industrial and Process Equipment",
        idPerson: 7,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "13-150 - Swimming Pools",
        idPerson: 8,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "13-010 - Air-Supported Structures",
        idPerson: 9,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "12-600 - Multiple Seating",
        idPerson: 10,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "16 - Electrical",
        idPerson: 11,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "9-100 - Metal Support Assemblies",
        idPerson: 12,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "8-050 - Basic Door and Window Materials and Methods",
        idPerson: 13,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "13-400 - Measurement and Control Instrumentation",
        idPerson: 14,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "13-280 - Hazardous Material Remediation",
        idPerson: 15,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "10-300 - Fireplaces and Stoves",
        idPerson: 16,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "7-900 - Joint Sealers",
        idPerson: 17,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "2-824 - Wire Fences and Gates",
        idPerson: 18,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "13-200 - Storage Tanks",
        idPerson: 19,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "9-400 - Terrazzo",
        idPerson: 20,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "11-680 - Office Equipment",
        idPerson: 21,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "3-310 - Expansion Joints",
        idPerson: 22,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "17-040 - Profit",
        idPerson: 23,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "13-600 - Solar and Wind Energy Equipment",
        idPerson: 24,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "13-900 - Fire Suppression",
        idPerson: 25,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "2-784 - Stone Unit Pavers",
        idPerson: 26,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "2-932 - PLants and Bulbs",
        idPerson: 27,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "6-400 - Architectural Woodwork",
        idPerson: 28,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "2-782 - Brick Pavers",
        idPerson: 29,
        status: "Accepted",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
        name: "9-700 - Wall Finishes",
        idPerson: 30,
        status: "Pre-Sale",
        start_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
    ], {});
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Project', null, {});
    }
  };
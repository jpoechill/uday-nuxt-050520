export default {
  udayDb: {
    superadmins: [
      {
        id: 'su001',
        name: 'Super Admin'
      }
    ],
    clusters: {
      cluster001: {
        admins: [],
        patientsInQueue: [],
        mds: [
          {
            id: "md001",
            status: "offline",
            allocatedPatients: [],
            demographics: {
              name: "Dr. Abhigyan Bose"
            }
          }, 
          {
            id: "md002",
            status: "offline",
            allocatedPatients: [],
            demographics: {
              name: "Dr. Ritwika Ghosh"
            }
          },
        ],
        has: [
          {
            name: 'Ritwika Ghosh (RN)',
            id: 'ha0001',
            role: 'ha',
            status: 'online',
            cluster: 'cluster0001',
            bio: 'Hello, my name is Ritwika Ghosh, and I\'m studying to become a nurse! I\'m happy help you!',
            phone: '1-415-555-1234',
            address: '2222 Market Street',
            location: 'Calcutta, IN',
            email: ''
          }
        ],
        patients: []
      },
    }
  }
}
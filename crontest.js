const cron = require('node-cron');

let currentDate = new Date()
currentDate.setFullYear(new Date().getFullYear(), 9, 30);
let currentDate1 = new Date()

currentDate1.setFullYear(new Date().getFullYear(), 9, 30);
let currentDate2 = new Date()

currentDate2.setFullYear(new Date().getFullYear(), 9, 30)
let currentDate3 = new Date()

currentDate3.setFullYear(new Date().getFullYear(), 9, 30);
let currentDate4 = new Date()

currentDate4.setFullYear(new Date().getFullYear(), 9, 30);
let currentDate5 = new Date()

currentDate5.setFullYear(new Date().getFullYear(), 9, 30);
let currentDate6 = new Date()

currentDate6.setFullYear(new Date().getFullYear(), 9, 30);
console.log(currentDate)
let customersData = [
    {
      name: 'Customer 1',
      balance: 50000,
      isTaskActive: true,
    },
    
  ];
let carData = [
  {
    name: 'Car 1',
    abonnement : 6,
    plan: 250,
    next_paiement: currentDate.setMinutes(currentDate.getMinutes() + 7)
  },
  {
    name: 'Car 2',
    abonnement : 6,
    plan: 15,
    next_paiement: currentDate1.setMinutes(currentDate1.getMinutes() + 5)

  },
  {
    name: 'Car 3',
    abonnement :1,
    plan: 1300,
    next_paiement: currentDate2.setMinutes(currentDate2.getMinutes() + 1)
  },
  {
    name: 'Car 4',
    abonnement : 4,
    plan: 500,
    next_paiement: currentDate3.setMinutes(currentDate3.getMinutes() + 3)
  },
  {
    name: 'Car 5',
    abonnement : 6,
    plan: 700,
    next_paiement: currentDate4.setMinutes(currentDate4.getMinutes() + 9)
  },
  {
    name: 'Car 6',
    abonnement : 6,
    plan: 50,
    next_paiement: currentDate5.setMinutes(currentDate5.getMinutes() + 4)
  },
  {
    name: 'Car 7',
    abonnement : 6,
    plan: 600,
    next_paiement: currentDate6.setMinutes(currentDate6.getMinutes() + 10)
  },
  
];

let debit = 150;
console.log('I am here');
/*
const getNextDate = (current) =>{
    const diff
    (current.getDate()+30) > 30 ? 
}*/

cron.schedule('* * * * * *', () => {
  const activeCustomers = customersData.filter(customer => customer.isTaskActive);
  const activeCars = carData.filter(car => car.abonnement !== 0);
  const currentDate = new Date();
  currentDate.setFullYear(new Date().getFullYear(), 9, 30);

  for (const car of activeCars) {
    if (currentDate >= car.next_paiement) {
      car.abonnement -= 1;
      
      const nextPaymentDate = new Date(car.next_paiement); // Set the date to the 1st of the current month

      // Add 30 days to the current date (adjusting for varying month lengths)
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

      car.next_paiement = nextPaymentDate;

      console.log(`Car: ${car.name} has paid his monthly fee: ${car.plan} and his next date has been reset to ${car.next_paiement}`);
      
      if (activeCustomers.length > 0) {
        activeCustomers[0].balance -= car.plan;
        console.log(`Customer: ${activeCustomers[0].name} has paid his monthly fee for car: ${car.name}`);
      }
    }
  }
});
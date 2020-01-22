export const bookClubEvent = {
  host: {
    name: 'Alexandra Gergar',
    phone: '2154603298',
    email: 'alexandra.gergar@gmail.com',
  },
  bookForEvent: {
    name: 'Circe',
    author: 'Madeline Miller',
    isbn: '9781408890080',
    coverArt: 'circecover',
  },
  location: {
    streetAddress: '2144 California St NW',
    unitNumber: 'Apt 213',
    city: 'Washington',
    state: 'DC',
    zipcode: '20008',
  },
  date: 'Tue Feb 18',
  startTime: '6:00 PM',
  detailsForLocation:
    'At the call box, find me under Gergar and I can let you in',
  detailsForEvent: 'I have a dog so let me know if anyone is allergic',
  whatHostProvides: ['wine', 'cheese platter', 'seltzer'],
  whatGuestsProvides: {
      uid1: {
        guestName: 'Esther Song',
        whatTheyAreBringing: 'cups',
      },
      uid2: {
        guestName: 'Rachel Urban',
        whatTheyAreBringing: 'plates',
      },
      uid3: {
        guestName: 'Molly Canton',
        whatTheyAreBringing: 'rose',
    },
},
  attendees: [
    {
      uid1: {
        guestName: 'Esther Song',
        coming: true,
      },
    },
    {
      uid2: {
        guestName: 'Rachel Urban',
        coming: true,
      },
    },
    {
      uid3: {
        guestName: 'Molly Canton',
        coming: true,
      },
    },
    {
      uid4: {
        guestName: 'Jessica Smith',
        coming: false,
      },
    },
  ],
};

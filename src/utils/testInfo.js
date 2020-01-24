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
           bookDescription: `In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child—not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power—the power of witchcraft, which can transform rivals into monsters and menace the gods themselves.

Threatened, Zeus banishes her to a deserted island, where she hones her occult craft, tames wild beasts and crosses paths with many of the most famous figures in all of mythology, including the Minotaur, Daedalus and his doomed son Icarus, the murderous Medea, and, of course, wily Odysseus.

But there is danger, too, for a woman who stands alone, and Circe unwittingly draws the wrath of both men and gods, ultimately finding herself pitted against one of the most terrifying and vengeful of the Olympians. To protect what she loves most, Circe must summon all her strength and choose, once and for all, whether she belongs with the gods she is born from, or the mortals she has come to love.`,
           authorDescription: `Madeline Miller was born in Boston and grew up in New York City and Philadelphia. She attended Brown University, where she earned her BA and MA in Classics. For the last ten years she has been teaching and tutoring Latin, Greek and Shakespeare to high school students. She has also studied at the University of Chicago’s Committee on Social Thought, and in the Dramaturgy department at Yale School of Drama, where she focused on the adaptation of classical texts to modern forms. She currently lives in Cambridge, MA, where she teaches and writes. The Song of Achilles is her first novel. `,
           bookCoversFromAuthor: [
             '../utils/src/utils/gal.jpg',
             '../utils/src/utils/songofach.jpg',
             '../utils/src/utils/herculesbow.jpg',
           ],
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
           'At the call box, find me under Gergar and I can let you in, I have a dog so let me know if anyone is allergic',
         detailsForEvent: 'we are going to be discussing the parts that would involve dc as a whole',
         whatHostProvides: ['wine', 'cheese platter', 'seltzer'],
         whatGuestsProvides: [
           {
             uid: 'alsjdf830unasd93',
             guestName: 'Esther Song',
             whatTheyAreBringing: 'cups',
           },
           {
             uid: 'asd903rndkasdgu83d3',
             guestName: 'Rachel Urban',
             whatTheyAreBringing: 'plates',
           },
           {
             uid: 'imadg399dmmmsdfod3',
             guestName: 'Molly Canton',
             whatTheyAreBringing: 'rose',
           },
         ],
         attendees: [
           {
             guestName: 'Esther Song',
             coming: true,
           },
           {
             guestName: 'Rachel Urban',
             coming: true,
           },
           {
             guestName: 'Molly Canton',
             coming: true,
           },
           {
             guestName: 'Jessica Smith',
             coming: false,
           },
         ],
       };

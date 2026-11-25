/* =====================================================================
   ✏️  ALL WEDDING DETAILS LIVE HERE — one edit updates all four invites
   ===================================================================== */
window.DETAILS = {
  people: {
    nishtha: {
      name: "Nishtha",
      parents: "Daughter of Poorvi & Hitesh Mataliya"
    },
    akshay: {
      name: "Akshay",
      parents: "Son of Abhilasha & Atul Bhatia"
    }
  },

  monogram: "#Nishchay",                 // on the wax seal and the browser-tab icon
  invocation: "Shree Ganeshay Namah",   // opening slide only, under the Ganpati symbol
  inviteLine: "Join us for the wedding ceremony of",
  message: "We seek your divine blessings as they begin their new journey together.",

  /* The wedding day drives the countdown, the Save the Date and the calendar button. */
  dateTime: "2027-02-12T17:00:00+05:30",
  end:      "2027-02-12T22:00:00+05:30",
  dateShort: "12 FEBRUARY 2027",
  dateLong:  "12th February 2027",

  countdown: {
    title: "Until we tie the knot",
    note:  "Join us in our happiness"
  },

  /* Events. "side" limits an event to one version: "groom" = Akshay-first, "bride" = Nishtha-first.
     An event with no "side" appears on every invite. */
  days: [
    {
      label: "Day One", date: "Thursday, 11th February 2027", short: "11th February",
      start: "2027-02-11T08:00:00+05:30",
      venue: {
        name: "Gold Palace Inn Banquet",
        address: "6th Floor, Green Palladia, Opp. Raj World, Adajan",
        city: "Surat",
        mapQuery: "Gold Palace Inn Banquet, Adajan, Surat",
        mapLink: "https://share.google/bXHoFkRfWfuZTcnkz"
      },
      events: [
        { icon: "🌸", title: "Mandap Muhurat", time: "8:00 AM",
          text: "A traditional ceremony marking the beginning of our wedding celebrations, with prayers, blessings and rituals." },
        { icon: "💛", title: "Peethi & Pyaar", time: "Following Mandap Muhurat",
          text: "An intimate celebration filled with colours, laughter and blessings from family and loved ones." },
        { icon: "🎶", title: "Gala Dinner", time: "6:30 PM onwards",
          text: "An evening dedicated to bringing both families together, featuring fun games, music, entertainment and dinner." }
      ]
    },
    {
      label: "Day Two", date: "Friday, 12th February 2027", short: "12th February", wedding: true,
      start: "2027-02-12T08:00:00+05:30",
      venue: {
        name: "Shree Siddhivinayak Ganesh Mandir",
        address: "Adajan Gam",
        city: "Surat",
        mapQuery: "Shree Siddhivinayak Ganesh Mandir Adajan Gam",
        mapLink: "https://maps.app.goo.gl/otdpTtpX2Dft1S2m9"
      },
      events: [
        { icon: "🙏", title: "Grah Shanti", time: "9:00 AM onwards", side: "groom",
          text: "A traditional ceremony seeking divine blessings and prosperity for the new journey ahead." },
        { icon: "🥁", title: "Baarat Procession Begins", time: "3:30 PM", side: "groom",
          text: "The procession sets off with dhol, music and dancing all the way to the mandap." },
        { icon: "💐", title: "Baarat Swagat", time: "4:30 PM", side: "bride",
          text: "A warm welcome for the baraat, with dhol, music and festivities." },
        { icon: "❤️", title: "Wedding Ceremony", time: "5:00 PM",
          text: "The sacred union of two souls and two families, followed by the traditional wedding rituals and pheras." }
      ]
    }
  ],

  galleryTitle: "Moments on the way to forever",

  /* Sign-off. Each side has its own. */
  loveFrom: {
    title: "With lots of love",
    bride: { names: ["Aastha & Sundar Gadhiya"], photos: ["family1.jpg"] },
    groom: { names: ["Ami Bhatia"], photos: [] }
  },

  /* Extra family lines above the sign-off. */
  blessings: {
    bride: [],
    groom: [
      { title: "With blessings from their beloved grandparents",
        names: ["Late Lilaben Kanji Bhatia", "Late Mr. Jayantilal Bhatia", "Mrs. Chandrika Bhatia"] }
    ]
  },

  /* Pictures. To change one, replace the file with the same name. */
  cover: {                                         // the envelope: paper layers and the wax seal
    sides:  "cover-sides.jpg",
    bottom: "cover-bottom.jpg",
    top:    "cover-top.jpg",
    seal:   "seal.png"
  },
  ganesh:      "ganesh.png",          // the symbol on the opening slide
  coupleArt:   "couple-art.webp",      // the drawing on the opening slide
  invitePhoto: "invite-photo.jpg",     // the photograph on the invitation page
  photos: ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg", "photo5.jpg"],

  music: "song.mp3",
  musicStart: 0,
  musicVolume: 0.5
};

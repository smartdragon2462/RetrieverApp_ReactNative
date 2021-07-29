import deepfreeze from 'deep-freeze';
import addSelectedDocuments from './results-tools.js';

const searchResultsBefore = {
  total: 4,
  documents: [
    {
      docId: '00015320170901266055679',
      docDate: '2017-09-01T03:03:47',
      source: { id: 153, name: 'Dagen' },
      status: 'published',
      mediatype: 'web',
      wordCount: 1656,
      duplicateCount: 0,
      headline: 'Norges politiker friar till de kristna',
      intro:
        'Sylvi Listhaug, Fremskrittspartiet, och Knut Arild Hareide, Kristelig Folkeparti, gör det. Jonas Gahr Støre, Arbeiderpartiet, och Erna Solberg, Høyre, försöker också. Alla friar de till de kristna väljarna inför stortingsvalet. Men vilka är de?',
      profileData: [
        {
          profile: { id: 1139241, name: 'Nynorsk' },
          adValue: { amount: 8935.4661235, currency: 'SEK' }
        }
      ]
    },
    {
      docId: '00230420170701263556731',
      docDate: '2017-07-01T18:14:27',
      source: { id: 2304, name: 'VG Nett' },
      status: 'published',
      mediatype: 'web',
      byline: 'Emilie Solberg',
      wordCount: 822,
      duplicateCount: 0,
      headline: 'Erling Lae: - Kamp mot fordommer er evigvarende',
      intro:
        'Erling Lae har alltid stått frem som åpen homofil politiker. Han er glad for at flere toppolitikere velger å stå frem i dag.',
      profileData: [
        {
          profile: { id: 756288, name: 'Erna Solberg' },
          adValue: { amount: 1198961.5654646, currency: 'SEK' }
        }
      ]
    },
    {
      docId: '00230420170701263537951',
      docDate: '2017-07-01T06:13:59',
      source: { id: 2304, name: 'VG Nett' },
      status: 'published',
      mediatype: 'web',
      byline: 'Bjørn Grimstad',
      wordCount: 570,
      duplicateCount: 0,
      headline: 'Få partiledere går i årets Pride-parade',
      intro:
        'Trine Skei Grande og Rasmus Hansson er de eneste partitoppene som kommer til å gå på Pride-paraden lørdag. - Dette er viktig å gjøre for politiske ledere. Vi har langt igjen å gå for at folk kan leve livene sine uten å bli møtt av fordommer.',
      profileData: [
        {
          profile: { id: 981864, name: 'Rasmus Hansson' },
          adValue: { amount: 1198961.5654646, currency: 'SEK' }
        },
        {
          profile: { id: 872076, name: 'Jonas Gahr Støre' },
          adValue: { amount: 1198961.5654646, currency: 'SEK' }
        },
        {
          profile: { id: 907720, name: 'Knut Arild Hareide' },
          adValue: { amount: 1198961.5654646, currency: 'SEK' }
        },
        {
          profile: { id: 907722, name: 'Trygve Slagsvold Vedum' },
          adValue: { amount: 1198961.5654646, currency: 'SEK' }
        },
        {
          profile: { id: 756288, name: 'Erna Solberg' },
          adValue: { amount: 1198961.5654646, currency: 'SEK' }
        },
        {
          profile: { id: 907719, name: 'Trine Skei Grande' },
          adValue: { amount: 1198961.5654646, currency: 'SEK' }
        }
      ]
    },
    {
      docId: '00230520170701263539250',
      docDate: '2017-07-01T06:00:00',
      source: { id: 2305, name: 'Dagbladet' },
      status: 'published',
      mediatype: 'web',
      byline: 'marie simonsen',
      wordCount: 987,
      duplicateCount: 0,
      headline:
        'Pride 2017 - Skriv heller om at homofile blir drept i regimer som deler dine holdninger',
      intro:
        'Selv i Norge er angrep mot homofile akseptert. De siste dagene har homofile venner overøst sosiale medier med bilder fra Pride-uka, som kulminerer i formiddag med den store paraden i flere norske byer.',
      profileData: [
        {
          profile: { id: 907720, name: 'Knut Arild Hareide' },
          adValue: { amount: 582653.2542453, currency: 'SEK' }
        }
      ]
    }
  ],
  aggregations: { docId: [{ count: 4 }] },
  searchAfter: [1498881600000, 'retriever#00230520170701263539250_907720']
};

deepfreeze(searchResultsBefore);

describe('result-tools', () => {
  it('should add selected property to documents and set it to false', () => {
    const selection = [];
    const searchResultsAfter = {
      total: 4,
      selected: 0,
      documents: [
        {
          docId: '00015320170901266055679',
          docDate: '2017-09-01T03:03:47',
          source: { id: 153, name: 'Dagen' },
          status: 'published',
          mediatype: 'web',
          wordCount: 1656,
          duplicateCount: 0,
          selected: false,
          headline: 'Norges politiker friar till de kristna',
          intro:
            'Sylvi Listhaug, Fremskrittspartiet, och Knut Arild Hareide, Kristelig Folkeparti, gör det. Jonas Gahr Støre, Arbeiderpartiet, och Erna Solberg, Høyre, försöker också. Alla friar de till de kristna väljarna inför stortingsvalet. Men vilka är de?',
          profileData: [
            {
              profile: { id: 1139241, name: 'Nynorsk' },
              adValue: { amount: 8935.4661235, currency: 'SEK' }
            }
          ]
        },
        {
          docId: '00230420170701263556731',
          docDate: '2017-07-01T18:14:27',
          source: { id: 2304, name: 'VG Nett' },
          status: 'published',
          mediatype: 'web',
          byline: 'Emilie Solberg',
          wordCount: 822,
          duplicateCount: 0,
          selected: false,
          headline: 'Erling Lae: - Kamp mot fordommer er evigvarende',
          intro:
            'Erling Lae har alltid stått frem som åpen homofil politiker. Han er glad for at flere toppolitikere velger å stå frem i dag.',
          profileData: [
            {
              profile: { id: 756288, name: 'Erna Solberg' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            }
          ]
        },
        {
          docId: '00230420170701263537951',
          docDate: '2017-07-01T06:13:59',
          source: { id: 2304, name: 'VG Nett' },
          status: 'published',
          mediatype: 'web',
          byline: 'Bjørn Grimstad',
          wordCount: 570,
          duplicateCount: 0,
          selected: false,
          headline: 'Få partiledere går i årets Pride-parade',
          intro:
            'Trine Skei Grande og Rasmus Hansson er de eneste partitoppene som kommer til å gå på Pride-paraden lørdag. - Dette er viktig å gjøre for politiske ledere. Vi har langt igjen å gå for at folk kan leve livene sine uten å bli møtt av fordommer.',
          profileData: [
            {
              profile: { id: 981864, name: 'Rasmus Hansson' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 872076, name: 'Jonas Gahr Støre' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 907720, name: 'Knut Arild Hareide' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 907722, name: 'Trygve Slagsvold Vedum' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 756288, name: 'Erna Solberg' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 907719, name: 'Trine Skei Grande' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            }
          ]
        },
        {
          docId: '00230520170701263539250',
          docDate: '2017-07-01T06:00:00',
          source: { id: 2305, name: 'Dagbladet' },
          status: 'published',
          mediatype: 'web',
          byline: 'marie simonsen',
          wordCount: 987,
          duplicateCount: 0,
          selected: false,
          headline:
            'Pride 2017 - Skriv heller om at homofile blir drept i regimer som deler dine holdninger',
          intro:
            'Selv i Norge er angrep mot homofile akseptert. De siste dagene har homofile venner overøst sosiale medier med bilder fra Pride-uka, som kulminerer i formiddag med den store paraden i flere norske byer.',
          profileData: [
            {
              profile: { id: 907720, name: 'Knut Arild Hareide' },
              adValue: { amount: 582653.2542453, currency: 'SEK' }
            }
          ]
        }
      ],
      aggregations: { docId: [{ count: 4 }] },
      searchAfter: [1498881600000, 'retriever#00230520170701263539250_907720']
    };

    deepfreeze(selection);
    deepfreeze(searchResultsAfter);

    expect(addSelectedDocuments(searchResultsBefore, selection)).toEqual(
      searchResultsAfter
    );
  });

  it('should add selected property to documents and set first one true', () => {
    const selection = [
      {
        docId: '00015320170901266055679',
        service: 'MONITOR',
        profileIds: [1139241]
      }
    ];

    const searchResultsAfter = {
      total: 4,
      selected: 1,
      documents: [
        {
          docId: '00015320170901266055679',
          docDate: '2017-09-01T03:03:47',
          source: { id: 153, name: 'Dagen' },
          status: 'published',
          mediatype: 'web',
          wordCount: 1656,
          duplicateCount: 0,
          selected: true,
          headline: 'Norges politiker friar till de kristna',
          intro:
            'Sylvi Listhaug, Fremskrittspartiet, och Knut Arild Hareide, Kristelig Folkeparti, gör det. Jonas Gahr Støre, Arbeiderpartiet, och Erna Solberg, Høyre, försöker också. Alla friar de till de kristna väljarna inför stortingsvalet. Men vilka är de?',
          profileData: [
            {
              profile: { id: 1139241, name: 'Nynorsk' },
              adValue: { amount: 8935.4661235, currency: 'SEK' }
            }
          ]
        },
        {
          docId: '00230420170701263556731',
          docDate: '2017-07-01T18:14:27',
          source: { id: 2304, name: 'VG Nett' },
          status: 'published',
          mediatype: 'web',
          byline: 'Emilie Solberg',
          wordCount: 822,
          duplicateCount: 0,
          selected: false,
          headline: 'Erling Lae: - Kamp mot fordommer er evigvarende',
          intro:
            'Erling Lae har alltid stått frem som åpen homofil politiker. Han er glad for at flere toppolitikere velger å stå frem i dag.',
          profileData: [
            {
              profile: { id: 756288, name: 'Erna Solberg' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            }
          ]
        },
        {
          docId: '00230420170701263537951',
          docDate: '2017-07-01T06:13:59',
          source: { id: 2304, name: 'VG Nett' },
          status: 'published',
          mediatype: 'web',
          byline: 'Bjørn Grimstad',
          wordCount: 570,
          duplicateCount: 0,
          selected: false,
          headline: 'Få partiledere går i årets Pride-parade',
          intro:
            'Trine Skei Grande og Rasmus Hansson er de eneste partitoppene som kommer til å gå på Pride-paraden lørdag. - Dette er viktig å gjøre for politiske ledere. Vi har langt igjen å gå for at folk kan leve livene sine uten å bli møtt av fordommer.',
          profileData: [
            {
              profile: { id: 981864, name: 'Rasmus Hansson' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 872076, name: 'Jonas Gahr Støre' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 907720, name: 'Knut Arild Hareide' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 907722, name: 'Trygve Slagsvold Vedum' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 756288, name: 'Erna Solberg' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 907719, name: 'Trine Skei Grande' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            }
          ]
        },
        {
          docId: '00230520170701263539250',
          docDate: '2017-07-01T06:00:00',
          source: { id: 2305, name: 'Dagbladet' },
          status: 'published',
          mediatype: 'web',
          byline: 'marie simonsen',
          wordCount: 987,
          duplicateCount: 0,
          selected: false,
          headline:
            'Pride 2017 - Skriv heller om at homofile blir drept i regimer som deler dine holdninger',
          intro:
            'Selv i Norge er angrep mot homofile akseptert. De siste dagene har homofile venner overøst sosiale medier med bilder fra Pride-uka, som kulminerer i formiddag med den store paraden i flere norske byer.',
          profileData: [
            {
              profile: { id: 907720, name: 'Knut Arild Hareide' },
              adValue: { amount: 582653.2542453, currency: 'SEK' }
            }
          ]
        }
      ],
      aggregations: { docId: [{ count: 4 }] },
      searchAfter: [1498881600000, 'retriever#00230520170701263539250_907720']
    };

    deepfreeze(selection);
    deepfreeze(searchResultsAfter);

    expect(addSelectedDocuments(searchResultsBefore, selection)).toEqual(
      searchResultsAfter
    );
  });

  it('should add selected property to documents and set two true', () => {
    const selection = [
      {
        docId: '00015320170901266055679',
        service: 'MONITOR',
        profileIds: [1139241]
      },
      {
        docId: '00230420170701263556731',
        service: 'MONITOR',
        profileIds: [756288]
      }
    ];

    const searchResultsAfter = {
      total: 4,
      selected: 2,
      documents: [
        {
          docId: '00015320170901266055679',
          docDate: '2017-09-01T03:03:47',
          source: { id: 153, name: 'Dagen' },
          status: 'published',
          mediatype: 'web',
          wordCount: 1656,
          duplicateCount: 0,
          selected: true,
          headline: 'Norges politiker friar till de kristna',
          intro:
            'Sylvi Listhaug, Fremskrittspartiet, och Knut Arild Hareide, Kristelig Folkeparti, gör det. Jonas Gahr Støre, Arbeiderpartiet, och Erna Solberg, Høyre, försöker också. Alla friar de till de kristna väljarna inför stortingsvalet. Men vilka är de?',
          profileData: [
            {
              profile: { id: 1139241, name: 'Nynorsk' },
              adValue: { amount: 8935.4661235, currency: 'SEK' }
            }
          ]
        },
        {
          docId: '00230420170701263556731',
          docDate: '2017-07-01T18:14:27',
          source: { id: 2304, name: 'VG Nett' },
          status: 'published',
          mediatype: 'web',
          byline: 'Emilie Solberg',
          wordCount: 822,
          duplicateCount: 0,
          selected: true,
          headline: 'Erling Lae: - Kamp mot fordommer er evigvarende',
          intro:
            'Erling Lae har alltid stått frem som åpen homofil politiker. Han er glad for at flere toppolitikere velger å stå frem i dag.',
          profileData: [
            {
              profile: { id: 756288, name: 'Erna Solberg' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            }
          ]
        },
        {
          docId: '00230420170701263537951',
          docDate: '2017-07-01T06:13:59',
          source: { id: 2304, name: 'VG Nett' },
          status: 'published',
          mediatype: 'web',
          byline: 'Bjørn Grimstad',
          wordCount: 570,
          duplicateCount: 0,
          selected: false,
          headline: 'Få partiledere går i årets Pride-parade',
          intro:
            'Trine Skei Grande og Rasmus Hansson er de eneste partitoppene som kommer til å gå på Pride-paraden lørdag. - Dette er viktig å gjøre for politiske ledere. Vi har langt igjen å gå for at folk kan leve livene sine uten å bli møtt av fordommer.',
          profileData: [
            {
              profile: { id: 981864, name: 'Rasmus Hansson' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 872076, name: 'Jonas Gahr Støre' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 907720, name: 'Knut Arild Hareide' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 907722, name: 'Trygve Slagsvold Vedum' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 756288, name: 'Erna Solberg' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            },
            {
              profile: { id: 907719, name: 'Trine Skei Grande' },
              adValue: { amount: 1198961.5654646, currency: 'SEK' }
            }
          ]
        },
        {
          docId: '00230520170701263539250',
          docDate: '2017-07-01T06:00:00',
          source: { id: 2305, name: 'Dagbladet' },
          status: 'published',
          mediatype: 'web',
          byline: 'marie simonsen',
          wordCount: 987,
          duplicateCount: 0,
          selected: false,
          headline:
            'Pride 2017 - Skriv heller om at homofile blir drept i regimer som deler dine holdninger',
          intro:
            'Selv i Norge er angrep mot homofile akseptert. De siste dagene har homofile venner overøst sosiale medier med bilder fra Pride-uka, som kulminerer i formiddag med den store paraden i flere norske byer.',
          profileData: [
            {
              profile: { id: 907720, name: 'Knut Arild Hareide' },
              adValue: { amount: 582653.2542453, currency: 'SEK' }
            }
          ]
        }
      ],
      aggregations: { docId: [{ count: 4 }] },
      searchAfter: [1498881600000, 'retriever#00230520170701263539250_907720']
    };

    deepfreeze(selection);
    deepfreeze(searchResultsAfter);

    expect(addSelectedDocuments(searchResultsBefore, selection)).toEqual(
      searchResultsAfter
    );
  });
});

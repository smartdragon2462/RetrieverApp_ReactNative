import deepfreeze from 'deep-freeze';
import {
  TOGGLE_PROFILE,
  TOGGLE_GROUP,
  TOGGLE_ALL_PROFILES,
  SELECT_PROFILES_BY_ID,
  SELECT_GROUPS_BY_ID
} from '../../constants/profile-constants.js';
import profileGroups from './profiles-reducer.js';

describe('profileGroups reducers', () => {
  it('should select a profile', () => {
    const stateBefore = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: false,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          }
        ]
      }
    ];
    const action = {
      type: TOGGLE_PROFILE,
      id: [1094888]
    };
    const stateAfter = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: false,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          }
        ]
      }
    ];

    deepfreeze(stateBefore);
    deepfreeze(action);

    expect(profileGroups(stateBefore, action)).toEqual(stateAfter);
  });

  it('should select a group if all profiles are selected', () => {
    const stateBefore = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: false,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          }
        ]
      }
    ];
    const action = {
      type: TOGGLE_PROFILE,
      id: [1094888]
    };
    const stateAfter = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: false,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          }
        ]
      }
    ];

    deepfreeze(stateBefore);
    deepfreeze(action);

    expect(profileGroups(stateBefore, action)).toEqual(stateAfter);
  });

  it('should select a group', () => {
    const stateBefore = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: false,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          }
        ]
      }
    ];
    const action = {
      type: TOGGLE_GROUP,
      id: [23854]
    };
    const stateAfter = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: false,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          }
        ]
      }
    ];

    deepfreeze(stateBefore);
    deepfreeze(action);

    expect(profileGroups(stateBefore, action)).toEqual(stateAfter);
  });

  it('should select all profiles even when some is already selected', () => {
    const stateBefore = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: false,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          }
        ]
      }
    ];
    const action = {
      type: TOGGLE_ALL_PROFILES,
      allProfiles: [1094888]
    };
    const stateAfter = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: true,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          }
        ]
      }
    ];

    deepfreeze(stateBefore);
    deepfreeze(action);

    expect(profileGroups(stateBefore, action)).toEqual(stateAfter);
  });

  it('should select all profiles if none is selected', () => {
    const stateBefore = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: false,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          }
        ]
      }
    ];
    const action = {
      type: TOGGLE_ALL_PROFILES
    };
    const stateAfter = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: true,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          }
        ]
      }
    ];

    deepfreeze(stateBefore);
    deepfreeze(action);

    expect(profileGroups(stateBefore, action)).toEqual(stateAfter);
  });

  it('should deselect all profiles if all is selected', () => {
    const stateBefore = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: true,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          }
        ]
      }
    ];
    const action = {
      type: TOGGLE_ALL_PROFILES
    };
    const stateAfter = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: false,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          }
        ]
      }
    ];

    deepfreeze(stateBefore);
    deepfreeze(action);

    expect(profileGroups(stateBefore, action)).toEqual(stateAfter);
  });

  it('should select profiles by ids', () => {
    const stateBefore = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: true,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          }
        ]
      },
      {
        id: 29145,
        name: 'Cryptocurrency',
        selected: true,
        profiles: [
          {
            id: 1472287,
            name: 'Bitcoin',
            selected: true,
            profileGroup: 29145
          },
          {
            id: 1472286,
            name: 'Ethereum',
            selected: true,
            profileGroup: 29145
          },
          {
            id: 1472288,
            name: 'Litecoin',
            selected: true,
            profileGroup: 29145
          }
        ]
      }
    ];

    const action = {
      type: SELECT_PROFILES_BY_ID,
      id: [1094888, 1105485]
    };

    const stateAfter = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: true,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          }
        ]
      },
      {
        id: 29145,
        name: 'Cryptocurrency',
        selected: false,
        profiles: [
          {
            id: 1472287,
            name: 'Bitcoin',
            selected: false,
            profileGroup: 29145
          },
          {
            id: 1472286,
            name: 'Ethereum',
            selected: false,
            profileGroup: 29145
          },
          {
            id: 1472288,
            name: 'Litecoin',
            selected: false,
            profileGroup: 29145
          }
        ]
      }
    ];

    deepfreeze(stateBefore);
    deepfreeze(action);

    expect(profileGroups(stateBefore, action)).toEqual(stateAfter);
  });

  it('should select groups by ids', () => {
    const stateBefore = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: false,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: false,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          }
        ]
      },
      {
        id: 29145,
        name: 'Cryptocurrency',
        selected: false,
        profiles: [
          {
            id: 1472287,
            name: 'Bitcoin',
            selected: false,
            profileGroup: 29145
          },
          {
            id: 1472286,
            name: 'Ethereum',
            selected: true,
            profileGroup: 29145
          },
          {
            id: 1472288,
            name: 'Litecoin',
            selected: true,
            profileGroup: 29145
          }
        ]
      }
    ];

    const action = {
      type: SELECT_GROUPS_BY_ID,
      id: [23854, 29145]
    };

    const stateAfter = [
      {
        id: 23854,
        name: 'Lars Vaular',
        selected: true,
        profiles: [
          {
            id: 1094888,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          },
          {
            id: 1105485,
            name: 'Lars Vaular',
            selected: true,
            profileGroup: 23854
          }
        ]
      },
      {
        id: 29145,
        name: 'Cryptocurrency',
        selected: true,
        profiles: [
          {
            id: 1472287,
            name: 'Bitcoin',
            selected: true,
            profileGroup: 29145
          },
          {
            id: 1472286,
            name: 'Ethereum',
            selected: true,
            profileGroup: 29145
          },
          {
            id: 1472288,
            name: 'Litecoin',
            selected: true,
            profileGroup: 29145
          }
        ]
      }
    ];

    deepfreeze(stateBefore);
    deepfreeze(action);

    expect(profileGroups(stateBefore, action)).toEqual(stateAfter);
  });
});

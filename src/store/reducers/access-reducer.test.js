import deepfreeze from 'deep-freeze';
import setAccess from './access-reducer';

describe('access reducer', () => {
  it('should return the same as before', () => {
    const initialState = {};

    const stateAfter = {
      access: {
        analysisArchiveAccessible: false,
        deleteMonitorResultsAccessible: false
      }
    };

    const action = {
      type: 'SET_ACCESS',
      access: {
        access: {
          analysisArchiveAccessible: false,
          deleteMonitorResultsAccessible: false
        }
      }
    };

    deepfreeze(initialState);
    deepfreeze(action);

    expect(setAccess(initialState, action)).toEqual(stateAfter);
  });
});

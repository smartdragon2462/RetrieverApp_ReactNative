export const selectedGroupsIds = profileGroups =>
  profileGroups.filter(group => group.selected).map(group => group.id);

export const notSelectedByGroup = profileGroups => {
  const nots = profileGroups
    .filter(group => !group.selected)
    .map(group =>
      group.profiles
        .filter(profile => profile.selected)
        .map(profile => profile.id)
    );
  if (nots.length > 0) {
    return nots.reduce((a, b) => a.concat(b));
  }
  return [];
};

export const allSelectedProfilesIds = profileGroups =>
  profileGroups
    .map(group => group.profiles)
    .map(profiles =>
      profiles.filter(profile => profile.selected).map(profile => profile.id)
    )
    .reduce((all, profiles) => all.concat(profiles), []);

export const getAllFavoriteProfiles = (profileGroups, favoriteIds) =>
  profileGroups
    .map(group => group.profiles)
    .map(profiles =>
      profiles.filter(profile => favoriteIds.includes(profile.id))
    )
    .reduce((all, profiles) => all.concat(profiles), []);

export const selectedProfileNames = profileGroups =>
  profileGroups
    .map(group => group.profiles)
    .map(profiles =>
      profiles.filter(profile => profile.selected).map(profile => profile.name)
    )
    .reduce((all, profiles) => all.concat(profiles), []);

export const numberOfSelectedProfiles = profileGroups =>
  profileGroups
    .map(group => group.profiles)
    .map(profiles => profiles.filter(profile => profile.selected).length)
    .reduce((a, b) => a + b);

export const totalNumbersOfProfiles = profileGroups =>
  profileGroups
    .map(group => group.profiles)
    .map(profiles => profiles.length)
    .reduce((a, b) => a + b);

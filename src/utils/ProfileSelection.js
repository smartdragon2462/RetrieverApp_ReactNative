/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
let findProfile;
let findGroup;

class ProfileSelection {
  constructor(groups, defaultLabel) {
    this.selection = groups.map(({ id, name, profiles }) => ({
      id,
      name,
      get selected() {
        return this.profiles.every(profile => profile.selected);
      },
      set selected(val) {
        this.profiles.forEach(profile => {
          profile.selected = val;
        });
      },
      profiles: profiles.map(({ id, name, selected, profileGroup }) => ({
        id,
        name,
        selected,
        profileGroup
      }))
    }));
    this.defaultLabel = defaultLabel;

    findProfile = id =>
      this.selection
        .map(group => group.profiles.find(profile => profile.id === id))
        .find(profile => !!profile);

    findGroup = id => this.selection.find(group => group.id === id);
  }

  get label() {
    if (this.selection.length === 0) return this.defaultLabel;

    const profileNames = [];
    const groupNames = [];
    let ungrouped = 0;
    this.selection.forEach(group => {
      if (!group.name) {
        ungrouped += 1;
      }

      if (group.selected && group.name) {
        groupNames.push(group.name);
      } else {
        group.profiles.forEach(profile => {
          if (profile.selected && profile.name) {
            profileNames.push(profile.name);
          }
        });
      }
    });
    if (groupNames.length === this.selection.length - ungrouped)
      return this.defaultLabel;

    const names = [...groupNames, ...profileNames];
    switch (names.length) {
      case 0:
        return this.defaultLabel;
      case 1:
      case 2:
        return names.join(', ');
      default:
        return `${names[0]} (+${names.length - 1})`;
    }
  }

  get ids() {
    return this.selection
      .map(group => group.profiles)
      .map(profiles =>
        profiles.filter(profile => profile.selected).map(profile => profile.id)
      )
      .reduce((all, profiles) => all.concat(profiles), []);
  }

  get notSelectedByGroup() {
    const nots = this.selection
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
  }

  get groupIds() {
    return this.selection
      .filter(group => group.selected)
      .map(group => group.id);
  }

  get() {
    return JSON.parse(JSON.stringify(this.selection));
  }

  add(profiles) {
    if (!Array.isArray(profiles) && typeof profiles === 'number') {
      profiles = [profiles];
    }
    profiles
      .map(findProfile)
      .filter(Boolean)
      .forEach(profile => {
        profile.selected = true;
      });
  }

  remove(profiles) {
    if (!Array.isArray(profiles) && typeof profiles === 'number') {
      profiles = [profiles];
    }
    profiles
      .map(findProfile)
      .filter(Boolean)
      .forEach(profile => {
        profile.selected = false;
      });
  }

  addGroups(groups) {
    if (!Array.isArray(groups) && typeof groups === 'number') {
      groups = [groups];
    }
    groups
      .map(findGroup)
      .filter(Boolean)
      .forEach(group => {
        group.selected = true;
      });
  }

  removeGroups(groups) {
    if (!Array.isArray(groups) && typeof groups === 'number') {
      groups = [groups];
    }
    groups
      .map(findGroup)
      .filter(Boolean)
      .forEach(group => {
        group.selected = false;
      });
  }

  addAll() {
    this.selection.forEach(group => {
      group.selected = true;
    });
  }

  toggle(profiles) {
    if (!Array.isArray(profiles) && typeof profiles === 'number') {
      profiles = [profiles];
    }
    profiles.map(findProfile).forEach(profile => {
      profile.selected = !profile.selected;
    });
  }

  toggleGroups(groups) {
    if (!Array.isArray(groups) && typeof groups === 'number') {
      groups = [groups];
    }
    groups.map(findGroup).forEach(group => {
      group.selected = !group.selected;
    });
  }

  isAllSelected() {
    return this.selection.every(group => group.selected);
  }

  removeAll() {
    this.selection.forEach(group => {
      group.selected = false;
    });
  }
}

export default ProfileSelection;

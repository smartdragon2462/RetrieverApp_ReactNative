const addSelectedDocuments = (searchResult, selection) => ({
  ...searchResult,
  selected: selection.length,
  documents: searchResult.documents.map(doc => ({
    ...doc,
    selected: doc.profileData
      .map(data => data.profile.id)
      .some(profiles =>
        selection.some(
          sel =>
            sel.docId === doc.docId &&
            (sel.profileIds.length === 0 ||
              sel.profileIds.some(id => profiles === id))
        )
      )
  }))
});

export default addSelectedDocuments;

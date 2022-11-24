function isDateToday(dateString) {
    // dateString format - yyyy-mm-dd

    function getShortDate(innerDateString) {
      return new Date(innerDateString).toLocaleDateString("fr-CA", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    }
    const comparedDate = getShortDate(dateString)

    console.log(comparedDate)

    const today = getShortDate(new Date())

    console.log(today)

    return (today === comparedDate)
  } 

  console.log(isDateToday('2022-11-24'))
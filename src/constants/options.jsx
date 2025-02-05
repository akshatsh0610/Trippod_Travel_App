export const SelectTravelList = [
    {
      id: 1,
      title: "Solo Traveler",
      desc: "Explore the world on your own, one step at a time.",
      icon: "✈️",
      people: "1 Traveller",
    },
    {
      id: 2,
      title: "Couple",
      desc: "A romantic journey for two.",
      icon: "🥂",
      people: "2 Traveller",
    },
    {
      id: 3,
      title: "Family",
      desc: "Create memories with your loved ones.",
      icon: "🏠",
      people: "3 to 5 Traveller",
    },
    {
      id: 4,
      title: "Friends",
      desc: "An adventure with your closest friends.",
      icon: "🏞️",
      people: "5 to 10 Traveller",
    },
  ];
  
  export const SelectBudgetOptions = [
    {
      id: 1,
      title: "Budget-Friendly",
      desc: "Affordable travel without compromising fun.",
      icon: "💵",
    },
    {
      id: 2,
      title: "Moderate",
      desc: "A balanced experience with a reasonable budget.",
      icon: "💰",
    },
    {
      id: 3,
      title: "Luxury",
      desc: "Experience the finest travel has to offer.",
      icon: "💸",
    },
  ];
  

  export const AI_PROMPT = "Generate Travel Plan for Location :{address}, for {noOfDays} days for {people} with a {budget} budget, give me a hotels options list with HotelName, Hotel address, Price, Hotel image url, geo coordinates, rating, description, and suggest itinery with placeName, PlaceDetails, Place Image Url, Geo Coordinates, ticket Pricing rating, Time travel each of the location for {TotalDays} days with each day plan with best time to visit. Can you give the result in correct JSON Format."
# HotelApi

1.write code npm init -y in terminal.
2."localhost:3000/api/addVillaToDatabase"  is api for Villa to store in the database in which enter Villa's name and place as input.              AvailabilityStartDate ,  AvailabilityEndDate and pricePernight is randomized calculated.
3."localhost:3000/api/getAllVillas" is api to get all Villa in a paticular area in which enter place name as input.
4."localhost:3000/api/checkingBookingDateOfVilla" is api to get all villa available for booking in particular area in which enter area name.checkInDate,checkOutDate as input.
5."localhost:3000/api/availabilityOfVillasAtParticularDate" is api to get a particular villa in a patricular area and in the range of particular date in which enter villa name,area name,checkInDate and checkOutDate as input.
6."localhost:3000/api//bookingConfirmForVilla" is api to confirm booking in which enter villa name,area name,checkInDate and checkOutDate as input.
If booking date is available then it return bookings of villa otherwise return "not possible".
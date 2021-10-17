const mongoose=require("mongoose");
//const schema=mongoose.Schema;

const BookingSchema=new mongoose.Schema({
    
        name:{
            type:String
        },
        place:{
            type:String
        },
        availabilityStartDate:{type:Date},
        availabilityEndDate:{type:Date},
        pricePerNight:{type:Number},
        bookings:[
            {
                checkInDate:{type:Date},
                checkOutDate:{type:Date},
                duration:{type:Number},
                totalAmount:{type:Number}
            }
        ]
        
        
        

    
})

const Booking = mongoose.model('Booking', BookingSchema);

module.exports =Booking;
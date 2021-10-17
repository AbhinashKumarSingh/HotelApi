const express=require("express");
const router=express.Router();
const moment=require("moment")
const Booking=require("../models/hotelData");
router.get("/pot",(req,res)=>{
    console.log(req.body)
    res.send("helo")
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  const a=randomDate(new Date(2021,0,1),new Date(2021,11,31));
  const b=randomDate(new Date(2021,0,1),new Date(2021,11,31));
  //console.log(b-a)
 // console.log(randomDate(new Date(2012, 0, 1), new Date()));

router.post("/addVillaToDatabase",async(req,res)=>{
    //console.log(req.body)
     var {name,
      place
     }=req.body;
     
     const availabilityEndDate=moment(randomDate(new Date(2021,0,1),new Date(2021,11,31))).format("YYYY-MM-DD")
     const availabilityStartDate=moment(randomDate(new Date(2021,0,1),new Date(2021,11,31))).format("YYYY-MM-DD")
     var end= moment(availabilityEndDate,"YYYY-MM-DD");
        
     var start = moment(availabilityStartDate,"YYYY-MM-DD");
     var d = end.diff(start, 'days'); // 9
     var endDate1,startDate1;
        if(d<0){
             endDate1=start;
             startDate1=end;
        }
        else{
             endDate1=end;
             startDate1=start
        }
     
     
     const hotel=new Booking({
         name:name,
         availabilityStartDate:startDate1,
         availabilityEndDate:endDate1,
          pricePerNight:getRandomInt(30000,50000)
          ,place:place});
        //  
        
         const newHotel=await hotel.save();
         res.send(newHotel)


});

router.post("/getAllVillas",async(req,res)=>{
    //console.log(req.body.name)
    const result=await Booking.find({place:req.body.place}).sort({"pricePerNight":1})
    console.log(result[0].availabilityStartDate);
    res.send(result)
});

router.post("/checkingBookingDateOfVilla",async(req,res)=>{
        const {checkInDate,checkOutDate,place}=req.body;
        
        var end = moment(checkOutDate,"YYYY-MM-DD");

        var start = moment(checkInDate,"YYYY-MM-DD");
        var d = end.diff(start, 'days'); // 9

        const result=await Booking.find({place:place}).sort({"pricePerNight":1});
        const newObj=result.map((x,val)=>{
            
        const startDate=moment(x.availabilityStartDate).format("YYYY-MM-DD")
        const startDate1=moment(startDate)
            const d1=start.diff(startDate1,'days');
            const endDate=moment(x.availabilityEndDate).format("YYYY-MM-DD")
            const endDate1=moment(endDate)
            const d2=endDate1.diff(end,'days');
            var d3=d;
              if(d1>=0 && d2>-1 && d>0)
              {
                  //x.pricePerNight=d3*(x.pricePerNight+0.18*x.pricePerNight);
                  return x
                  
              }
            
            
        })
        
        
          var newObj1 = newObj.filter(function (e) {return e != null;});
          console.log(newObj1)
        return res.send(newObj1)

        
})
router.post("/availabilityOfVillasAtParticularDate",async(req,res)=>{
    const {checkInDate,checkOutDate,place}=req.body;
    const result=await Booking.find({place:place,name:req.body.name});
    // const newObj=result.map(x=>{
    //     if(x.bookings.length===0)
    //     return x;
        
    // })
    res.send(result)
})
router.post("/bookingConfirmForVilla",async(req,res)=>{
    //console.log(req.body)
    const {checkInDate,checkOutDate,place}=req.body;
    var end= moment(checkOutDate,"YYYY-MM-DD");
        
    var start= moment(checkInDate,"YYYY-MM-DD");
    var d = end.diff(start, 'days'); // 9
    const result=await Booking.find({place:place,name:req.body.name});
    
    const startDate=moment(result[0].availabilityStartDate).format("YYYY-MM-DD");
        const endDate=moment(result[0].availabilityEndDate).format("YYYY-MM-DD");
        
            var d5=start.diff(startDate,"days");
            var d6=start.diff(endDate,"days");
            var d7=end.diff(startDate,"days")
            var d8=end.diff(endDate,"days");
            
            var ans=0;
    if(result[0].bookings.length===0)
    {
        ans=2;
        console.log("y")
        if(    ((start.diff(startDate,"days")>0) && (start.diff(endDate,"days")>0)) ||  (end.diff(startDate,"days")<0) && end.diff(endDate,"days")<0 ){
                 console.log("hy")
                  return res.send("Not Possible")
         }
        else{
            console.log()
        result[0].bookings={
        checkInDate:checkInDate,
        checkOutDate:checkOutDate,
        duration:d,
        totalAmount:(d*result[0].pricePerNight)+(0.18*(d*result[0].pricePerNight))};

        console.log(result[0].bookings)
        const x= await result[0].save();
        return res.send(result[0])
        }
        
  
    }
    else{
        
        result[0].bookings.map((x)=>{
            
             const y=moment(x.checkInDate).format("YYYY-MM-DD");
             const z=moment(x.checkOutDate).format("YYYY-MM-DD");
            
            var d2=start.diff(y, 'days');
            var d3=end.diff(z,'days')
            console.log(d3)
            if(((checkInDate>=y && checkInDate<z) || (checkOutDate>=y &&checkOutDate<z)) )
            {
                ans=1;
                
                return res.send("not possible")
            }
            
        })
        if(ans===0){
            console.log(checkInDate-startDate)
        if((checkInDate>=startDate && checkInDate<=endDate)&&(checkOutDate>=startDate && checkOutDate<=endDate)){
            
        result[0].bookings.push({
            checkInDate:checkInDate,
            checkOutDate:checkOutDate,
            duration:d,
            totalAmount:(d*result[0].pricePerNight)+(0.18*(d*result[0].pricePerNight))});
            
            const x= await result[0].save();
            return res.send(x)
        }
        
    }
    }
   
})

module.exports= router;
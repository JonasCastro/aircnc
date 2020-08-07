const Booking = require('../models/Booking')
module.exports = {
    async store(req, res){
        const { user_id } = req.headers;
        const { spots_id } = req.params;
        const { date } = req.body;
        
        const booking = await Booking.create({
            user: user_id,
            spot: spots_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();
       
        const ownerSocket = req.connectedUsers[booking.spot.user];
        console.log(ownerSocket)
        if(ownerSocket){
            req.io.to(ownerSocket).emit('booking_request',booking);
        }
        return res.json(booking);


    }

}
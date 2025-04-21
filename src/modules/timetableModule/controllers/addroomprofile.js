const HttpException = require("../../../models/http-exception");
const addRoom = require("../../../models/addroom");
const MasterRoom = require("../../../models/masterroom");


class addRoomController {
      async  AddRoom(req, res) {
        const newRoom = req.body;
        try {
          const createdroom = await addRoom.create(newRoom);
          res.json(createdroom)
          return;
        } catch (error) {
          console.error(error); 
          res.status(500).json({ error: "Internal server error" });
        }
      }
      
      async getRooms(currentCode) {
        try {
          const uniqueRooms = await addRoom.distinct('room', { code: currentCode });
          return uniqueRooms;
        } catch (error) {
          throw error;
        }
      }

      async getAddedRoom(req, res) {
       try {
          const roomList = await addRoom.find();
          res.json(roomList)
          return;
        } catch (error) {
          console.error(error); 
          res.status(500).json({ error: "Internal server error" });
        }
      }

      async getAddedRoomById(id) {
        if (!id) {
          throw new HttpException(400, "Invalid Id");
        }
        try {
          const data = await addRoom.findById(id);
          if (!data) throw new HttpException(400, "data does not exists");
          return data;
        } catch (e) {
          throw new HttpException(500, e.message || "Internal Server Error");
        }
      }

      async updateID(id, announcement) {
        if (!id) {
          throw new HttpException(400, "Invalid Id");
        }
        // if (!isValidAnnouncement(announcement)) {
        //   return res.status(400).json({ error: "Invalid Announcement data" });
        // }
        try {
          await addRoom.findByIdAndUpdate(id, announcement);
        } catch (e) {
          throw new HttpException(500, e.message || "Internal Server Error");
        }
      }

      async deleteId(id) {
        if (!id) {
          throw new HttpException(400, "Invalid Id");
        }
        try {
          await addRoom.findByIdAndDelete(id);
        } catch (e) {
          throw new HttpException(500, e.message || "Internal Server Error");
        }
      }

      async deleteRoomByCode(code) {
        try {
    
          await addRoom.deleteMany({ code });
    
        } catch (error) {
          throw new Error("Failed to delete room by code");
        }
      }

      async deleteCentralisedRoomByCode(code) {
        try {
          const getcentralisedroom = await addRoom.find({code,type:'Centralised Classroom'})
          const roomIdsToDelete = getcentralisedroom.map(room => room._id);

          await addRoom.deleteMany({ _id: { $in: roomIdsToDelete } });
    
        } catch (error) {
          throw new Error("Failed to delete centralised room");
        }
      }



    }


    
module.exports = addRoomController;



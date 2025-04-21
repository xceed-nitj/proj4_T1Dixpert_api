const ClassTable = require("../../../models/classtimetable");
const TimeTable = require('../../../models/timetable'); // Import the TimeTable model
const TimeTabledto = require("./timetable");
const TimeTableDto = new TimeTabledto();
const getIndianTime = require("../helper/getIndianTime")

class ClassTimeTabledto {
    async findTimeTableIdByCode(code) {
        try {
          const timetable = await TimeTable.findOne({ code: code }).exec();
      
          if (timetable) {
            return timetable._id;
          } else {
            console.log('No TimeTable found with the specified code.');
            return null;
          }
        } catch (err) {
          console.error('An error occurred while searching for the TimeTable:', err);
          throw err; // Re-throw the error to propagate it to the calling function
        }
      }
     
async findFacultyDataWithSession(session, faculty) {
        try {
        //  const session="mksd"
         const result = await ClassTable.aggregate([
          {
            $match: {
              "slotData.faculty": faculty,
            },
          },
          {
            $lookup: {
              from: "timetables", // Replace with your actual collection name
              localField: "timetable",
              foreignField: "_id",
              as: "timetableData",
            },
          },
          {
            $unwind: "$timetableData",
          },
          {
            $match: {
              "timetableData.session": session,
            },
          },
        ]);
                    // console.log(result);
      
          return result;
        } catch (err) {
          console.error('An error occurred while searching for faculty data:', err);
          throw err;
        }
      }

async findRoomDataWithSession(session, room) {
        try {
          const result = await ClassTable.aggregate([
            {
              $match: {
                "slotData.room": room,
              },
            },
            {
              $lookup: {
                from: "timetables", // Replace with your actual collection name
                localField: "timetable",
                foreignField: "_id",
                as: "timetableData",
              },
            },
            {
              $unwind: "$timetableData",
            },
            {
              $match: {
                "timetableData.session": session,
              },
            },
          ]);
      // console.log('room result', result)
          return result;
        } catch (err) {
          console.error('An error occurred while searching for faculty data:', err);
          throw err;
        }
      }

  async isFacultySlotAvailable(targetDay, targetSlot, facultySlots, sem) {
        try {
          // Check if the faculty is assigned to this slot
          for (const record of facultySlots) {
            if (record.day === targetDay && record.slot === targetSlot  && record.sem !== sem) {
                // The day and slot combination is found in the data
                console.log('faculty slot not available')
                return false;
            }
        }
        // The day and slot combination is not found in the data
        console.log('faculty slot available')
        return true;  // Slot is already occupied by the faculty
        } catch (error) {
          console.error(error);
          return false; // An error occurred while checking availability
        }
      }
      
      async isRoomSlotAvailable(targetDay, targetSlot, roomSlots, sem) {
        try {
          // Check if the faculty is assigned to this slot
          for (const record of roomSlots) {
            if (record.day === targetDay && record.slot === targetSlot && record.sem !== sem) {
                // The day and slot combination is found in the data
                console.log('room slot not available')
                return false;
            }
        }
        // The day and slot combination is not found in the data
        console.log('room slot available')
        return true;  // Slot is already occupied by the faculty
        } catch (error) {
          console.error(error);
          return false; // An error occurred while checking availability
        }
      }
  
      async getLastUpdatedTime(records) {
        try {
          // Check if the faculty is assigned to this slot
          const latestUpdatedTime = new Date(
            Math.max(...records.map((obj) => new Date(obj.updated_at)))
          );
          
          // Convert the latest 'updated_at' timestamp to IST
          const latestUpdatedTimeIST = getIndianTime(latestUpdatedTime);
          
        return latestUpdatedTimeIST;  // Slot is already occupied by the faculty
        } catch (error) {
          console.error(error);// An error occurred while checking availability
        }
      }
  


    }
      module.exports = ClassTimeTabledto;
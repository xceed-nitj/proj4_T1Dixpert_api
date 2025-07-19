const Patient = require('../../../models/diabeticsModule/patient.js');
const Chat = require('../../../models/diabeticsModule/chat.js'); // if you track messages

const { startOfToday, endOfToday } = require('date-fns');

exports.getDashboardStats = async (req, res) => {
    try {
        // console.log("hi");
        const [usersCount, templatesCount, conversationsToday, messagesSent] = await Promise.all([
            Patient.countDocuments(), 
            Chat.countDocuments({ templateName: { $exists: true, $ne: null } }), 
            Chat.distinct('from', {
                createdAt: { $gte: startOfToday(), $lte: endOfToday() }
            }).then(conversations => conversations.length),  
            Chat.countDocuments() 
        ]);

    res.status(200).json({
        usersCount,             // Total patients
        templatesCount,         // Templates used
        conversationsToday,     // Today's conversations
        messagesSent            // Total messages sent
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

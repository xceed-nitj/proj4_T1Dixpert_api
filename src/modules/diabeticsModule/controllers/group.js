const Group = require('../../../models/diabeticsModule/group.js');
const Patient = require('../../../models/diabeticsModule/patient');

exports.createGroup = async (req, res, next) => {
  try {
    const { name, description, patientIds } = req.body;


    if (!name || !description || !patientIds || !Array.isArray(patientIds)) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const existingPatients = await Patient.find({ _id: { $in: patientIds } });
    if (existingPatients.length !== patientIds.length) {
     return res.status(400).json({ error: 'Some patient IDs are invalid.' });
    }
    // Check if group with the same name already exists
    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
      return res.status(400).json({ message: 'Group with this name already exists' });
    }


    
    

    const group = await Group.create({
      name,
      description,
      patients: patientIds, // it will need an array of patient ids from frontend
    //   createdBy: req.user._id
    });


    res.status(201).json(group);
  } catch (error) {
    next(error);
  }
};

exports.addPatientToGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { patientIds } = req.body;
    if (!groupId || !patientIds || !Array.isArray(patientIds) || patientIds.length === 0) {
      return res.status(400).json({ message: 'Group ID and Patient ID are required' });
    }


    const group = await Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { patients: patientIds } },
      { new: true }
    );

    

    res.json({
      message: 'Patients added to group successfully',
      group});
  } catch (error) {
    next(error);
  }
};


exports.removePatientsFromGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { patientIds } = req.body;

    if (!groupId || !Array.isArray(patientIds) || patientIds.length === 0) {
      return res.status(400).json({ message: 'Group ID and an array of patient IDs are required' });
    }

    const group = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { patients: { $in: patientIds } } },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    console.log(`Removed patients: ${patientIds} from group: ${groupId}`);

    res.json({
      message: 'Patients removed from group successfully',
      group
    });
  } catch (error) {
    next(error);
  }
};

exports.getGroupMembers = async (req, res, next) => {
  try {

    const group = await Group.findById(req.params.groupId).populate('patients');
    res.json(group);
  } catch (error) {
    next(error);
  }
};

exports.getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.find().populate('patients');
    res.json(groups);
  } catch (error) {
    next(error);
  }
};

const User = require('../models/user.model');
const Court = require('../models/court.model');

exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const deletedUser = await User.findOneAndDelete({ email: email });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCourtPrice = async (req, res) => {
  try {
    const { courtId } = req.params;
    const { newPrice } = req.body;

    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Not allowed' });
    }

    const court = await Court.findByIdAndUpdate(
      courtId,
      { price: newPrice },
      { new: true }
    );

    if (!court) {
      return res.status(404).json({ error: 'Court not found' });
    }

    res.status(200).json({
      message: 'Court price updated successfully',
      court
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { suspensionDuration } = req.body;   

    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Not allowed' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        suspended: true,
        suspensionEndDate: new Date(Date.now() + suspensionDuration * 24 * 60 * 60 * 1000)
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User suspended successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

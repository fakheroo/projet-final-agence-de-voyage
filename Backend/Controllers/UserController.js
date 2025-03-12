const User = require('../Models/User');

const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { profileImage } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profileImage },
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Error updating user profile' });
  }
};

module.exports = {
  updateUserProfile
};
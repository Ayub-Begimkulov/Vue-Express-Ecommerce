const verifyAdmin = (req, res, next) => {
  console.log();
  if (req.userId === '5d6a0455c078522e940de510') {
    next();
  } else {
    return res.status(500).json({
      message: 'You dont have permistion to make a request to this endpoint'
    });
  }
};

module.exports = verifyAdmin;

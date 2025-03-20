const addOns = require('../../models/addOnsModel');
const asyncHandler = require('../../utilities/asyncHandler');
exports.createAddOns = asyncHandler(async (req, res) => {
  let { name, category, displayType, price, image } = req.body;
  if (req.file) {
    image = req.file.filename;
    console.log(image);
  }
  const addOn = await addOns.create({
    name,
    category,
    displayType,
    price,
    image,
  });

  if (!addOn) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please provide valid request',
    });
  }
  return res.status(200).json({
    status: 'Success',
    message: 'Created Addons Successfully',
    addOn,
  });
});

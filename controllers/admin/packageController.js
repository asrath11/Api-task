const Package = require('../../models/packageModel');
const asyncHandler = require('../../utilities/asyncHandler');
exports.createPackage = asyncHandler(async (req, res) => {
  let {
    name,
    priceDescription,
    capacityDescription,
    city,
    area,
    price,
    extraPersonCost,
    imageCover,
    images,
    videoLink,
  } = req.body;
  const image = req.files.imageCover[0];
  const multipleImages = req.files.images;
  if (req.files) {
    if (image) {
      imageCover = image.filename;
    }
    if (multipleImages) {
      images = multipleImages.map((el) => el.filename);
    }
  }
  const package = await Package.create({
    name,
    priceDescription,
    capacityDescription,
    city,
    area,
    price,
    extraPersonCost,
    imageCover,
    images,
    videoLink,
  });
  if (!package) {
    return res.status(400).json({
      status: 'Failed',
      message: 'please enter valid request',
    });
  }
  return res.status(201).json({
    status: 'Success',
    message: 'Successfully created Package',
    package,
  });
});

exports.getPackages = asyncHandler(async (req, res) => {
  const packages = await Package.find();
  if (packages.length === 0) {
    return res.status(200).json({
      status: 'Success',
      message: 'There no packages at the movement',
    });
  }
  return res.status(200).json({
    status: 'Success',
    message: 'Successfully retrieved packages',
    packages,
  });
});

exports.getPackage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please provide Id',
    });
  }
  const package = await Package.findById(id);
  if (!package) {
    return res.status(404).json({
      status: 'Failed',
      message: 'There no package by that id',
    });
  }
  return res.status(200).json({
    status: 'Success',
    package,
  });
});

exports.deletePackage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please provide Id',
    });
  }
  const package = await Package.findByIdAndDelete(id);
  if (!package) {
    return res.status(404).json({
      status: 'Failed',
      message: 'There no package by that id',
    });
  }
  return res.status(204).json({
    status: 'Success',
    package,
  });
});
exports.updatePackage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Extract fields from the request body
  const {
    name,
    priceDescription,
    capacityDescription,
    city,
    area,
    price,
    extraPersonCost,
    videoLink,
  } = req.body;

  // Initialize update object with non-file fields
  const updateData = {
    name,
    priceDescription,
    capacityDescription,
    city,
    area,
    price,
    extraPersonCost,
    videoLink,
  };

  // Handle file uploads if they exist
  if (req.files) {
    if (req.files.imageCover && req.files.imageCover[0]) {
      updateData.imageCover = req.files.imageCover[0].filename;
    }
    if (req.files.images && req.files.images.length > 0) {
      updateData.images = req.files.images.map((el) => el.filename);
    }
  }

  // Update the package in the database
  const updatedPackage = await Package.findByIdAndUpdate(id, updateData, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validators are run on update
  });

  // Handle case where the package is not found
  if (!updatedPackage) {
    return res.status(404).json({
      status: 'Failed',
      message: 'No package found with that ID',
    });
  }

  // Return success response
  return res.status(200).json({
    status: 'Success',
    message: 'Package updated successfully',
    package: updatedPackage,
  });
});

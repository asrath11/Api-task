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
  let { id } = req.params;
  console.log(id);
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
  console.log(req.body);
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
  const package = await Package.findByIdAndUpdate(
    id,
    {
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
    },
    {
      returnOriginal: false,
    }
  );
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

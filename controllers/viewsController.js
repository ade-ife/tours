const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const Bookings = require('../models/bookingModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  // 2) Build templates

  //   3) Render the temaplte using data from step 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = async (req, res, next) => {
  // 1) Get the data for the requested tour, include reviews and guides
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  //2) Build the template
  //   3) Render template using data from step 1
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log in to your accountt'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Bookings.find({ user: req.user.id });
  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up for a new account'
  });
};

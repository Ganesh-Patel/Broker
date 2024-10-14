import Listing from '../models/ListingModel.js';
import { userModel } from '../Models/UserModel.js';
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';

export const createListing = async (req, res, next) => {
  try {
    console.log(req.body);
    const listing = await Listing.create(req.body);
    console.log(listing)
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
export async function addToWishlist(req, res) {
  const { propId } = req.params;
  const propObjectId = new mongoose.Types.ObjectId(propId);
  const userID = req.user._id;
  const user = req.user;

  // Log for debugging
  console.log('From add to wishlist:', user);
  console.log('PropId:', propId);
  console.log('User Wishlist:', user.wishlist);

  // Adjust comparison to ensure correct matching
  const existingProduct = user.wishlist.find((id) => id.toString() === propObjectId.toString());

  let updatedUser;
  try {
    if (!existingProduct) {
      updatedUser = await userModel.findByIdAndUpdate(
        userID,
        { $push: { wishlist: propObjectId } },
        { new: true }
      );
      res.json({ message: "Item Added Successfully to wishList", updatedUser });
    } else {
      updatedUser = await userModel.findByIdAndUpdate(
        userID,
        { $pull: { wishlist: propObjectId } },
        { new: true }
      );
      res.json({ message: "Item Removed Successfully from wishList", updatedUser });
    }
  } catch (error) {
    console.error('Error updating wishlist:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}



// Get all products in wishlist for a specific user
export async function getfromWishlist(req, res) {
  try {
      const { userId } = req.params;  
      console.log('Fetching wishlist for userId:', userId);

      // Validate the user ID
      if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: 'Invalid User ID' });
      }

      // Fetch the user
      const user = await userModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      console.log(user)
      // Retrieve user's wishlist product IDs
      const wishlistProductIds = user.wishlist;
      console.log(wishlistProductIds)
      if (wishlistProductIds.length === 0) {
          return res.json({ message: 'No products in wishlist', products: [] });
      }

      const products = await Listing.find({ _id: { $in: wishlistProductIds } });
        
      // Log the fetched products
      console.log('Fetched Products:', products);

      if (products.length === 0) {
          return res.json({ message: 'No products found for the given wishlist IDs', products: [] });
      }

      res.json({ message: 'Wishlist products fetched successfully', products });
  } catch (err) {
      console.error('Error fetching wishlist products:', err);
      res.status(500).json({ message: 'Internal server error' });
  }
}
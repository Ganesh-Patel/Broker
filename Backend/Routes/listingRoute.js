import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings, addToWishlist,  getfromWishlist } from '../Controllers/listingController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const ListingRouter = express.Router();

ListingRouter.post('/create', authMiddleware, createListing);
ListingRouter.delete('/delete/:id', authMiddleware, deleteListing);
ListingRouter.post('/update/:id', authMiddleware, updateListing);
ListingRouter.post('/addtowishlist', authMiddleware,addToWishlist );
ListingRouter.get('/getwishlist/:userId', authMiddleware, getfromWishlist);
ListingRouter.get('/get/:id', getListing);
ListingRouter.get('/get', getListings);


export default ListingRouter;
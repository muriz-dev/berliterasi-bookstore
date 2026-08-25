import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	users: {
		bookmarks: r.many.bookmarks(),
		reviews: r.many.reviews(),
		carts: r.many.carts(),
		transactionHistories: r.many.transactionHistories(),
		bookmarkedBooks: r.many.books({
			from: r.users.id.through(r.bookmarks.userId),
			to: r.books.id.through(r.bookmarks.bookId),
		}),
		reviewedBooks: r.many.books({
			from: r.users.id.through(r.reviews.userId),
			to: r.books.id.through(r.reviews.bookId),
		}),
		cartBooks: r.many.books({
			from: r.users.id.through(r.carts.userId),
			to: r.books.id.through(r.carts.bookId),
		}),
	},
	bookCategories: {
		books: r.many.books(),
	},
	books: {
		category: r.one.bookCategories({
			from: r.books.categoryId,
			to: r.bookCategories.id,
		}),
		bookmarks: r.many.bookmarks(),
		reviews: r.many.reviews(),
		carts: r.many.carts(),
		transactionDetails: r.many.transactionDetails(),
		bookmarkedBy: r.many.users({
			from: r.books.id.through(r.bookmarks.bookId),
			to: r.users.id.through(r.bookmarks.userId),
		}),
		reviewedBy: r.many.users({
			from: r.books.id.through(r.reviews.bookId),
			to: r.users.id.through(r.reviews.userId),
		}),
		cartedBy: r.many.users({
			from: r.books.id.through(r.carts.bookId),
			to: r.users.id.through(r.carts.userId),
		}),
		transactionHistories: r.many.transactionHistories({
			from: r.books.id.through(r.transactionDetails.bookId),
			to: r.transactionHistories.id.through(
				r.transactionDetails.transactionHistoryId,
			),
		}),
	},
	bookmarks: {
		user: r.one.users({
			from: r.bookmarks.userId,
			to: r.users.id,
		}),
		book: r.one.books({
			from: r.bookmarks.bookId,
			to: r.books.id,
		}),
	},
	reviews: {
		user: r.one.users({
			from: r.reviews.userId,
			to: r.users.id,
		}),
		book: r.one.books({
			from: r.reviews.bookId,
			to: r.books.id,
		}),
	},
	carts: {
		user: r.one.users({
			from: r.carts.userId,
			to: r.users.id,
		}),
		book: r.one.books({
			from: r.carts.bookId,
			to: r.books.id,
		}),
	},
	paymentMethods: {
		transactionHistories: r.many.transactionHistories(),
	},
	voucherTypes: {
		vouchers: r.many.vouchers(),
	},
	vouchers: {
		voucherType: r.one.voucherTypes({
			from: r.vouchers.voucherTypeId,
			to: r.voucherTypes.id,
		}),
		transactionHistories: r.many.transactionHistories(),
	},
	transactionHistories: {
		user: r.one.users({
			from: r.transactionHistories.userId,
			to: r.users.id,
		}),
		paymentMethod: r.one.paymentMethods({
			from: r.transactionHistories.paymentMethodId,
			to: r.paymentMethods.id,
		}),
		voucher: r.one.vouchers({
			from: r.transactionHistories.voucherId,
			to: r.vouchers.id,
		}),
		transactionDetails: r.many.transactionDetails(),
		books: r.many.books({
			from: r.transactionHistories.id.through(
				r.transactionDetails.transactionHistoryId,
			),
			to: r.books.id.through(r.transactionDetails.bookId),
		}),
	},
	transactionDetails: {
		transactionHistory: r.one.transactionHistories({
			from: r.transactionDetails.transactionHistoryId,
			to: r.transactionHistories.id,
		}),
		book: r.one.books({
			from: r.transactionDetails.bookId,
			to: r.books.id,
		}),
	},
}));

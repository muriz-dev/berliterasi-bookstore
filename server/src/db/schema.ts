import { sql } from "drizzle-orm";
import {
	check,
	date,
	decimal,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const genderEnum = pgEnum("gender", ["MALE", "FEMALE"]);

export const discountTypeEnum = pgEnum("discount_type", [
	"FIXED",
	"PERCENTAGE",
]);

export const transactionStatusEnum = pgEnum("transaction_status", [
	"PENDING",
	"PAID",
	"CANCELLED",
]);

export const users = pgTable("users", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	gender: genderEnum("gender").notNull(),
	phoneNumber: varchar("phone_number", { length: 30 }).notNull(),
	address: text("address").notNull(),
	profilePicture: varchar("profile_picture", { length: 500 }),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const bookCategories = pgTable("book_categories", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	name: varchar("name", { length: 100 }).notNull().unique(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const books = pgTable(
	"books",
	{
		id: uuid("id")
			.primaryKey()
			.$defaultFn(() => uuidv7()),
		isbn: varchar("isbn", { length: 20 }).notNull().unique(),
		title: varchar("title", { length: 255 }).notNull(),
		description: text("description").notNull(),
		author: varchar("author", { length: 255 }).notNull(),
		publisher: varchar("publisher", { length: 255 }).notNull(),
		publishDate: date("publish_date").notNull(),
		language: varchar("language", { length: 50 }).notNull(),
		pages: integer("pages").notNull(),
		cover: varchar("cover", { length: 500 }).notNull(),
		categoryId: uuid("category_id").references(() => bookCategories.id, {
			onDelete: "set null",
		}),
		price: decimal("price", { precision: 10, scale: 2 }).notNull(),
		discount: decimal("discount", { precision: 10, scale: 2 })
			.default("0")
			.notNull(),
		stock: integer("stock").default(0).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		check("books_discount_check", sql`${table.discount} >= 0`),
		check("books_stock_check", sql`${table.stock} >= 0`),
		check("books_price_check", sql`${table.price} > 0`),
		check("books_discount_percentage_check", sql`${table.discount} <= 100`),
	],
);

export const bookmarks = pgTable(
	"bookmarks",
	{
		id: uuid("id")
			.primaryKey()
			.$defaultFn(() => uuidv7()),
		userId: uuid("user_id")
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		bookId: uuid("book_id")
			.references(() => books.id, { onDelete: "cascade" })
			.notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		uniqueIndex("bookmarks_user_book_unique").on(table.userId, table.bookId),
	],
);

export const reviews = pgTable(
	"reviews",
	{
		id: uuid("id")
			.primaryKey()
			.$defaultFn(() => uuidv7()),
		userId: uuid("user_id")
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		bookId: uuid("book_id")
			.references(() => books.id, { onDelete: "cascade" })
			.notNull(),
		rating: integer("rating").notNull(),
		description: text("description").notNull(),
		likeCount: integer("like_count").default(0).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		check("reviews_rating_check", sql`${table.rating} BETWEEN 1 AND 5`),
		uniqueIndex("reviews_user_book_unique").on(table.userId, table.bookId),
	],
);

export const carts = pgTable(
	"carts",
	{
		id: uuid("id")
			.primaryKey()
			.$defaultFn(() => uuidv7()),
		userId: uuid("user_id")
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		bookId: uuid("book_id")
			.references(() => books.id, { onDelete: "cascade" })
			.notNull(),
		quantity: integer("quantity").default(1).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		check("carts_quantity_check", sql`${table.quantity} > 0`),
		uniqueIndex("carts_user_book_unique").on(table.userId, table.bookId),
	],
);

export const paymentMethods = pgTable("payment_methods", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	code: varchar("code", { length: 50 }).notNull().unique(),
	name: varchar("name", { length: 100 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const voucherTypes = pgTable("voucher_types", {
	id: uuid("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	name: varchar("name", { length: 100 }).notNull().unique(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const vouchers = pgTable(
	"vouchers",
	{
		id: uuid("id")
			.primaryKey()
			.$defaultFn(() => uuidv7()),
		code: varchar("code", { length: 50 }).notNull().unique(),
		title: varchar("title", { length: 255 }).notNull(),
		description: text("description").notNull(),
		voucherTypeId: uuid("voucher_type_id").references(() => voucherTypes.id, {
			onDelete: "restrict",
		}),
		discountType: discountTypeEnum("discount_type").notNull(),
		discountValue: decimal("discount_value", {
			precision: 10,
			scale: 2,
		}).notNull(),
		maxDiscount: decimal("max_discount", {
			precision: 10,
			scale: 2,
		}),
		minTransaction: decimal("min_transaction", {
			precision: 10,
			scale: 2,
		})
			.default("0")
			.notNull(),
		startDate: timestamp("start_date", { withTimezone: true }).notNull(),
		endDate: timestamp("end_date", { withTimezone: true }).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		check("vouchers_discount_value_check", sql`${table.discountValue} > 0`),
		check("vouchers_min_transaction_check", sql`${table.minTransaction} >= 0`),
		check("vouchers_max_discount_check", sql`${table.maxDiscount} >= 0`),
		check(
			"vouchers_start_date_check",
			sql`${table.startDate} < ${table.endDate}`,
		),
	],
);

export const transactionHistories = pgTable(
	"transaction_histories",
	{
		id: uuid("id")
			.primaryKey()
			.$defaultFn(() => uuidv7()),
		code: varchar("code", { length: 50 }).notNull().unique(),
		userId: uuid("user_id")
			.references(() => users.id, { onDelete: "restrict" })
			.notNull(),
		paymentMethodId: uuid("payment_method_id")
			.references(() => paymentMethods.id, { onDelete: "restrict" })
			.notNull(),
		voucherId: uuid("voucher_id").references(() => vouchers.id, {
			onDelete: "set null",
		}),
		userName: varchar("user_name", { length: 255 }).notNull(),
		phoneNumber: varchar("phone_number", { length: 30 }).notNull(),
		address: text("address").notNull(),
		subtotal: decimal("subtotal", {
			precision: 10,
			scale: 2,
		}).notNull(),
		totalDiscount: decimal("total_discount", {
			precision: 10,
			scale: 2,
		})
			.default("0")
			.notNull(),
		totalAmount: decimal("total_amount", {
			precision: 10,
			scale: 2,
		}).notNull(),
		status: transactionStatusEnum("status").default("PENDING").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
		paidAt: timestamp("paid_at", { withTimezone: true }),
	},
	(table) => [
		check("transaction_histories_subtotal_check", sql`${table.subtotal} > 0`),
		check(
			"transaction_histories_total_discount_check",
			sql`${table.totalDiscount} >= 0`,
		),
		check(
			"transaction_histories_total_amount_check",
			sql`${table.totalAmount} > 0`,
		),
	],
);

export const transactionDetails = pgTable(
	"transaction_details",
	{
		id: uuid("id")
			.primaryKey()
			.$defaultFn(() => uuidv7()),
		transactionHistoryId: uuid("transaction_history_id")
			.references(() => transactionHistories.id, { onDelete: "cascade" })
			.notNull(),
		bookId: uuid("book_id").references(() => books.id, {
			onDelete: "set null",
		}),
		bookIsbn: varchar("book_isbn", { length: 20 }).notNull(),
		bookTitle: varchar("book_title", { length: 255 }).notNull(),
		price: decimal("price", {
			precision: 10,
			scale: 2,
		}).notNull(),
		discount: decimal("discount", {
			precision: 10,
			scale: 2,
		})
			.default("0")
			.notNull(),
		quantity: integer("quantity").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		check("transaction_details_quantity_check", sql`${table.quantity} > 0`),
		check("transaction_details_discount_check", sql`${table.discount} >= 0`),
		check("transaction_details_price_check", sql`${table.price} > 0`),
	],
);

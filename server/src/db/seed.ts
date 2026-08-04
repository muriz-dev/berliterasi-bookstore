import * as fs from "fs";
import * as path from "path";
import { db } from "./connection";
import {
	bookCategories,
	bookmarks,
	books,
	carts,
	paymentMethods,
	reviews,
	transactionDetails,
	transactionHistories,
	users,
	vouchers,
	voucherTypes,
} from "./schema";

async function main() {
	console.log("Seeding started...");

	// 1. Categories
	console.log("Inserting categories...");
	const categories = [
		{ name: "Fiction" },
		{ name: "Non-Fiction" },
		{ name: "Science Fiction" },
		{ name: "Fantasy" },
		{ name: "Biography" },
	];
	const insertedCategories = await db
		.insert(bookCategories)
		.values(categories)
		.returning();
	console.log(`Inserted ${insertedCategories.length} categories.`);

	// 2. Users
	console.log("Inserting users...");
	const defaultPassword = await Bun.password.hash("password123");
	const dummyUsers = [
		{
			name: "Budi Santoso",
			email: "budi@example.com",
			passwordHash: defaultPassword,
			gender: "MALE" as const,
			phoneNumber: "081234567890",
			address: "Jl. Merdeka No. 1, Jakarta",
		},
		{
			name: "Siti Aminah",
			email: "siti@example.com",
			passwordHash: defaultPassword,
			gender: "FEMALE" as const,
			phoneNumber: "081987654321",
			address: "Jl. Sudirman No. 2, Bandung",
		},
		{
			name: "Andi Saputra",
			email: "andi@example.com",
			passwordHash: defaultPassword,
			gender: "MALE" as const,
			phoneNumber: "08122334455",
			address: "Jl. Thamrin No. 3, Surabaya",
		},
	];
	const insertedUsers = await db.insert(users).values(dummyUsers).returning();
	console.log(`Inserted ${insertedUsers.length} users.`);

	// 3. Payment Methods
	console.log("Inserting payment methods...");
	const pmData = [
		{ code: "BCA_VA", name: "BCA Virtual Account" },
		{ code: "MANDIRI_VA", name: "Mandiri Virtual Account" },
		{ code: "GOPAY", name: "GoPay" },
		{ code: "OVO", name: "OVO" },
		{ code: "CASH", name: "Cash on Delivery" },
	];
	const insertedPMs = await db
		.insert(paymentMethods)
		.values(pmData)
		.returning();
	console.log(`Inserted ${insertedPMs.length} payment methods.`);

	// 4. Voucher Types & Vouchers
	console.log("Inserting vouchers...");
	const vtData = [{ name: "Discount" }, { name: "Cashback" }];
	const insertedVTs = await db.insert(voucherTypes).values(vtData).returning();

	const voucherData = [
		{
			code: "WELCOME10",
			title: "Welcome 10% Off",
			description: "Diskon 10% untuk pengguna baru",
			voucherTypeId: insertedVTs[0].id,
			discountType: "PERCENTAGE" as const,
			discountValue: "10.00",
			maxDiscount: "50000.00",
			minTransaction: "100000.00",
			startDate: new Date("2024-01-01"),
			endDate: new Date("2026-12-31"),
		},
		{
			code: "DISKON50K",
			title: "Potongan Rp50.000",
			description: "Potongan harga langsung 50rb",
			voucherTypeId: insertedVTs[0].id,
			discountType: "FIXED" as const,
			discountValue: "50000.00",
			maxDiscount: "50000.00",
			minTransaction: "150000.00",
			startDate: new Date("2024-01-01"),
			endDate: new Date("2026-12-31"),
		},
	];
	const insertedVouchers = await db
		.insert(vouchers)
		.values(voucherData)
		.returning();
	console.log(`Inserted ${insertedVouchers.length} vouchers.`);

	// 5. Books
	console.log("Reading Books.csv and inserting books...");
	const csvPath = path.resolve(process.cwd(), "Books.csv");
	const fileContent = fs.readFileSync(csvPath, "utf-8");
	const lines = fileContent.split("\n");

	const booksToInsert = [];
	let count = 0;

	for (let i = 1; i < lines.length; i++) {
		const line = lines[i].trim();
		if (!line) continue;

		const columns = line.split(",");
		if (columns.length === 8 && !line.includes('"')) {
			const isbn = columns[0].substring(0, 20);
			const title = columns[1].substring(0, 255);
			const author = columns[2].substring(0, 255);
			const yearStr = columns[3];
			const publisher = columns[4].substring(0, 255);
			const coverL = columns[7].substring(0, 500);

			let publishDate = "2000-01-01";
			const year = Number(yearStr);
			if (!isNaN(year) && year > 1000) {
				publishDate = `${year}-01-01`;
			}

			const randomCategory =
				insertedCategories[
					Math.floor(Math.random() * insertedCategories.length)
				];
			const price = (Math.random() * 150000 + 50000).toFixed(2); // Rp 50.000 - Rp 200.000
			const pages = Math.floor(Math.random() * 400) + 100;
			const stock = Math.floor(Math.random() * 100) + 10;

			booksToInsert.push({
				isbn: isbn,
				title: title,
				description: `Buku menarik berjudul ${title} ditulis oleh ${author}, diterbitkan oleh ${publisher}.`,
				author: author,
				publisher: publisher,
				publishDate: publishDate,
				language: "Indonesian",
				pages: pages,
				cover: coverL,
				categoryId: randomCategory.id,
				price: price,
				discount: "0.00",
				stock: stock,
			});
			count++;

			if (count >= 50) break;
		}
	}

	let insertedBooks: any[] = [];
	if (booksToInsert.length > 0) {
		insertedBooks = await db.insert(books).values(booksToInsert).returning();
		console.log(`Inserted ${insertedBooks.length} books.`);
	} else {
		console.log("No books to insert. Seeding aborted.");
		process.exit(1);
	}

	// 6. Bookmarks, Reviews, Carts
	console.log("Inserting user interactions (Bookmarks, Reviews, Carts)...");
	const bookmarksToInsert = [];
	const reviewsToInsert = [];
	const cartsToInsert = [];

	// Assign some random books to each user
	for (const user of insertedUsers) {
		// pick 3 random books for bookmark, 2 for review, 2 for cart
		const userBooks = [...insertedBooks].sort(() => 0.5 - Math.random());

		// Bookmarks
		for (let i = 0; i < 3; i++) {
			bookmarksToInsert.push({
				userId: user.id,
				bookId: userBooks[i].id,
			});
		}

		// Reviews
		for (let i = 3; i < 5; i++) {
			reviewsToInsert.push({
				userId: user.id,
				bookId: userBooks[i].id,
				rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
				description: "Buku yang sangat bagus dan sangat direkomendasikan!",
			});
		}

		// Carts
		for (let i = 5; i < 7; i++) {
			cartsToInsert.push({
				userId: user.id,
				bookId: userBooks[i].id,
				quantity: Math.floor(Math.random() * 2) + 1, // 1 or 2
			});
		}
	}

	await db.insert(bookmarks).values(bookmarksToInsert);
	await db.insert(reviews).values(reviewsToInsert);
	await db.insert(carts).values(cartsToInsert);
	console.log("Inserted user interactions.");

	// 7. Transaction History & Details
	console.log("Inserting transactions...");
	const trxHistoriesToInsert = [];

	// We'll create 1 transaction per user
	for (let i = 0; i < insertedUsers.length; i++) {
		const user = insertedUsers[i];
		const pm = insertedPMs[i % insertedPMs.length];
		const voucher = i % 2 === 0 ? insertedVouchers[0] : null; // Alternate vouchers

		// Pick 2 random books for this transaction
		const trxBooks = [...insertedBooks]
			.sort(() => 0.5 - Math.random())
			.slice(0, 2);

		let subtotal = 0;
		for (const b of trxBooks) {
			subtotal += parseFloat(b.price);
		}

		let totalDiscount = 0;
		if (voucher) {
			if (voucher.discountType === "PERCENTAGE") {
				let discountAmount =
					subtotal * (parseFloat(voucher.discountValue) / 100);
				if (discountAmount > parseFloat(voucher.maxDiscount!)) {
					discountAmount = parseFloat(voucher.maxDiscount!);
				}
				totalDiscount = discountAmount;
			} else {
				totalDiscount = parseFloat(voucher.discountValue);
			}
		}

		let totalAmount = subtotal - totalDiscount;
		if (totalAmount < 0) totalAmount = 0;

		trxHistoriesToInsert.push({
			code: `TRX-${Date.now()}-${i}`,
			userId: user.id,
			paymentMethodId: pm.id,
			voucherId: voucher ? voucher.id : null,
			userName: user.name,
			phoneNumber: user.phoneNumber,
			address: user.address,
			subtotal: subtotal.toFixed(2),
			totalDiscount: totalDiscount.toFixed(2),
			totalAmount: totalAmount.toFixed(2),
			status: "PAID" as const,
			paidAt: new Date(),
		});
	}

	const insertedTrx = await db
		.insert(transactionHistories)
		.values(trxHistoriesToInsert)
		.returning();

	// Insert details for each transaction
	const trxDetailsToInsert = [];
	for (let i = 0; i < insertedTrx.length; i++) {
		const trx = insertedTrx[i];
		// We know we picked 2 random books for each user earlier, let's just pick 2 again to simplify
		const trxBooks = [...insertedBooks]
			.sort(() => 0.5 - Math.random())
			.slice(0, 2);

		for (const b of trxBooks) {
			trxDetailsToInsert.push({
				transactionHistoryId: trx.id,
				bookId: b.id,
				bookIsbn: b.isbn,
				bookTitle: b.title,
				price: b.price,
				discount: b.discount,
				quantity: 1,
			});
		}
	}

	await db.insert(transactionDetails).values(trxDetailsToInsert);
	console.log("Inserted transactions and details.");

	console.log("Seeding completed successfully.");
	process.exit(0);
}

main().catch((err) => {
	console.error("Error during seeding:", err);
	process.exit(1);
});

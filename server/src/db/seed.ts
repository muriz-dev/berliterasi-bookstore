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

	// Hapus semua data lama (urutan penting karena foreign key)
	console.log("Clearing existing data...");
	await db.delete(transactionDetails);
	await db.delete(transactionHistories);
	await db.delete(bookmarks);
	await db.delete(reviews);
	await db.delete(carts);
	await db.delete(books);
	await db.delete(bookCategories);
	await db.delete(vouchers);
	await db.delete(voucherTypes);
	await db.delete(paymentMethods);
	await db.delete(users);
	console.log("Existing data cleared.");


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
	console.log("Inserting books...");
	const booksToInsert = [];

	const booksData = 
	[
		{
			"isbn": "0195153448",
			"title": "Classical Mythology",
			"description": "Buku menarik berjudul Classical Mythology ditulis oleh Mark P. O. Morford, diterbitkan oleh Oxford University Press.",
			"author": "Mark P. O. Morford",
			"publisher": "Oxford University Press",
			"publishDate": "2002-01-01",
			"language": "Indonesian",
			"pages": 203,
			"cover": "http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg",
			"price": "177998.88",
			"discount": "0.00",
			"stock": 100
		},
		{
			"isbn": "0002005018",
			"title": "Clara Callan",
			"description": "Buku menarik berjudul Clara Callan ditulis oleh Richard Bruce Wright, diterbitkan oleh HarperFlamingo Canada.",
			"author": "Richard Bruce Wright",
			"publisher": "HarperFlamingo Canada",
			"publishDate": "2001-01-01",
			"language": "Indonesian",
			"pages": 137,
			"cover": "http://images.amazon.com/images/P/0002005018.01.LZZZZZZZ.jpg",
			"price": "168924.87",
			"discount": "0.00",
			"stock": 45
		},
		{
			"isbn": "0060973129",
			"title": "Decision in Normandy",
			"description": "Buku menarik berjudul Decision in Normandy ditulis oleh Carlo D'Este, diterbitkan oleh HarperPerennial.",
			"author": "Carlo D'Este",
			"publisher": "HarperPerennial",
			"publishDate": "1991-01-01",
			"language": "Indonesian",
			"pages": 463,
			"cover": "http://images.amazon.com/images/P/0060973129.01.LZZZZZZZ.jpg",
			"price": "72992.02",
			"discount": "0.00",
			"stock": 81
		},
		{
			"isbn": "0374157065",
			"title": "Flu: The Story of the Great Influenza Pandemic of 1918 and the Search for the Virus That Caused It",
			"description": "Buku menarik berjudul Flu: The Story of the Great Influenza Pandemic of 1918 and the Search for the Virus That Caused It ditulis oleh Gina Bari Kolata, diterbitkan oleh Farrar Straus Giroux.",
			"author": "Gina Bari Kolata",
			"publisher": "Farrar Straus Giroux",
			"publishDate": "1999-01-01",
			"language": "Indonesian",
			"pages": 490,
			"cover": "http://images.amazon.com/images/P/0374157065.01.LZZZZZZZ.jpg",
			"price": "198157.89",
			"discount": "0.00",
			"stock": 30
		},
		{
			"isbn": "0393045218",
			"title": "The Mummies of Urumchi",
			"description": "Buku menarik berjudul The Mummies of Urumchi ditulis oleh E. J. W. Barber, diterbitkan oleh W. W. Norton &amp; Company.",
			"author": "E. J. W. Barber",
			"publisher": "W. W. Norton &amp; Company",
			"publishDate": "1999-01-01",
			"language": "Indonesian",
			"pages": 295,
			"cover": "http://images.amazon.com/images/P/0393045218.01.LZZZZZZZ.jpg",
			"price": "186429.51",
			"discount": "0.00",
			"stock": 48
		},
		{
			"isbn": "0399135782",
			"title": "The Kitchen God's Wife",
			"description": "Buku menarik berjudul The Kitchen God's Wife ditulis oleh Amy Tan, diterbitkan oleh Putnam Pub Group.",
			"author": "Amy Tan",
			"publisher": "Putnam Pub Group",
			"publishDate": "1991-01-01",
			"language": "Indonesian",
			"pages": 172,
			"cover": "http://images.amazon.com/images/P/0399135782.01.LZZZZZZZ.jpg",
			"price": "120671.12",
			"discount": "0.00",
			"stock": 63
		},
		{
			"isbn": "0425176428",
			"title": "What If?: The World's Foremost Military Historians Imagine What Might Have Been",
			"description": "Buku menarik berjudul What If?: The World's Foremost Military Historians Imagine What Might Have Been ditulis oleh Robert Cowley, diterbitkan oleh Berkley Publishing Group.",
			"author": "Robert Cowley",
			"publisher": "Berkley Publishing Group",
			"publishDate": "2000-01-01",
			"language": "Indonesian",
			"pages": 452,
			"cover": "http://images.amazon.com/images/P/0425176428.01.LZZZZZZZ.jpg",
			"price": "162894.16",
			"discount": "0.00",
			"stock": 13
		},
		{
			"isbn": "0671870432",
			"title": "PLEADING GUILTY",
			"description": "Buku menarik berjudul PLEADING GUILTY ditulis oleh Scott Turow, diterbitkan oleh Audioworks.",
			"author": "Scott Turow",
			"publisher": "Audioworks",
			"publishDate": "1993-01-01",
			"language": "Indonesian",
			"pages": 171,
			"cover": "http://images.amazon.com/images/P/0671870432.01.LZZZZZZZ.jpg",
			"price": "142742.85",
			"discount": "0.00",
			"stock": 26
		},
		{
			"isbn": "0679425608",
			"title": "Under the Black Flag: The Romance and the Reality of Life Among the Pirates",
			"description": "Buku menarik berjudul Under the Black Flag: The Romance and the Reality of Life Among the Pirates ditulis oleh David Cordingly, diterbitkan oleh Random House.",
			"author": "David Cordingly",
			"publisher": "Random House",
			"publishDate": "1996-01-01",
			"language": "Indonesian",
			"pages": 459,
			"cover": "http://images.amazon.com/images/P/0679425608.01.LZZZZZZZ.jpg",
			"price": "155467.22",
			"discount": "0.00",
			"stock": 84
		},
		{
			"isbn": "074322678X",
			"title": "Where You'll Find Me: And Other Stories",
			"description": "Buku menarik berjudul Where You'll Find Me: And Other Stories ditulis oleh Ann Beattie, diterbitkan oleh Scribner.",
			"author": "Ann Beattie",
			"publisher": "Scribner",
			"publishDate": "2002-01-01",
			"language": "Indonesian",
			"pages": 396,
			"cover": "http://images.amazon.com/images/P/074322678X.01.LZZZZZZZ.jpg",
			"price": "130299.80",
			"discount": "0.00",
			"stock": 96
		},
		{
			"isbn": "0771074670",
			"title": "Nights Below Station Street",
			"description": "Buku menarik berjudul Nights Below Station Street ditulis oleh David Adams Richards, diterbitkan oleh Emblem Editions.",
			"author": "David Adams Richards",
			"publisher": "Emblem Editions",
			"publishDate": "1988-01-01",
			"language": "Indonesian",
			"pages": 258,
			"cover": "http://images.amazon.com/images/P/0771074670.01.LZZZZZZZ.jpg",
			"price": "64709.44",
			"discount": "0.00",
			"stock": 59
		},
		{
			"isbn": "080652121X",
			"title": "Hitler's Secret Bankers: The Myth of Swiss Neutrality During the Holocaust",
			"description": "Buku menarik berjudul Hitler's Secret Bankers: The Myth of Swiss Neutrality During the Holocaust ditulis oleh Adam Lebor, diterbitkan oleh Citadel Press.",
			"author": "Adam Lebor",
			"publisher": "Citadel Press",
			"publishDate": "2000-01-01",
			"language": "Indonesian",
			"pages": 254,
			"cover": "http://images.amazon.com/images/P/080652121X.01.LZZZZZZZ.jpg",
			"price": "85277.45",
			"discount": "0.00",
			"stock": 43
		},
		{
			"isbn": "0887841740",
			"title": "The Middle Stories",
			"description": "Buku menarik berjudul The Middle Stories ditulis oleh Sheila Heti, diterbitkan oleh House of Anansi Press.",
			"author": "Sheila Heti",
			"publisher": "House of Anansi Press",
			"publishDate": "2004-01-01",
			"language": "Indonesian",
			"pages": 480,
			"cover": "http://images.amazon.com/images/P/0887841740.01.LZZZZZZZ.jpg",
			"price": "102004.01",
			"discount": "0.00",
			"stock": 81
		},
		{
			"isbn": "1552041778",
			"title": "Jane Doe",
			"description": "Buku menarik berjudul Jane Doe ditulis oleh R. J. Kaiser, diterbitkan oleh Mira Books.",
			"author": "R. J. Kaiser",
			"publisher": "Mira Books",
			"publishDate": "1999-01-01",
			"language": "Indonesian",
			"pages": 313,
			"cover": "http://images.amazon.com/images/P/1552041778.01.LZZZZZZZ.jpg",
			"price": "72757.39",
			"discount": "0.00",
			"stock": 89
		},
		{
			"isbn": "1558746218",
			"title": "A Second Chicken Soup for the Woman's Soul (Chicken Soup for the Soul Series)",
			"description": "Buku menarik berjudul A Second Chicken Soup for the Woman's Soul (Chicken Soup for the Soul Series) ditulis oleh Jack Canfield, diterbitkan oleh Health Communications.",
			"author": "Jack Canfield",
			"publisher": "Health Communications",
			"publishDate": "1998-01-01",
			"language": "Indonesian",
			"pages": 439,
			"cover": "http://images.amazon.com/images/P/1558746218.01.LZZZZZZZ.jpg",
			"price": "125041.49",
			"discount": "0.00",
			"stock": 81
		},
		{
			"isbn": "1567407781",
			"title": "The Witchfinder (Amos Walker Mystery Series)",
			"description": "Buku menarik berjudul The Witchfinder (Amos Walker Mystery Series) ditulis oleh Loren D. Estleman, diterbitkan oleh Brilliance Audio - Trade.",
			"author": "Loren D. Estleman",
			"publisher": "Brilliance Audio - Trade",
			"publishDate": "1998-01-01",
			"language": "Indonesian",
			"pages": 336,
			"cover": "http://images.amazon.com/images/P/1567407781.01.LZZZZZZZ.jpg",
			"price": "162434.36",
			"discount": "0.00",
			"stock": 49
		},
		{
			"isbn": "1575663937",
			"title": "More Cunning Than Man: A Social History of Rats and Man",
			"description": "Buku menarik berjudul More Cunning Than Man: A Social History of Rats and Man ditulis oleh Robert Hendrickson, diterbitkan oleh Kensington Publishing Corp..",
			"author": "Robert Hendrickson",
			"publisher": "Kensington Publishing Corp.",
			"publishDate": "1999-01-01",
			"language": "Indonesian",
			"pages": 240,
			"cover": "http://images.amazon.com/images/P/1575663937.01.LZZZZZZZ.jpg",
			"price": "118170.36",
			"discount": "0.00",
			"stock": 24
		},
		{
			"isbn": "1881320189",
			"title": "Goodbye to the Buttermilk Sky",
			"description": "Buku menarik berjudul Goodbye to the Buttermilk Sky ditulis oleh Julia Oliver, diterbitkan oleh River City Pub.",
			"author": "Julia Oliver",
			"publisher": "River City Pub",
			"publishDate": "1994-01-01",
			"language": "Indonesian",
			"pages": 262,
			"cover": "http://images.amazon.com/images/P/1881320189.01.LZZZZZZZ.jpg",
			"price": "117576.79",
			"discount": "0.00",
			"stock": 44
		},
		{
			"isbn": "0440234743",
			"title": "The Testament",
			"description": "Buku menarik berjudul The Testament ditulis oleh John Grisham, diterbitkan oleh Dell.",
			"author": "John Grisham",
			"publisher": "Dell",
			"publishDate": "1999-01-01",
			"language": "Indonesian",
			"pages": 280,
			"cover": "http://images.amazon.com/images/P/0440234743.01.LZZZZZZZ.jpg",
			"price": "182144.03",
			"discount": "0.00",
			"stock": 48
		},
		{
			"isbn": "0452264464",
			"title": "Beloved (Plume Contemporary Fiction)",
			"description": "Buku menarik berjudul Beloved (Plume Contemporary Fiction) ditulis oleh Toni Morrison, diterbitkan oleh Plume.",
			"author": "Toni Morrison",
			"publisher": "Plume",
			"publishDate": "1994-01-01",
			"language": "Indonesian",
			"pages": 436,
			"cover": "http://images.amazon.com/images/P/0452264464.01.LZZZZZZZ.jpg",
			"price": "148514.86",
			"discount": "0.00",
			"stock": 61
		},
		{
			"isbn": "0609804618",
			"title": "Our Dumb Century: The Onion Presents 100 Years of Headlines from America's Finest News Source",
			"description": "Buku menarik berjudul Our Dumb Century: The Onion Presents 100 Years of Headlines from America's Finest News Source ditulis oleh The Onion, diterbitkan oleh Three Rivers Press.",
			"author": "The Onion",
			"publisher": "Three Rivers Press",
			"publishDate": "1999-01-01",
			"language": "Indonesian",
			"pages": 479,
			"cover": "http://images.amazon.com/images/P/0609804618.01.LZZZZZZZ.jpg",
			"price": "162188.71",
			"discount": "0.00",
			"stock": 83
		},
		{
			"isbn": "1841721522",
			"title": "New Vegetarian: Bold and Beautiful Recipes for Every Occasion",
			"description": "Buku menarik berjudul New Vegetarian: Bold and Beautiful Recipes for Every Occasion ditulis oleh Celia Brooks Brown, diterbitkan oleh Ryland Peters &amp; Small Ltd.",
			"author": "Celia Brooks Brown",
			"publisher": "Ryland Peters &amp; Small Ltd",
			"publishDate": "2001-01-01",
			"language": "Indonesian",
			"pages": 454,
			"cover": "http://images.amazon.com/images/P/1841721522.01.LZZZZZZZ.jpg",
			"price": "149671.88",
			"discount": "0.00",
			"stock": 77
		},
		{
			"isbn": "1879384493",
			"title": "If I'd Known Then What I Know Now: Why Not Learn from the Mistakes of Others? : You Can't Afford to Make Them All Yourself",
			"description": "Buku menarik berjudul If I'd Known Then What I Know Now: Why Not Learn from the Mistakes of Others? : You Can't Afford to Make Them All Yourself ditulis oleh J. R. Parrish, diterbitkan oleh Cypress House.",
			"author": "J. R. Parrish",
			"publisher": "Cypress House",
			"publishDate": "2003-01-01",
			"language": "Indonesian",
			"pages": 459,
			"cover": "http://images.amazon.com/images/P/1879384493.01.LZZZZZZZ.jpg",
			"price": "74121.02",
			"discount": "0.00",
			"stock": 23
		},
		{
			"isbn": "0061076031",
			"title": "Mary-Kate &amp; Ashley Switching Goals (Mary-Kate and Ashley Starring in)",
			"description": "Buku menarik berjudul Mary-Kate &amp; Ashley Switching Goals (Mary-Kate and Ashley Starring in) ditulis oleh Mary-Kate &amp; Ashley Olsen, diterbitkan oleh HarperEntertainment.",
			"author": "Mary-Kate &amp; Ashley Olsen",
			"publisher": "HarperEntertainment",
			"publishDate": "2000-01-01",
			"language": "Indonesian",
			"pages": 239,
			"cover": "http://images.amazon.com/images/P/0061076031.01.LZZZZZZZ.jpg",
			"price": "157496.22",
			"discount": "0.00",
			"stock": 59
		},
		{
			"isbn": "0439095026",
			"title": "Tell Me This Isn't Happening",
			"description": "Buku menarik berjudul Tell Me This Isn't Happening ditulis oleh Robynn Clairday, diterbitkan oleh Scholastic.",
			"author": "Robynn Clairday",
			"publisher": "Scholastic",
			"publishDate": "1999-01-01",
			"language": "Indonesian",
			"pages": 296,
			"cover": "http://images.amazon.com/images/P/0439095026.01.LZZZZZZZ.jpg",
			"price": "106951.16",
			"discount": "0.00",
			"stock": 18
		},
		{
			"isbn": "0689821166",
			"title": "Flood : Mississippi 1927",
			"description": "Buku menarik berjudul Flood : Mississippi 1927 ditulis oleh Kathleen Duey, diterbitkan oleh Aladdin.",
			"author": "Kathleen Duey",
			"publisher": "Aladdin",
			"publishDate": "1998-01-01",
			"language": "Indonesian",
			"pages": 253,
			"cover": "http://images.amazon.com/images/P/0689821166.01.LZZZZZZZ.jpg",
			"price": "157964.63",
			"discount": "0.00",
			"stock": 41
		},
		{
			"isbn": "0971880107",
			"title": "Wild Animus",
			"description": "Buku menarik berjudul Wild Animus ditulis oleh Rich Shapero, diterbitkan oleh Too Far.",
			"author": "Rich Shapero",
			"publisher": "Too Far",
			"publishDate": "2004-01-01",
			"language": "Indonesian",
			"pages": 194,
			"cover": "http://images.amazon.com/images/P/0971880107.01.LZZZZZZZ.jpg",
			"price": "181161.43",
			"discount": "0.00",
			"stock": 75
		},
		{
			"isbn": "0345402871",
			"title": "Airframe",
			"description": "Buku menarik berjudul Airframe ditulis oleh Michael Crichton, diterbitkan oleh Ballantine Books.",
			"author": "Michael Crichton",
			"publisher": "Ballantine Books",
			"publishDate": "1997-01-01",
			"language": "Indonesian",
			"pages": 186,
			"cover": "http://images.amazon.com/images/P/0345402871.01.LZZZZZZZ.jpg",
			"price": "190551.21",
			"discount": "0.00",
			"stock": 58
		},
		{
			"isbn": "0345417623",
			"title": "Timeline",
			"description": "Buku menarik berjudul Timeline ditulis oleh MICHAEL CRICHTON, diterbitkan oleh Ballantine Books.",
			"author": "MICHAEL CRICHTON",
			"publisher": "Ballantine Books",
			"publishDate": "2000-01-01",
			"language": "Indonesian",
			"pages": 214,
			"cover": "http://images.amazon.com/images/P/0345417623.01.LZZZZZZZ.jpg",
			"price": "126006.37",
			"discount": "0.00",
			"stock": 33
		},
		{
			"isbn": "0684823802",
			"title": "OUT OF THE SILENT PLANET",
			"description": "Buku menarik berjudul OUT OF THE SILENT PLANET ditulis oleh C.S. Lewis, diterbitkan oleh Scribner.",
			"author": "C.S. Lewis",
			"publisher": "Scribner",
			"publishDate": "1996-01-01",
			"language": "Indonesian",
			"pages": 103,
			"cover": "http://images.amazon.com/images/P/0684823802.01.LZZZZZZZ.jpg",
			"price": "129773.50",
			"discount": "0.00",
			"stock": 78
		},
		{
			"isbn": "0375759778",
			"title": "Prague : A Novel",
			"description": "Buku menarik berjudul Prague : A Novel ditulis oleh ARTHUR PHILLIPS, diterbitkan oleh Random House Trade Paperbacks.",
			"author": "ARTHUR PHILLIPS",
			"publisher": "Random House Trade Paperbacks",
			"publishDate": "2003-01-01",
			"language": "Indonesian",
			"pages": 167,
			"cover": "http://images.amazon.com/images/P/0375759778.01.LZZZZZZZ.jpg",
			"price": "101143.38",
			"discount": "0.00",
			"stock": 18
		},
		{
			"isbn": "0425163091",
			"title": "Chocolate Jesus",
			"description": "Buku menarik berjudul Chocolate Jesus ditulis oleh Stephan Jaramillo, diterbitkan oleh Berkley Publishing Group.",
			"author": "Stephan Jaramillo",
			"publisher": "Berkley Publishing Group",
			"publishDate": "1998-01-01",
			"language": "Indonesian",
			"pages": 173,
			"cover": "http://images.amazon.com/images/P/0425163091.01.LZZZZZZZ.jpg",
			"price": "128903.67",
			"discount": "0.00",
			"stock": 18
		},
		{
			"isbn": "3404921038",
			"title": "Wie Barney es sieht.",
			"description": "Buku menarik berjudul Wie Barney es sieht. ditulis oleh Mordecai Richler, diterbitkan oleh LÃ?Â¼bbe.",
			"author": "Mordecai Richler",
			"publisher": "LÃ?Â¼bbe",
			"publishDate": "2002-01-01",
			"language": "Indonesian",
			"pages": 332,
			"cover": "http://images.amazon.com/images/P/3404921038.01.LZZZZZZZ.jpg",
			"price": "140532.80",
			"discount": "0.00",
			"stock": 19
		},
		{
			"isbn": "3442353866",
			"title": "Der Fluch der Kaiserin. Ein Richter- Di- Roman.",
			"description": "Buku menarik berjudul Der Fluch der Kaiserin. Ein Richter- Di- Roman. ditulis oleh Eleanor Cooney, diterbitkan oleh Goldmann.",
			"author": "Eleanor Cooney",
			"publisher": "Goldmann",
			"publishDate": "2001-01-01",
			"language": "Indonesian",
			"pages": 346,
			"cover": "http://images.amazon.com/images/P/3442353866.01.LZZZZZZZ.jpg",
			"price": "169320.82",
			"discount": "0.00",
			"stock": 109
		},
		{
			"isbn": "3442410665",
			"title": "Sturmzeit. Roman.",
			"description": "Buku menarik berjudul Sturmzeit. Roman. ditulis oleh Charlotte Link, diterbitkan oleh Goldmann.",
			"author": "Charlotte Link",
			"publisher": "Goldmann",
			"publishDate": "1991-01-01",
			"language": "Indonesian",
			"pages": 404,
			"cover": "http://images.amazon.com/images/P/3442410665.01.LZZZZZZZ.jpg",
			"price": "58874.34",
			"discount": "0.00",
			"stock": 76
		},
		{
			"isbn": "3442446937",
			"title": "Tage der Unschuld.",
			"description": "Buku menarik berjudul Tage der Unschuld. ditulis oleh Richard North Patterson, diterbitkan oleh Goldmann.",
			"author": "Richard North Patterson",
			"publisher": "Goldmann",
			"publishDate": "2000-01-01",
			"language": "Indonesian",
			"pages": 281,
			"cover": "http://images.amazon.com/images/P/3442446937.01.LZZZZZZZ.jpg",
			"price": "55582.30",
			"discount": "0.00",
			"stock": 85
		},
		{
			"isbn": "0375406328",
			"title": "Lying Awake",
			"description": "Buku menarik berjudul Lying Awake ditulis oleh Mark Salzman, diterbitkan oleh Alfred A. Knopf.",
			"author": "Mark Salzman",
			"publisher": "Alfred A. Knopf",
			"publishDate": "2000-01-01",
			"language": "Indonesian",
			"pages": 128,
			"cover": "http://images.amazon.com/images/P/0375406328.01.LZZZZZZZ.jpg",
			"price": "162403.68",
			"discount": "0.00",
			"stock": 27
		},
		{
			"isbn": "0446310786",
			"title": "To Kill a Mockingbird",
			"description": "Buku menarik berjudul To Kill a Mockingbird ditulis oleh Harper Lee, diterbitkan oleh Little Brown &amp; Company.",
			"author": "Harper Lee",
			"publisher": "Little Brown &amp; Company",
			"publishDate": "1988-01-01",
			"language": "Indonesian",
			"pages": 384,
			"cover": "http://images.amazon.com/images/P/0446310786.01.LZZZZZZZ.jpg",
			"price": "190928.49",
			"discount": "0.00",
			"stock": 72
		},
		{
			"isbn": "0449005615",
			"title": "Seabiscuit: An American Legend",
			"description": "Buku menarik berjudul Seabiscuit: An American Legend ditulis oleh LAURA HILLENBRAND, diterbitkan oleh Ballantine Books.",
			"author": "LAURA HILLENBRAND",
			"publisher": "Ballantine Books",
			"publishDate": "2002-01-01",
			"language": "Indonesian",
			"pages": 110,
			"cover": "http://images.amazon.com/images/P/0449005615.01.LZZZZZZZ.jpg",
			"price": "180186.34",
			"discount": "0.00",
			"stock": 31
		},
		{
			"isbn": "0060168013",
			"title": "Pigs in Heaven",
			"description": "Buku menarik berjudul Pigs in Heaven ditulis oleh Barbara Kingsolver, diterbitkan oleh Harpercollins.",
			"author": "Barbara Kingsolver",
			"publisher": "Harpercollins",
			"publishDate": "1993-01-01",
			"language": "Indonesian",
			"pages": 428,
			"cover": "http://images.amazon.com/images/P/0060168013.01.LZZZZZZZ.jpg",
			"price": "131067.99",
			"discount": "0.00",
			"stock": 27
		},
		{
			"isbn": "038078243X",
			"title": "Miss Zukas and the Raven's Dance",
			"description": "Buku menarik berjudul Miss Zukas and the Raven's Dance ditulis oleh Jo Dereske, diterbitkan oleh Avon.",
			"author": "Jo Dereske",
			"publisher": "Avon",
			"publishDate": "1996-01-01",
			"language": "Indonesian",
			"pages": 434,
			"cover": "http://images.amazon.com/images/P/038078243X.01.LZZZZZZZ.jpg",
			"price": "173727.81",
			"discount": "0.00",
			"stock": 98
		},
		{
			"isbn": "055321215X",
			"title": "Pride and Prejudice",
			"description": "Buku menarik berjudul Pride and Prejudice ditulis oleh Jane Austen, diterbitkan oleh Bantam.",
			"author": "Jane Austen",
			"publisher": "Bantam",
			"publishDate": "1983-01-01",
			"language": "Indonesian",
			"pages": 429,
			"cover": "http://images.amazon.com/images/P/055321215X.01.LZZZZZZZ.jpg",
			"price": "159557.21",
			"discount": "0.00",
			"stock": 58
		},
		{
			"isbn": "067176537X",
			"title": "The Therapeutic Touch: How to Use Your Hands to Help or to Heal",
			"description": "Buku menarik berjudul The Therapeutic Touch: How to Use Your Hands to Help or to Heal ditulis oleh Dolores Krieger, diterbitkan oleh Fireside.",
			"author": "Dolores Krieger",
			"publisher": "Fireside",
			"publishDate": "1979-01-01",
			"language": "Indonesian",
			"pages": 483,
			"cover": "http://images.amazon.com/images/P/067176537X.01.LZZZZZZZ.jpg",
			"price": "125184.95",
			"discount": "0.00",
			"stock": 47
		},
		{
			"isbn": "0061099686",
			"title": "Downtown",
			"description": "Buku menarik berjudul Downtown ditulis oleh Anne Rivers Siddons, diterbitkan oleh HarperTorch.",
			"author": "Anne Rivers Siddons",
			"publisher": "HarperTorch",
			"publishDate": "1995-01-01",
			"language": "Indonesian",
			"pages": 197,
			"cover": "http://images.amazon.com/images/P/0061099686.01.LZZZZZZZ.jpg",
			"price": "89007.88",
			"discount": "0.00",
			"stock": 93
		},
		{
			"isbn": "0553582909",
			"title": "Icebound",
			"description": "Buku menarik berjudul Icebound ditulis oleh Dean R. Koontz, diterbitkan oleh Bantam Books.",
			"author": "Dean R. Koontz",
			"publisher": "Bantam Books",
			"publishDate": "2000-01-01",
			"language": "Indonesian",
			"pages": 255,
			"cover": "http://images.amazon.com/images/P/0553582909.01.LZZZZZZZ.jpg",
			"price": "66464.26",
			"discount": "0.00",
			"stock": 90
		},
		{
			"isbn": "0671888587",
			"title": "I'll Be Seeing You",
			"description": "Buku menarik berjudul I'll Be Seeing You ditulis oleh Mary Higgins Clark, diterbitkan oleh Pocket.",
			"author": "Mary Higgins Clark",
			"publisher": "Pocket",
			"publishDate": "1994-01-01",
			"language": "Indonesian",
			"pages": 396,
			"cover": "http://images.amazon.com/images/P/0671888587.01.LZZZZZZZ.jpg",
			"price": "195734.77",
			"discount": "0.00",
			"stock": 75
		},
		{
			"isbn": "0553582747",
			"title": "From the Corner of His Eye",
			"description": "Buku menarik berjudul From the Corner of His Eye ditulis oleh Dean Koontz, diterbitkan oleh Bantam Books.",
			"author": "Dean Koontz",
			"publisher": "Bantam Books",
			"publishDate": "2001-01-01",
			"language": "Indonesian",
			"pages": 303,
			"cover": "http://images.amazon.com/images/P/0553582747.01.LZZZZZZZ.jpg",
			"price": "82514.66",
			"discount": "0.00",
			"stock": 16
		},
		{
			"isbn": "0425182908",
			"title": "Isle of Dogs",
			"description": "Buku menarik berjudul Isle of Dogs ditulis oleh Patricia Cornwell, diterbitkan oleh Berkley Publishing Group.",
			"author": "Patricia Cornwell",
			"publisher": "Berkley Publishing Group",
			"publishDate": "2002-01-01",
			"language": "Indonesian",
			"pages": 481,
			"cover": "http://images.amazon.com/images/P/0425182908.01.LZZZZZZZ.jpg",
			"price": "98872.54",
			"discount": "0.00",
			"stock": 48
		},
		{
			"isbn": "042518630X",
			"title": "Purity in Death",
			"description": "Buku menarik berjudul Purity in Death ditulis oleh J.D. Robb, diterbitkan oleh Berkley Publishing Group.",
			"author": "J.D. Robb",
			"publisher": "Berkley Publishing Group",
			"publishDate": "2002-01-01",
			"language": "Indonesian",
			"pages": 233,
			"cover": "http://images.amazon.com/images/P/042518630X.01.LZZZZZZZ.jpg",
			"price": "138052.77",
			"discount": "0.00",
			"stock": 84
		},
		{
			"isbn": "0440223571",
			"title": "This Year It Will Be Different: And Other Stories",
			"description": "Buku menarik berjudul This Year It Will Be Different: And Other Stories ditulis oleh Maeve Binchy, diterbitkan oleh Dell.",
			"author": "Maeve Binchy",
			"publisher": "Dell",
			"publishDate": "1997-01-01",
			"language": "Indonesian",
			"pages": 432,
			"cover": "http://images.amazon.com/images/P/0440223571.01.LZZZZZZZ.jpg",
			"price": "171041.69",
			"discount": "0.00",
			"stock": 20
		}
	];

	for (const book of booksData) {
		const randomCategory =
			insertedCategories[
				Math.floor(Math.random() * insertedCategories.length)
			];
		booksToInsert.push({
			...book,
			categoryId: randomCategory.id,
		});
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

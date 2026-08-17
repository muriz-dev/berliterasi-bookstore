CREATE TYPE "discount_type" AS ENUM('FIXED', 'PERCENTAGE');--> statement-breakpoint
CREATE TYPE "gender" AS ENUM('MALE', 'FEMALE');--> statement-breakpoint
CREATE TYPE "transaction_status" AS ENUM('PENDING', 'PAID', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "book_categories" (
	"id" uuid PRIMARY KEY,
	"name" varchar(100) NOT NULL UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookmarks" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" uuid PRIMARY KEY,
	"isbn" varchar(20) NOT NULL UNIQUE,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"author" varchar(255) NOT NULL,
	"publisher" varchar(255) NOT NULL,
	"publish_date" date NOT NULL,
	"language" varchar(50) NOT NULL,
	"pages" integer NOT NULL,
	"cover" varchar(500) NOT NULL,
	"category_id" uuid,
	"price" numeric(10,2) NOT NULL,
	"discount" numeric(10,2) DEFAULT '0' NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "books_discount_check" CHECK ("discount" >= 0),
	CONSTRAINT "books_stock_check" CHECK ("stock" >= 0),
	CONSTRAINT "books_price_check" CHECK ("price" > 0),
	CONSTRAINT "books_discount_percentage_check" CHECK ("discount" <= 100)
);
--> statement-breakpoint
CREATE TABLE "carts" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "carts_quantity_check" CHECK ("quantity" > 0)
);
--> statement-breakpoint
CREATE TABLE "payment_methods" (
	"id" uuid PRIMARY KEY,
	"code" varchar(50) NOT NULL UNIQUE,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"description" text NOT NULL,
	"like_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reviews_rating_check" CHECK ("rating" BETWEEN 1 AND 5)
);
--> statement-breakpoint
CREATE TABLE "transaction_details" (
	"id" uuid PRIMARY KEY,
	"transaction_history_id" uuid NOT NULL,
	"book_id" uuid,
	"book_isbn" varchar(20) NOT NULL,
	"book_title" varchar(255) NOT NULL,
	"price" numeric(10,2) NOT NULL,
	"discount" numeric(10,2) DEFAULT '0' NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "transaction_details_quantity_check" CHECK ("quantity" > 0),
	CONSTRAINT "transaction_details_discount_check" CHECK ("discount" >= 0),
	CONSTRAINT "transaction_details_price_check" CHECK ("price" > 0)
);
--> statement-breakpoint
CREATE TABLE "transaction_histories" (
	"id" uuid PRIMARY KEY,
	"code" varchar(50) NOT NULL UNIQUE,
	"user_id" uuid NOT NULL,
	"payment_method_id" uuid NOT NULL,
	"voucher_id" uuid,
	"user_name" varchar(255) NOT NULL,
	"phone_number" varchar(30) NOT NULL,
	"address" text NOT NULL,
	"subtotal" numeric(10,2) NOT NULL,
	"total_discount" numeric(10,2) DEFAULT '0' NOT NULL,
	"total_amount" numeric(10,2) NOT NULL,
	"status" "transaction_status" DEFAULT 'PENDING'::"transaction_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"paid_at" timestamp with time zone,
	CONSTRAINT "transaction_histories_subtotal_check" CHECK ("subtotal" > 0),
	CONSTRAINT "transaction_histories_total_discount_check" CHECK ("total_discount" >= 0),
	CONSTRAINT "transaction_histories_total_amount_check" CHECK ("total_amount" > 0)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password_hash" varchar(255) NOT NULL,
	"gender" "gender" NOT NULL,
	"phone_number" varchar(30) NOT NULL,
	"address" text NOT NULL,
	"profile_picture" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voucher_types" (
	"id" uuid PRIMARY KEY,
	"name" varchar(100) NOT NULL UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vouchers" (
	"id" uuid PRIMARY KEY,
	"code" varchar(50) NOT NULL UNIQUE,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"voucher_type_id" uuid,
	"discount_type" "discount_type" NOT NULL,
	"discount_value" numeric(10,2) NOT NULL,
	"max_discount" numeric(10,2),
	"min_transaction" numeric(10,2) DEFAULT '0' NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "vouchers_discount_value_check" CHECK ("discount_value" > 0),
	CONSTRAINT "vouchers_min_transaction_check" CHECK ("min_transaction" >= 0),
	CONSTRAINT "vouchers_max_discount_check" CHECK ("max_discount" >= 0),
	CONSTRAINT "vouchers_start_date_check" CHECK ("start_date" < "end_date")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "bookmarks_user_book_unique" ON "bookmarks" ("user_id","book_id");--> statement-breakpoint
CREATE UNIQUE INDEX "carts_user_book_unique" ON "carts" ("user_id","book_id");--> statement-breakpoint
CREATE UNIQUE INDEX "reviews_user_book_unique" ON "reviews" ("user_id","book_id");--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_book_id_books_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_category_id_book_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "book_categories"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_book_id_books_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_book_id_books_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "transaction_details" ADD CONSTRAINT "transaction_details_hakJGMTTOpkd_fkey" FOREIGN KEY ("transaction_history_id") REFERENCES "transaction_histories"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "transaction_details" ADD CONSTRAINT "transaction_details_book_id_books_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "transaction_histories" ADD CONSTRAINT "transaction_histories_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "transaction_histories" ADD CONSTRAINT "transaction_histories_payment_method_id_payment_methods_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "transaction_histories" ADD CONSTRAINT "transaction_histories_voucher_id_vouchers_id_fkey" FOREIGN KEY ("voucher_id") REFERENCES "vouchers"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_voucher_type_id_voucher_types_id_fkey" FOREIGN KEY ("voucher_type_id") REFERENCES "voucher_types"("id") ON DELETE RESTRICT;
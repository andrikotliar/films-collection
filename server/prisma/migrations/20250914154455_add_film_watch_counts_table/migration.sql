-- CreateTable
CREATE TABLE "film_watch_counts" (
    "id" SERIAL NOT NULL,
    "real_counter" INTEGER NOT NULL DEFAULT 0,
    "approx_counter" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "film_watch_counts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "film_chapter_keys" (
    "key" TEXT NOT NULL,

    CONSTRAINT "film_chapter_keys_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "film_chapter_keys_key_key" ON "film_chapter_keys"("key");

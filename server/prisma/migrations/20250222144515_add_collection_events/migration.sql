-- CreateTable
CREATE TABLE "collection_events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "start_date_code" INTEGER NOT NULL,
    "end_date_code" INTEGER NOT NULL,

    CONSTRAINT "collection_events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "collection_events" ADD CONSTRAINT "collection_events_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

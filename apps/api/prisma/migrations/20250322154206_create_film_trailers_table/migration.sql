-- AlterTable
ALTER TABLE "films" DROP COLUMN "youtube_trailer_id",
ALTER COLUMN "poster" SET NOT NULL;

-- CreateTable
CREATE TABLE "film_trailers" (
    "id" SERIAL NOT NULL,
    "video_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "film_id" INTEGER NOT NULL,

    CONSTRAINT "film_trailers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "film_trailers_film_id_video_id_key" ON "film_trailers"("film_id", "video_id");

-- AddForeignKey
ALTER TABLE "film_trailers" ADD CONSTRAINT "film_trailers_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

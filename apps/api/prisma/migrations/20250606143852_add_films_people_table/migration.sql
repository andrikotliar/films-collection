-- CreateEnum
CREATE TYPE "person_role" AS ENUM ('DIRECTOR', 'WRITER', 'PRODUCER', 'COMPOSER', 'CAMERAMAN', 'CREATOR', 'ACTOR');

-- CreateTable
CREATE TABLE "films_people" (
    "id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "film_id" INTEGER NOT NULL,
    "role" "person_role" NOT NULL,
    "details" TEXT,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "films_people_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "films_people" ADD CONSTRAINT "films_people_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_people" ADD CONSTRAINT "films_people_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

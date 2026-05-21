/*
  Warnings:

  - You are about to drop the column `expires` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "operationalNotes" TEXT;
ALTER TABLE "Lead" ADD COLUMN "strategicSynthesis" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("id", "sessionToken", "userId") SELECT "id", "sessionToken", "userId" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

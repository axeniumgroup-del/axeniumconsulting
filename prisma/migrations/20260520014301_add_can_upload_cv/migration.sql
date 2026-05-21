-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL DEFAULT 'CLIENT',
    "isValidated" BOOLEAN NOT NULL DEFAULT false,
    "canUploadCV" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "image" TEXT,
    "cvUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "cvUrl", "email", "id", "image", "isValidated", "name", "phoneNumber", "role", "updatedAt") SELECT "createdAt", "cvUrl", "email", "id", "image", "isValidated", "name", "phoneNumber", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

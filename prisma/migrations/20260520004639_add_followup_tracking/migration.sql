-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "clientId" TEXT NOT NULL,
    "employeeId" TEXT,
    "notes" TEXT,
    "operationalNotes" TEXT,
    "strategicSynthesis" TEXT,
    "value" REAL,
    "followUpLevel" INTEGER NOT NULL DEFAULT 0,
    "lastContactAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Lead_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lead_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lead" ("clientId", "createdAt", "employeeId", "id", "notes", "operationalNotes", "status", "strategicSynthesis", "updatedAt", "value") SELECT "clientId", "createdAt", "employeeId", "id", "notes", "operationalNotes", "status", "strategicSynthesis", "updatedAt", "value" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

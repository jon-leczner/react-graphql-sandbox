-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ToDo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATETIME,
    "description" TEXT NOT NULL,
    "postedById" INTEGER NOT NULL,
    FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ToDo" ("id", "createdAt", "dueDate", "description", "postedById") SELECT "id", "createdAt", "dueDate", "description", "postedById" FROM "ToDo";
DROP TABLE "ToDo";
ALTER TABLE "new_ToDo" RENAME TO "ToDo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

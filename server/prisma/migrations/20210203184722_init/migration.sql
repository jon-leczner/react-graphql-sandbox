-- CreateTable
CREATE TABLE "ToDo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dueDate" DATETIME,
    "description" TEXT NOT NULL,
    "postedById" INTEGER NOT NULL,
    FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
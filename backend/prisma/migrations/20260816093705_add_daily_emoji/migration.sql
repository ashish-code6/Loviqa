-- CreateTable
CREATE TABLE "DailyEmoji" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "DailyEmoji_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyEmoji_userId_date_key" ON "DailyEmoji"("userId", "date");

-- AddForeignKey
ALTER TABLE "DailyEmoji" ADD CONSTRAINT "DailyEmoji_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

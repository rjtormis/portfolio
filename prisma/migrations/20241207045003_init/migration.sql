-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "totalDesktopView" INTEGER NOT NULL DEFAULT 0,
    "totalDeviceBreakdown" INTEGER NOT NULL DEFAULT 0,
    "totalEmailsReceived" INTEGER NOT NULL DEFAULT 0,
    "totalMobileUserView" INTEGER NOT NULL DEFAULT 0,
    "totalPageView" INTEGER NOT NULL DEFAULT 0,
    "totalVisitor" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "description" VARCHAR(256) NOT NULL,
    "techstack" JSONB NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "github" VARCHAR(256) NOT NULL,
    "live" VARCHAR(256) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mail" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "message" VARCHAR(256) NOT NULL,
    "sentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorViewPerMonth" (
    "month" VARCHAR(24) NOT NULL,
    "year" INTEGER NOT NULL,
    "totalPageViewPerMonth" INTEGER NOT NULL,

    CONSTRAINT "VisitorViewPerMonth_pkey" PRIMARY KEY ("month")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

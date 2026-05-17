-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "NewsStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AppealStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('GOVERNMENT', 'COMMUNITY', 'UTILITY', 'EMERGENCY');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MODERATOR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "news_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleRu" TEXT,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentRu" TEXT,
    "excerpt" TEXT,
    "excerptRu" TEXT,
    "imageUrl" TEXT,
    "status" "NewsStatus" NOT NULL DEFAULT 'DRAFT',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleRu" TEXT,
    "description" TEXT NOT NULL,
    "descriptionRu" TEXT,
    "location" TEXT,
    "imageUrl" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" "EventStatus" NOT NULL DEFAULT 'UPCOMING',
    "categoryId" TEXT,
    "maxAttendees" INTEGER,
    "isRegistrationOpen" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_registrations" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appeal_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appeal_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appeals" (
    "id" TEXT NOT NULL,
    "ticketNo" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "categoryId" TEXT,
    "message" TEXT NOT NULL,
    "status" "AppealStatus" NOT NULL DEFAULT 'PENDING',
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appeals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appeal_responses" (
    "id" TEXT NOT NULL,
    "appealId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appeal_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_albums" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleRu" TEXT,
    "description" TEXT,
    "coverUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gallery_albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_items" (
    "id" TEXT NOT NULL,
    "albumId" TEXT,
    "type" "MediaType" NOT NULL DEFAULT 'IMAGE',
    "url" TEXT NOT NULL,
    "thumbUrl" TEXT,
    "caption" TEXT,
    "captionRu" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gallery_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faq_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "questionRu" TEXT,
    "answer" TEXT NOT NULL,
    "answerRu" TEXT,
    "categoryId" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleRu" TEXT,
    "description" TEXT,
    "descriptionRu" TEXT,
    "url" TEXT,
    "phone" TEXT,
    "type" "ServiceType" NOT NULL,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_stats" (
    "id" TEXT NOT NULL,
    "residents" INTEGER NOT NULL DEFAULT 0,
    "households" INTEGER NOT NULL DEFAULT 0,
    "activeServices" INTEGER NOT NULL DEFAULT 0,
    "yearlyEvents" INTEGER NOT NULL DEFAULT 0,
    "streets" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "community_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_idx" ON "refresh_tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "news_categories_slug_key" ON "news_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "news_slug_key" ON "news"("slug");

-- CreateIndex
CREATE INDEX "news_status_publishedAt_idx" ON "news"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "news_categoryId_idx" ON "news"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "event_categories_slug_key" ON "event_categories"("slug");

-- CreateIndex
CREATE INDEX "events_status_startDate_idx" ON "events"("status", "startDate");

-- CreateIndex
CREATE INDEX "event_registrations_eventId_idx" ON "event_registrations"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "appeals_ticketNo_key" ON "appeals"("ticketNo");

-- CreateIndex
CREATE INDEX "appeals_status_idx" ON "appeals"("status");

-- CreateIndex
CREATE INDEX "appeals_ticketNo_idx" ON "appeals"("ticketNo");

-- CreateIndex
CREATE INDEX "appeal_responses_appealId_idx" ON "appeal_responses"("appealId");

-- CreateIndex
CREATE INDEX "gallery_items_albumId_idx" ON "gallery_items"("albumId");

-- CreateIndex
CREATE INDEX "faqs_categoryId_idx" ON "faqs"("categoryId");

-- CreateIndex
CREATE INDEX "services_type_isActive_idx" ON "services"("type", "isActive");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "news_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "event_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appeals" ADD CONSTRAINT "appeals_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "appeal_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appeal_responses" ADD CONSTRAINT "appeal_responses_appealId_fkey" FOREIGN KEY ("appealId") REFERENCES "appeals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appeal_responses" ADD CONSTRAINT "appeal_responses_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "gallery_albums"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "faq_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

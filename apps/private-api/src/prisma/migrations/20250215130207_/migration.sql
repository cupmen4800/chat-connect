-- CreateTable
CREATE TABLE "Hello" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Hello_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hello_publicId_key" ON "Hello"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Hello_name_key" ON "Hello"("name");

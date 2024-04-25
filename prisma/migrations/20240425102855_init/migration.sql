-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `namaSiswa` VARCHAR(191) NOT NULL,
    `username` VARCHAR(8) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nisn` VARCHAR(11) NOT NULL,
    `profileImage` VARCHAR(191) NULL,
    `role` ENUM('Siswa', 'Penulis', 'Admin') NOT NULL,
    `emailVerifiedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_id_username_email_nisn_createdAt_key`(`id`, `username`, `email`, `nisn`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Madings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    `article` TEXT NOT NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,
    `priority` ENUM('Normal', 'Important') NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `publishedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `madingId` INTEGER NOT NULL,
    `comment` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookmarks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `madingId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Analytics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `views` BIGINT NOT NULL DEFAULT 0,
    `bookmarks` BIGINT NOT NULL DEFAULT 0,
    `madingId` INTEGER NOT NULL,

    UNIQUE INDEX `Analytics_madingId_key`(`madingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Madings` ADD CONSTRAINT `Madings_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Madings` ADD CONSTRAINT `Madings_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_madingId_fkey` FOREIGN KEY (`madingId`) REFERENCES `Madings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmarks` ADD CONSTRAINT `Bookmarks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmarks` ADD CONSTRAINT `Bookmarks_madingId_fkey` FOREIGN KEY (`madingId`) REFERENCES `Madings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Analytics` ADD CONSTRAINT `Analytics_madingId_fkey` FOREIGN KEY (`madingId`) REFERENCES `Madings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `PRODUCT` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bar_code` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `quantities` BIGINT NOT NULL,

    UNIQUE INDEX `PRODUCT_bar_code_key`(`bar_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 15, 2025 at 07:01 AM
-- Server version: 10.6.23-MariaDB
-- PHP Version: 8.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flipmathzdsaxcw_FlipMather`
--

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `cloudinary_public_id` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `title`, `cloudinary_public_id`, `description`, `display_order`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Corner shot', 'corner-shot', 'Taken cover with his new gift', 1, '2025-12-14 17:18:42', '2025-12-14 18:32:48', NULL),
(2, 'Wet and Run', 'hit-and-run', 'Hot day, running - you think you\'d WANT to get sprayed', 2, '2025-12-14 18:34:08', '2025-12-14 18:36:54', NULL),
(3, 'Point blank', 'point-blank', 'Taken straight after falling and getting up - it was basically execution style.', 3, '2025-12-14 18:38:22', '2025-12-14 18:38:22', NULL),
(4, 'Nice smile', 'nice-smile', 'Delighted to receive her very own Christmas gift - sponsored by Servings of Grace', 4, '2025-12-14 18:39:19', '2025-12-14 18:39:19', NULL),
(5, 'Amazed', 'amazed', 'Shocked and Amazed at seeing some of the gifts given for Christmas by Servings of Grace', 5, '2025-12-14 18:40:09', '2025-12-14 18:40:09', NULL),
(6, 'Umfana closeup', 'umfana-close-up', 'Really wanted to be photographed, with no regard of seeing or receiving the image afterwards', 6, '2025-12-14 18:41:33', '2025-12-14 18:41:33', NULL),
(7, 'The Ring', 'the-ring', 'Custom made for a life choice', 7, '2025-12-14 18:42:23', '2025-12-14 18:42:23', NULL),
(8, 'The creation of Commitment', 'proposed-hands', 'The creation of Adam adaptation - reminds me of Michelangelo', 8, '2025-12-14 18:44:16', '2025-12-14 18:44:16', NULL),
(9, 'Engagement shoots', 'engaged-portrait', 'Want to propose, AND capture the moment?', 9, '2025-12-14 19:30:37', '2025-12-14 19:30:37', NULL),
(10, 'Proposal things', 'proposal-things', 'Hidden to makea proposal a surprise', 10, '2025-12-14 19:31:22', '2025-12-14 19:31:22', NULL),
(11, 'Here\'s to forever', 'heres-to-forever', 'Even custom signage and setup done', 11, '2025-12-14 19:32:00', '2025-12-14 19:32:00', NULL),
(12, 'Her own idea', 'her-own-idea', 'Her only request, was this pose', 12, '2025-12-14 19:32:44', '2025-12-14 19:32:44', NULL),
(13, 'Engagement shoots', 'engagement-hands-closeup', 'Memories', 13, '2025-12-14 19:33:50', '2025-12-14 19:33:50', NULL),
(14, 'Framed', 'engagement-framed', 'My favorite creative shot', 14, '2025-12-14 19:34:20', '2025-12-14 19:34:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_lower` varchar(255) GENERATED ALWAYS AS (lcase(`email`)) STORED,
  `phone_e164` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `password_updated_at` datetime DEFAULT current_timestamp(),
  `email_verified_at` datetime DEFAULT NULL,
  `role` enum('customer','staff','admin') NOT NULL DEFAULT 'customer',
  `locale` varchar(10) NOT NULL DEFAULT 'en-ZA',
  `timezone` varchar(64) NOT NULL DEFAULT 'Africa/Johannesburg',
  `marketing_opt_in` tinyint(1) NOT NULL DEFAULT 0,
  `default_shipping_address_id` bigint(20) UNSIGNED DEFAULT NULL,
  `default_billing_address_id` bigint(20) UNSIGNED DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `login_count` int(11) NOT NULL DEFAULT 0,
  `failed_login_attempts` int(11) NOT NULL DEFAULT 0,
  `locked_until` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  `email_verification_code` varchar(10) DEFAULT NULL,
  `email_verification_expires` datetime DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone_e164`, `password_hash`, `password_updated_at`, `email_verified_at`, `role`, `locale`, `timezone`, `marketing_opt_in`, `default_shipping_address_id`, `default_billing_address_id`, `last_login_at`, `login_count`, `failed_login_attempts`, `locked_until`, `created_at`, `updated_at`, `deleted_at`, `email_verification_code`, `email_verification_expires`, `reset_token`, `reset_token_expires_at`) VALUES
(1, 'Flip', 'Mather', 'flipmather@gmail.com', '+27612376060', '$2y$10$7gh4/3b/2bPFdrmhqPp8le0CcPp3imetFKaj7VkpLhblVZNwGFau.', '2025-09-20 23:16:31', '2025-09-20 23:19:34', 'admin', 'en-ZA', 'Africa/Johannesburg', 1, NULL, NULL, '2025-12-06 17:12:13', 21, 0, NULL, '2025-09-20 23:16:31', '2025-12-06 17:12:13', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_addresses`
--

CREATE TABLE `user_addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(100) DEFAULT NULL,
  `line1` varchar(255) NOT NULL,
  `line2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `region` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) NOT NULL,
  `country_code` char(2) NOT NULL,
  `phone_e164` varchar(20) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vlog_sponsors`
--

CREATE TABLE `vlog_sponsors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `paid` tinyint(1) DEFAULT 0,
  `paid_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vlog_sponsors`
--

INSERT INTO `vlog_sponsors` (`id`, `user_id`, `name`, `message`, `amount`, `created_at`, `paid`, `paid_at`) VALUES
(1, 1, 'Flip', 'First test', 100.00, '2025-12-04 13:28:16', 1, '2025-12-04 15:32:16'),
(4, 1, 'Flip', '4th test', 50.00, '2025-12-04 13:52:41', 1, '2025-12-04 15:54:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_deleted_at` (`deleted_at`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_e164` (`phone_e164`),
  ADD UNIQUE KEY `uq_users_email_lower` (`email_lower`),
  ADD KEY `idx_users_role` (`role`),
  ADD KEY `idx_users_deleted_at` (`deleted_at`),
  ADD KEY `fk_users_default_shipping` (`default_shipping_address_id`),
  ADD KEY `fk_users_default_billing` (`default_billing_address_id`);

--
-- Indexes for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_addr_user` (`user_id`);

--
-- Indexes for table `vlog_sponsors`
--
ALTER TABLE `vlog_sponsors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vlog_sponsors`
--
ALTER TABLE `vlog_sponsors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_default_billing` FOREIGN KEY (`default_billing_address_id`) REFERENCES `user_addresses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_users_default_shipping` FOREIGN KEY (`default_shipping_address_id`) REFERENCES `user_addresses` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD CONSTRAINT `fk_addr_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

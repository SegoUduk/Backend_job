-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Jan 2025 pada 05.53
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `job_portal`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `resume` varchar(255) NOT NULL,
  `cover_letter` text NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `applications`
--

INSERT INTO `applications` (`id`, `job_id`, `user_id`, `resume`, `cover_letter`, `status`, `created_at`) VALUES
(22, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 06:49:01'),
(23, 3, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 06:49:21'),
(24, 3, 3, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 06:49:57'),
(25, 5, 5, 'https://example.com/resume.pdf', 'Saya merupakan pribadi yang sangat bisa diandalkan.', 'pending', '2025-01-21 06:53:10'),
(26, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 06:55:32'),
(27, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 10:28:00'),
(28, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 12:53:55'),
(29, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 13:15:15'),
(30, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 13:15:16'),
(31, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 13:15:17'),
(32, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 13:15:23'),
(33, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 13:15:34'),
(34, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 13:15:36'),
(35, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 13:15:37'),
(36, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 13:15:38'),
(37, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 13:15:40'),
(38, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 13:23:48'),
(39, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 13:23:50'),
(40, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 17:22:03'),
(41, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 17:22:04'),
(42, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 17:22:14'),
(43, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-21 17:22:16'),
(44, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:12:15'),
(45, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:13:28'),
(46, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:16:25'),
(47, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:16:27'),
(48, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:39:54'),
(49, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:40:05'),
(50, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:40:07'),
(51, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:40:12'),
(52, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:40:13'),
(53, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:40:27'),
(54, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:43:24'),
(55, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:43:30'),
(56, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:43:33'),
(57, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:43:44'),
(58, 1, 1, 'https://example.com/resume.pdf', 'I am very interested in this job and believe I have the skills and experience required.', 'pending', '2025-01-22 04:45:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(100) NOT NULL,
  `salary` int(11) NOT NULL,
  `work_system` enum('Full Time','Freelance','Part Time','') NOT NULL,
  `status` enum('pending','approved','blocked') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `jobs`
--

INSERT INTO `jobs` (`id`, `user_id`, `title`, `company`, `description`, `location`, `salary`, `work_system`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Software Developer', 'TechCorp', 'Develop software applications.', 'New York', 60000, 'Full Time', 'approved', '2024-12-30 14:42:53', '2024-12-31 09:50:22'),
(3, 1, 'Direktur', 'Meta', 'memimpin perusahaan', 'Jakarta', 10, 'Full Time', 'approved', '2024-12-31 14:20:13', '2025-01-20 13:22:28'),
(4, 1, 'Pembantu', 'Samsung', 'Membersihkan Kantor', 'Korea', 1000000000, 'Full Time', 'approved', '2024-12-31 14:50:21', '2025-01-20 13:22:53'),
(5, 1, 'Tukang', 'Samsung', 'Membangun gedung', 'Jakarta', 10, 'Part Time', 'approved', '2024-12-31 15:20:16', '2025-01-20 14:58:59'),
(6, 1, 'Asisten', 'Mayora', 'membantu', 'solo', 10, 'Full Time', 'approved', '2024-12-31 15:26:29', '2025-01-20 16:10:32'),
(7, 1, 'Content Creator', 'Samsung', 'menyalllaaa', 'Jakarta', 10, 'Part Time', '', '2025-01-20 03:40:37', '2025-01-20 16:10:56'),
(8, 1, 'Software Engineer', 'Tech Company', 'We are looking for a skilled Software Engineer to join our team.', 'Jakarta', 0, 'Full Time', 'approved', '2025-01-20 16:44:29', '2025-01-20 16:44:45'),
(10, 1, 'Menyanyi', 'Samsung', 'Nyanyi', 'Jakarta', 2321, 'Full Time', '', '2025-01-20 16:45:40', '2025-01-20 16:45:53'),
(11, 1, 'Dosen', 'UDB', 'Mengajar', 'Surakarta', 10, 'Full Time', 'approved', '2025-01-20 16:47:30', '2025-01-20 16:47:45'),
(12, 1, 'kuli jawa', 'PT Kuli Jaya ', 'di butuhkan manusia super isoh nyantet', 'solo', 2147483647, 'Part Time', 'approved', '2025-01-21 00:59:13', '2025-01-21 01:00:04'),
(14, 1, 'lc', 'bintang nusantara', 'bersenang senang ', 'Sukoharjo, Indonesia', 10, 'Full Time', 'approved', '2025-01-21 05:22:22', '2025-01-21 05:23:04'),
(15, 1, 'nganggur', 'PT GanDi ', 'siap mengorbankan jiwa sendiri ', 'isekai ', 10, 'Full Time', 'approved', '2025-01-21 05:29:07', '2025-01-21 05:29:40'),
(16, 1, 'Sayap Kiri', 'Mancaster United', 'Main Bola', 'Inggris', 20, 'Part Time', 'approved', '2025-01-21 13:22:27', '2025-01-21 13:22:50'),
(18, 1, 'ART', 'Rumah Makann', 'ART', 'Sukoharjo, Indonesia', 4, 'Part Time', '', '2025-01-21 13:25:52', '2025-01-21 13:27:17'),
(19, 1, 'Dokter Hewan', 'Animalia', 'Merawat Binatang', 'Solo Safari', 50, 'Full Time', 'approved', '2025-01-21 13:26:53', '2025-01-21 13:27:20'),
(20, 1, 'Dosen Bahasa Inggris', 'UDB', 'Mengajar', 'Solo', 10, 'Full Time', 'approved', '2025-01-22 04:43:16', '2025-01-22 04:44:56'),
(21, 1, 'Guru', 'Sekolah', 'Mengajar', 'Jakarta', 300000, 'Full Time', '', '2025-01-22 04:45:45', '2025-01-22 04:46:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT 'Judul notifikasi',
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `profile_picture`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', 'john.doe@example.com', 'securepassword', 'user', NULL, '2024-12-30 13:51:13', '2024-12-30 13:51:13'),
(3, 'Aji', 'aji@example.com', '123', 'admin', NULL, '2024-12-30 14:41:14', '2024-12-30 14:41:14'),
(4, 'Hari', 'hr@example.com', '12345', 'user', NULL, '2024-12-31 14:38:15', '2024-12-31 14:38:15'),
(5, 'Tugi', 'tg@gmail.com', '345', 'user', NULL, '2024-12-31 14:49:23', '2024-12-31 14:49:23'),
(6, 'Bowo', 'bw@gmail.com', 'bowo', NULL, NULL, '2025-01-20 03:28:09', '2025-01-20 03:28:09'),
(8, 'Kity', 'kt@gmail.com', 'Kity', NULL, NULL, '2025-01-20 03:30:12', '2025-01-20 03:30:12'),
(9, 'Oline', 'Oln@gmail.com', 'oline', NULL, NULL, '2025-01-20 03:33:26', '2025-01-20 03:33:26'),
(10, 'Wahyu', 'why@example.com', 'wahyu', NULL, NULL, '2025-01-20 16:46:57', '2025-01-20 16:46:57'),
(11, 'Haffiant', 'Hff@gmail.com', '123', NULL, NULL, '2025-01-21 00:57:28', '2025-01-21 00:57:28'),
(12, 'dyah', 'ningsih@1', '1', NULL, NULL, '2025-01-21 05:20:14', '2025-01-21 05:20:14'),
(16, 'ddsahjdvhsavdj', 'ajikiwkiw@gmail.com', '123', NULL, NULL, '2025-01-21 05:27:26', '2025-01-21 05:27:26'),
(17, 'Monyet', 'mnyt@gmail.com', '123', NULL, NULL, '2025-01-21 13:21:29', '2025-01-21 13:21:29'),
(18, 'Aji Kia Ramadhani', 'aj@gmail.com', '123', NULL, NULL, '2025-01-22 04:39:10', '2025-01-22 04:39:10');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_id` (`job_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

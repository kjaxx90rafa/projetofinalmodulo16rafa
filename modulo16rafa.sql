-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2025 at 07:20 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `modulo16rafa`
--

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `artist` varchar(50) NOT NULL,
  `album` varchar(50) DEFAULT NULL,
  `genre` varchar(50) DEFAULT NULL,
  `duration_seconds` int(11) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `likes` int(40) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`id`, `title`, `artist`, `album`, `genre`, `duration_seconds`, `release_date`, `likes`, `created_at`) VALUES
(1, 'Living Lavish', 'tana', 'Living Lavish', 'Hip-Hop', 144, '1899-11-30', 10143019, '2025-01-13 10:54:32'),
(2, 'Yale', 'Ken Carson', 'Teen X', 'Opium', 106, '0000-00-00', 341781580, '2025-01-13 11:57:28'),
(3, 'Clouded', 'Brent Faiyaz', 'Fuck The World', 'R&B ', 110, '0000-00-00', 654053044, '2025-01-13 11:57:40'),
(4, 'N o C h i l l', 'PARTYNEXTDOOR', 'PARTYNEXTDOOR 4 (P4)', 'R&B', 265, '0000-00-00', 102781352, '2025-01-13 11:57:52'),
(5, 'Mulher que deus amou', 'Valete', 'Educação Visual', 'Hip-Hop', 221, '0000-00-00', 677561, '2025-01-13 11:57:52'),
(12, 'ss', 'Ken carson', 'ss', 'Rap', 118, '2006-10-11', 3977561, '2025-01-20 11:52:58'),
(13, '14', 'tana', '14', 'Rap', 98, '2012-01-01', 1977561, '2025-01-20 11:52:58'),
(16, 'haha', 'tawdawd', 'haha', 'Rap', 98, '2012-01-01', 1977561, '2025-01-20 12:02:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

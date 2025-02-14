-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14-Fev-2025 às 19:20
-- Versão do servidor: 10.4.28-MariaDB
-- versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `modulo16rafa`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `songs`
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
-- Extraindo dados da tabela `songs`
--

INSERT INTO `songs` (`id`, `title`, `artist`, `album`, `genre`, `duration_seconds`, `release_date`, `likes`, `created_at`) VALUES
(1, 'Living Lavish', 'tana', 'Living Lavish', 'Hip-Hop', 144, '1899-11-30', 10143019, '2025-01-13 10:54:32'),
(2, 'Yale', 'Ken Carson', 'Teen X', 'Opium', 106, '0000-00-00', 341781580, '2025-01-13 11:57:28'),
(3, 'Clouded', 'Brent Faiyaz', 'Fuck The World', 'R&B ', 110, '0000-00-00', 654053044, '2025-01-13 11:57:40'),
(4, 'N o C h i l l', 'PARTYNEXTDOOR', 'PARTYNEXTDOOR 4 (P4)', 'R&B', 265, '0000-00-00', 102781352, '2025-01-13 11:57:52'),
(5, 'Mulher que deus amou', 'Valete', 'Educação Visual', 'Hip-Hop', 221, '0000-00-00', 677561, '2025-01-13 11:57:52'),
(12, 'ss', 'Ken carson', 'ss', 'Rap', 118, '2006-10-11', 3977561, '2025-01-20 11:52:58'),
(13, '14', 'tana', '14', 'Rap', 98, '2012-01-01', 1977561, '2025-01-20 11:52:58'),
(16, 'haha', 'tawdawd', 'haha', 'Rap', 98, '2012-01-01', 1977561, '2025-01-20 12:02:46'),
(17, 'awdad', 'aaa', 'www', 'ddd', 122, '2025-02-14', 111222, '2025-02-14 17:55:25');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

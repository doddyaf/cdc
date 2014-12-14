-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2014 at 04:45 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cdc`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumni_email`
--

CREATE TABLE IF NOT EXISTS `alumni_email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `is_registered` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `alumni_email`
--

INSERT INTO `alumni_email` (`id`, `email`, `is_registered`) VALUES
(1, 'f.rahman.id@gmail.com', 1),
(2, 'rudi53007@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE IF NOT EXISTS `answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `lama_menunggu` int(11) NOT NULL,
  `lama_bekerja` double NOT NULL,
  `gaji_id` int(11) NOT NULL,
  `kecocokan_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `pekerjaan` text NOT NULL,
  `alamat_pekerjaan` text NOT NULL,
  `manfaat` varchar(8) NOT NULL,
  `masukan` text NOT NULL,
  `saran` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `status_id` (`status_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`id`, `user_id`, `lama_menunggu`, `lama_bekerja`, `gaji_id`, `kecocokan_id`, `status_id`, `pekerjaan`, `alamat_pekerjaan`, `manfaat`, `masukan`, `saran`) VALUES
(1, 1, 1, 1, 2, 1, 1, 'programmer', 'aaaaassssss', 'Ya', 'bbbbbbb', 'ccccccccccddcddcdddd'),
(2, 2, 1, 1, 2, 1, 1, 'programmer', 'aaaaassssss', 'Ya', 'bbbbbbb', 'ccccccccccddcddcdddd'),
(3, 3, 1, 1, 2, 1, 1, 'programmer', 'aaaaassssss', 'Ya', 'bbbbbbb', 'ccccccccccddcddcdddd'),
(4, 4, 1, 1, 2, 1, 1, 'programmer', 'aaaaassssss', 'Ya', 'bbbbbbb', 'ccccccccccddcddcdddd'),
(5, 5, 1, 1, 2, 1, 1, 'programmer', 'aaaaassssss', 'Ya', 'bbbbbbb', 'ccccccccccddcddcdddd');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE IF NOT EXISTS `class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=34 ;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id`, `year`) VALUES
(1, 1983),
(2, 1984),
(3, 1985),
(4, 1985),
(5, 1986),
(6, 1987),
(7, 1988),
(8, 1989),
(9, 1990),
(10, 1991),
(11, 1992),
(12, 1993),
(13, 1994),
(14, 1995),
(15, 1996),
(16, 1997),
(17, 1998),
(18, 1999),
(19, 2000),
(20, 2001),
(21, 2002),
(22, 2003),
(23, 2004),
(24, 2005),
(25, 2006),
(26, 2007),
(27, 2008),
(28, 2009),
(29, 2010),
(30, 2011),
(31, 2012),
(32, 2013),
(33, 2014);

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `image` text NOT NULL,
  `deskripsi` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `image` text NOT NULL,
  `post_category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `user_id`, `content`, `image`, `post_category_id`) VALUES
(1, 1, 'Ada job nih', '', 2),
(2, 1, 'asdfsdf', '', 1),
(3, 1, 'sdfdsf', '', 2),
(4, 1, 'asdfsdf', '', 2),
(5, 1, 'asd', '', 1),
(6, 1, 'asda', '', 0),
(7, 1, 'Dibutuhkan Programmer', '', 1),
(8, 1, 'Yeah Programmer', '', 2),
(9, 1, 'Microsoft Punya nih', '', 2),
(10, 1, 'ada lowongan nih doy', '', 1),
(11, 1, 'asdfsdf', '', 1),
(12, 1, 'Testing', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `post_category`
--

CREATE TABLE IF NOT EXISTS `post_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `post_category`
--

INSERT INTO `post_category` (`id`, `name`) VALUES
(1, 'Walk Interview'),
(2, 'Job Fair');

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE IF NOT EXISTS `program` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`id`, `name`) VALUES
(1, 'Teknik Informatika'),
(2, 'Teknik Sipil'),
(3, 'Teknik Kimia'),
(4, 'Teknik Arsitektur'),
(5, 'Perancangan Wilayah Kota'),
(6, 'Teknik Elektro'),
(7, 'Teknik Mesin'),
(8, 'Teknik Industri Pertanian'),
(9, 'Teknik Industri'),
(10, 'Mekatronika'),
(11, 'Otomotif'),
(12, 'Manajemen');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `dob` varchar(10) NOT NULL,
  `type` varchar(10) NOT NULL,
  `program_id` int(11) NOT NULL,
  `class_of` int(11) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `program_id` (`program_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `dob`, `type`, `program_id`, `class_of`, `phone`, `address`) VALUES
(1, 'Doddy', 'Agung Faiskara', 'doddyaf@gmail.com', '699a8bda35b1e87d852cfc3fa211b9c5', '12-12-1992', 'admin', 1, 2010, '0833333', 'Pondok Benda'),
(2, 'Fazlur', 'Rahman', 'f.rahman.id@gmail.com', 'e91229bfe8420a803d7db002a2dc1cb7', '24-12-1992', 'user', 1, 2010, '0833322222', 'Golden Vienna'),
(3, 'Muhammad', 'Taufik', 'taufik@gmail.com', '76868b011b66684d4a91d4ef7e1a2651', '01-01-1992', 'user', 2, 2010, '0833322222', 'Alamatnya'),
(4, 'Alumni', '2', 'alumni2@gmail.com', '76868b011b66684d4a91d4ef7e1a2651', '01-01-1992', 'user', 2, 2009, '0833322222', 'Alamatnya'),
(5, 'Info 09', '1', 'alumni3@gmail.com', '76868b011b66684d4a91d4ef7e1a2651', '01-01-1992', 'user', 1, 2009, '0833322222', 'Alamatnya');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `program` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

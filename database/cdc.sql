-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2015 at 05:17 AM
-- Server version: 5.5.32
-- PHP Version: 5.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cdc`
--
CREATE DATABASE IF NOT EXISTS `cdc` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `cdc`;

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
  `bekerja_studi` tinyint(1) NOT NULL,
  `jenis_bekerja_studi_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `cari_aktif` tinyint(1) NOT NULL,
  `cari_informasi_id` int(11) NOT NULL,
  `cari_jenis_id` int(11) NOT NULL,
  `nama_perusahaan` text NOT NULL,
  `lama_menunggu` int(11) NOT NULL,
  `lama_bekerja` double NOT NULL,
  `perusahaan_pribadi` tinyint(1) NOT NULL,
  `perusahaan_kepemilikan_id` int(11) NOT NULL,
  `perusahaan_bidang_id` int(11) NOT NULL,
  `gaji_id` int(11) NOT NULL,
  `kecocokan_id` int(11) NOT NULL,
  `pekerjaan` text NOT NULL,
  `alamat_pekerjaan` text NOT NULL,
  `manfaat` varchar(8) NOT NULL,
  `masukan` text NOT NULL,
  `saran` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `status_id` (`status_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`id`, `user_id`, `bekerja_studi`, `jenis_bekerja_studi_id`, `status_id`, `cari_aktif`, `cari_informasi_id`, `cari_jenis_id`, `nama_perusahaan`, `lama_menunggu`, `lama_bekerja`, `perusahaan_pribadi`, `perusahaan_kepemilikan_id`, `perusahaan_bidang_id`, `gaji_id`, `kecocokan_id`, `pekerjaan`, `alamat_pekerjaan`, `manfaat`, `masukan`, `saran`) VALUES
(1, 1, 0, 0, 1, 0, 0, 0, '', 1, 1, 0, 0, 11, 4, 1, 'Programmer', 'Gading Serpong', 'Ya', 'Tidak ada', 'tidak ada'),
(2, 3, 0, 0, 2, 0, 0, 0, '', 0, 0, 0, 0, 11, 0, 0, '', '', 'Ya', 'Tidak ada', 'sarannya'),
(3, 4, 0, 0, 1, 0, 0, 0, '', 2, 1, 0, 0, 6, 2, 3, 'Pekerjaan', 'Alamat Pekerjaan', 'Ya', 'Tidak ada', 'Tidak ada'),
(4, 5, 0, 0, 1, 0, 0, 0, '', 4, 2, 0, 0, 10, 5, 1, 'Pekerjaan Saat Ini', 'Alamat', 'Ya', 'Tambahannya', 'Sarannya'),
(5, 6, 0, 0, 1, 0, 0, 0, '', 5, 1, 0, 0, 7, 1, 3, 'Pekerjaan Saya', 'Alamat pekerjaan saya', 'Ya', 'Tambahannya', 'Sarannya'),
(6, 7, 0, 0, 1, 0, 0, 0, '', 1, 2, 0, 0, 3, 3, 1, 'Pekerjaan', 'Alamatnya', 'Ya', 'Tambahannya', 'Sarannya'),
(7, 8, 0, 0, 1, 0, 0, 0, '', 2, 1, 0, 0, 11, 4, 1, 'Pekerjaan', 'Alamat', 'Ya', 'Tambahan', 'Sara'),
(8, 2, 0, 0, 1, 0, 0, 0, '', 1, 1, 0, 0, 1, 4, 1, 'Programmer', 'Serpong', 'Ya', 'Tambahan', 'Saran'),
(9, 9, 0, 0, 1, 0, 0, 0, '', 2, 1, 0, 0, 1, 3, 2, 'Pekerjaan', 'Alamat Pekerjaan', 'Ya', 'Tambahannya', 'Sarannya'),
(10, 11, 1, 1, 1, 1, 7, 8, 'Maju Jaya', 3, 2, 2, 2, 8, 3, 1, 'Supervisor', 'Alamat', 'Ya', 'tambahan', 'saran');

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
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `user_id`, `image`, `description`) VALUES
(4, 1, 'rektor-iti-dr-ir-isnuwardianto-1420380320845.jpg', 'REKTOR ITI'),
(5, 1, 'ketua-dewan-pembina-ypti-prof-dr-ing-b-j-habibie-1420945884260.png', 'Ketua Dewan Pembina YPTI . Prof . Dr. Ing. B.J . Habibie'),
(6, 1, 'wakil-rektor-akademik-iti-1420945920160.jpg', 'Ketua harian dewan pembina YPTI . Ir. H. Aburizal Bakrie'),
(7, 1, 'ketua-harian-dewan-pembina-ypti-ir-h-aburizal-bakrie-1420945950584.png', 'Ketua harian dewan pembina YPTI . Ir. H. Aburizal Bakrie'),
(8, 1, 'ketua-pii-ir-erlangga-hartanto-1420946013404.png', 'Ketua PII . Ir. Erlangga Hartanto'),
(9, 1, 'teknik-informatika-1420946034631.jpg', 'Teknik Informatika'),
(10, 1, 'teknik-elektro-1420946073361.jpg', 'Teknik Elektro'),
(11, 1, 'teknik-arsitek-1420946084920.jpg', 'Teknik Arsitek'),
(12, 1, 'teknik-kimia-1420946097081.jpg', 'Teknik Kimia'),
(13, 1, 'teknik-mesin-1420946108520.jpg', 'Teknik Mesin'),
(14, 1, 'teknik-sipil-1420946120649.jpg', 'Teknik Sipil'),
(15, 1, 'otomotif-1420946135577.jpg', 'Otomotif'),
(16, 1, 'lingkungan-kampus-1420946145880.jpg', 'Lingkungan Kampus');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `user_id`, `content`, `image`, `post_category_id`) VALUES
(1, 1, 'a', '', 1),
(2, 2, 'Aa', '', 1),
(3, 5, 'Ada job fair nih', '', 2),
(4, 3, 'aaa', '', 1),
(5, 3, 'tes', '', 1),
(6, 3, 'tes2', '', 2),
(7, 1, 'Tes', '', 1),
(8, 1, '!@#', '', 1),
(9, 12, 'PT NUSA BANGSA \n\nRequiretment\nProgrammer java \nminimal S1 teknik informatika\nsallary < 3 juta\n\ncontact person : 12345678', '', 1),
(10, 12, '- LOWONGAN KANTOR PROMOTOR MUSIC INTERNATIONAL -\n\nSedang membuka lowongan nih. Trilogylive merupakan promotor konser international yang sudah membawa Boyz II Men , Keane , David Cook dan masih banyak lagi , lowongannya :\n\n1. Staff IT Programmer\n2. Web design \n\ncontact person : 94857403', '', 2);

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
  `code` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`id`, `name`, `code`) VALUES
(1, 'Informatika', 'IF'),
(2, 'Teknik Sipil', 'TS'),
(3, 'Teknik Kimia', 'TK'),
(4, 'Teknik Arsitektur', 'TA'),
(5, 'Perancangan Wilayah Kota', 'PWK'),
(6, 'Teknik Elektro', 'TE'),
(7, 'Teknik Mesin', 'TM'),
(8, 'Teknik Industri Pertanian', 'TIP'),
(9, 'Teknik Industri', 'TI'),
(10, 'Mekatronika', 'MT'),
(11, 'Otomotif', 'OT'),
(12, 'Manajemen', 'MJ');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `dob`, `type`, `program_id`, `class_of`, `phone`, `address`) VALUES
(1, 'Doddy', 'Agung Faiskara', 'doddyaf@gmail.com', '699a8bda35b1e87d852cfc3fa211b9c5', '1992-12-12', 'admin', 1, 2010, '0833333', 'Pondok Benda'),
(2, 'Fazlur', 'Rahman', 'fazznew@gmail.com', '202cb962ac59075b964b07152d234b70', '1992-12-24', 'user', 1, 2010, '+6282128282755', 'Golden Viena 1, Blok B6/1\r\nBSD City'),
(3, 'Rudi Kurnia', 'Putra', 'rudi@gmail.com', 'bfcd3eee9746714ca4fcba684344bbc0', '1992-01-01', 'user', 1, 2010, '+628888888', 'Jalan'),
(4, 'Alumni', 'IF 08', 'alumni-if-08@gmail.com', '202cb962ac59075b964b07152d234b70', '1991-01-01', 'user', 1, 2008, '+62111111', 'Alamat Alumni IF 08'),
(5, 'Alumni', 'TE 05', 'alumni-te-05@gmail.com', '202cb962ac59075b964b07152d234b70', '1990-01-01', 'user', 6, 2005, '+628121212121', 'Jl. Kosan No. 69'),
(6, 'Alumni', 'TM 06', 'alumni-tm-06@gmail.com', '202cb962ac59075b964b07152d234b70', '1990-12-01', 'user', 7, 2006, '+628121212121', 'Jl. Kosan No. 69'),
(7, 'Alumni', 'TS 09', 'alumni-ts-09@gmail.com', '202cb962ac59075b964b07152d234b70', '1990-01-01', 'user', 2, 2009, '+628121212121', 'Jl. Kosan No. 69'),
(8, 'Zickri', 'Maulida', 'zickri@gmail.com', '202cb962ac59075b964b07152d234b70', '1993-12-12', 'user', 1, 2010, '+628121212121', 'Jl. Kosan No. 69'),
(9, 'Alumni', 'IF 09', 'alumni-if-09@gmail.com', '202cb962ac59075b964b07152d234b70', '1991-02-21', 'user', 1, 2009, '+628121212121', 'Jl. Kosan No. 69'),
(10, 'Alumni', 'TIP 09', 'alumni-tip-09@gmail.com', '202cb962ac59075b964b07152d234b70', '1990-12-12', 'user', 8, 2009, '+628121212121', 'Jl. Kosan No. 69'),
(11, 'Alumni', 'TI 07', 'alumni-ti-07@gmail.com', '202cb962ac59075b964b07152d234b70', '1989-01-01', 'user', 9, 2007, '+628121212121', 'Jl. Kosan No. 69'),
(12, 'alumni', 'if', 'alumni_if@gmail.com', '202cb962ac59075b964b07152d234b70', '2015-01-08', 'user', 1, 2010, '34343', 'pamulang');

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

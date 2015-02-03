-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 03, 2015 at 08:10 AM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `alumni_email`
--

INSERT INTO `alumni_email` (`id`, `email`) VALUES
(1, 'f.rahman.id@gmail.com'),
(2, 'rudi53007@gmail.com'),
(3, 'doddyaf@gmail.com');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`id`, `user_id`, `bekerja_studi`, `jenis_bekerja_studi_id`, `status_id`, `cari_aktif`, `cari_informasi_id`, `cari_jenis_id`, `nama_perusahaan`, `lama_menunggu`, `lama_bekerja`, `perusahaan_pribadi`, `perusahaan_kepemilikan_id`, `perusahaan_bidang_id`, `gaji_id`, `kecocokan_id`, `pekerjaan`, `alamat_pekerjaan`, `manfaat`, `masukan`, `saran`) VALUES
(1, 1, 0, 0, 1, 0, 0, 0, '', 1, 1, 0, 0, 11, 4, 1, 'Programmer', 'Gading Serpong', 'Ya', 'Tidak ada', 'tidak ada'),
(3, 4, 0, 0, 1, 0, 0, 0, '', 2, 1, 0, 0, 6, 2, 3, 'Pekerjaan', 'Alamat Pekerjaan', 'Ya', 'Tidak ada', 'Tidak ada'),
(4, 5, 0, 0, 1, 0, 0, 0, '', 4, 2, 0, 0, 10, 5, 1, 'Pekerjaan Saat Ini', 'Alamat', 'Ya', 'Tambahannya', 'Sarannya'),
(5, 6, 0, 0, 1, 0, 0, 0, '', 5, 1, 0, 0, 7, 1, 3, 'Pekerjaan Saya', 'Alamat pekerjaan saya', 'Ya', 'Tambahannya', 'Sarannya'),
(6, 7, 0, 0, 1, 0, 0, 0, '', 1, 2, 0, 0, 3, 3, 1, 'Pekerjaan', 'Alamatnya', 'Ya', 'Tambahannya', 'Sarannya'),
(7, 8, 0, 0, 1, 0, 0, 0, '', 2, 1, 0, 0, 11, 4, 1, 'Pekerjaan', 'Alamat', 'Ya', 'Tambahan', 'Sara'),
(8, 2, 0, 0, 1, 0, 0, 0, '', 1, 1, 0, 0, 1, 4, 1, 'Programmer', 'Serpong', 'Ya', 'Tambahan', 'Saran'),
(9, 9, 0, 0, 1, 0, 0, 0, '', 2, 1, 0, 0, 1, 3, 2, 'Pekerjaan', 'Alamat Pekerjaan', 'Ya', 'Tambahannya', 'Sarannya'),
(10, 11, 1, 1, 1, 1, 7, 8, 'Maju Jaya', 3, 2, 2, 2, 8, 3, 1, 'Supervisor', 'Alamat', 'Ya', 'tambahan', 'saran'),
(11, 3, 1, 4, 1, 1, 1, 11, 'Nama Perusahaan', 1, 1, 2, 2, 11, 3, 2, 'Programmer', 'Alamat Perusahaan', 'Ya', 'Tambahan', 'Saran'),
(13, 10, 1, 1, 1, 1, 2, 1, 'Nama Perusahaan', 1, 1, 1, 1, 1, 1, 1, 'Jabtan', 'Alamat', 'Ya', 'Tambahan', 'Saran'),
(14, 14, 2, 0, 2, 1, 8, 10, '', 0, 0, 0, 0, 0, 0, 0, '', '', 'Ya', 'bla bla', 'bla bla'),
(15, 15, 1, 3, 2, 1, 3, 3, '', 0, 0, 0, 0, 0, 0, 0, '', '', 'Ya', 'bla ', 'bla bla'),
(16, 16, 1, 2, 1, 1, 5, 5, 'pt nusa dua', 2, 1, 1, 0, 0, 2, 2, 'owner', 'bsd', 'Ya', 'bla ', 'bla'),
(17, 17, 1, 1, 1, 1, 4, 7, 'cv bahtera', 2, 3, 1, 4, 9, 3, 3, 'marketing', 'bsd nusa loka', 'Ya', 'bla bla', 'bla bla'),
(18, 18, 2, 0, 2, 2, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, '', '', 'Ya', 'bla ', 'bla'),
(19, 19, 1, 1, 1, 1, 1, 8, 'cv lokasari', 3, 2, 2, 1, 8, 2, 1, 'konsultan', 'granada bsd', 'Ya', 'bla ', 'bla'),
(20, 20, 1, 1, 1, 1, 2, 2, 'bewei', 3, 0, 1, 4, 11, 4, 1, 'brogrammer', 'periuk jaya permai', 'Ya', 'semoga lebih baik', 'semoga lebih maju');

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
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `date` varchar(10) NOT NULL,
  `image` text NOT NULL,
  `insert_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `name`, `description`, `date`, `image`, `insert_date`) VALUES
(1, 'Seminar LPKM', 'Lembaga Pengembangan dan Kesejahteraan Mahasiswa(LPKM) -ITI telah menyelenggarakan Seminar "Masih Mau Cuek dengan Kuliahmu?" dengan pembicara Rivalino Shaffar pada tanggal 31 Maret 2010 yang dihadiri oleh kurang lebih 250 mahasiswa dan beberapa dosen dari berbagai Program Studi.', '2014-02-02', 'seminar-lpkm.jpg', '2015-01-31 12:53:34'),
(2, 'Entrepreneurship Camp Korea-ITI', '16 mahasiwa Korea Selatan dan 16 mahasiswa Indonesia akan ikut serta dalam “KC Startup Festival 2014”, yaitu sebuah entrepreneurship camp di kampus Institut Teknologi Indonesia, Serpong, yang berlangsung dari hari Senin sampai Rabu, tanggal 22 – 24 Desember 2014.\r\n\r\n \r\n\r\nKegiatan selama 3 hari ini merupakan kerjasama antara Korean Entrepreneurship Foundation (KEF) dan Institut Teknologi Indonesia (ITI), dalam rangka merangsang dan mengembangkan minat dan bakat mahasiswa di bidang kewirausahaan.\r\n\r\nInstitut Teknologi Indonesia (ITI), yang berusia 30 tahun di 2014 ini, adalah perguruan tinggi swasta yang berorientasi technopreneur dan menuju visinya sebagai “the Technology based Entrepreneur University”. ITI didirikan atas inisiatif Persatuan Insinyur Indonesia (PII) pada tahun 1984 dan pada saat ini Ketua Dewan Pembinanya adalah Prof. BJ Habibie, yang merupakan salah satu pendirinya.\r\n\r\nFokus dari entrepreneurship camp ini terletak pada pendekatan dan solusi inovatif untuk membangun masa depan yang lebih baik. Sebagai suatu pertemuan kerjasama orang-orang muda yang tertarik pada perubahan dan inovasi, kegiatan ini sangat menghargai pengetahuan, ketrampilan dan pengalaman yang beraneka ragam dari para peserta camp.\r\n\r\nDi hari pertama Senin, peserta memilih tema dan membawa gagasan dan perspektif masing-masing untuk menginspirasi anggota-anggota timnya. Pada hari kedua dan ketiga, tim-tim bekerjasama menguji idenya di pasar dan mengembangkan gagasan prototipnya. Pada hari Rabu, masing-masing tim memaparkan ide solusinya dalam bentuk video clip dan memperoleh umpan balik berharga dari panel pakar dari Korea Selatan.\r\n\r\nKegiatan ini akan menjadi salah satu upaya dalam kerangka memperat hubungan Indonesia-Korea Selatan dan memotivasi generasi muda di Indonesia maupun Korea Selatan untuk membangun jejaring kerjasama kewirausahaan di masa depan. Hal ini selaras dengan arah kebijakan pemerintah saat ini, sebagaimana yang telah diutarakan oleh Presiden Joko Widodo dalam kunjungannya ke Korea Selatan belum lama ini.', '2015-02-20', 'camp-korea-1422786269458.jpg', '2015-02-01 10:24:29');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

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
(16, 1, 'lingkungan-kampus-1420946145880.jpg', 'Lingkungan Kampus'),
(17, 1, 'dm-pak-jk-1422188710983.png', 'DM');

-- --------------------------------------------------------

--
-- Table structure for table `information`
--

CREATE TABLE IF NOT EXISTS `information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profile` text NOT NULL,
  `visi` text NOT NULL,
  `misi` text NOT NULL,
  `contact` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `information`
--

INSERT INTO `information` (`id`, `profile`, `visi`, `misi`, `contact`) VALUES
(1, 'Career Development Center Institut Teknologi Indonesia atau disingkat CDC ITI merupakan salah satu divisi yang berada di bawah Direktorat Lembaga Pengembangan dan Kesejahteraan Mahasiswa (LPKM) Institut Teknologi Indonesia yang dibentuk pada bulan Desember 2007\n\nSalah satu peran sebuah perguruan tinggi adalah menghasilkan lulusan yang mempunyai kompetensi memadai yang mencakup skill, knowledge dan attitude sehingga para lulusannya dapat diserap industri dan merupakan tanggung jawab ITI untuk dapat menghasilkan lulusan seperti tersebut di atas dengan ciri khas memiliki skill entrepreneur berbasis teknologi yang kemudian dapat disalurkan ke industri-industri yang membutuhkannya atau bahkan menciptakan sendiri peluang-peluang usaha\n\nSalah satu cara untuk menggali informasi berkaitan dengan transisi dari kuliah ke pekerjaan adalah dengan melaksanakan suatu studi yang disebut sebagai Tracer Study yang dimaksud dengan studi mengenai lulusan lembaga penyelenggara pendidikan tinggi.\n\nTracer Study dapat menyediakan informasi untuk kepentingan evaluasi hasil pendidikan tinggi dan selanjutnya dapat digunakan untuk penyempurnaan dan penjaminan kualitas lembaga pendidikan tinggi yang bersangkutan. Disamping itu Tracer Study juga menyediakan informasi berharga mengenai hubungan antara pendidikan tinggi dan dunia kerja professional, menilai relevansi pendidikan tinggi, informasi bagi para pemangku kepentingan, dan kelengkapan persyaratan bagi akreditasi pendidikan tinggi', 'Merupakan Pusat Pengembangan Sumberdaya Kewirausahaan Berbasis Teknologi yang Kompeten dan Berkualitas Bagi Lulusan ITI\r\n', '1. Menyiapkan program kewirausahaan (knowledge & soft skill) didalam kurikulum untuk menciptakan wirausahawan yang inovatif yang berbasis teknologi.\r\n\r\n2. Memberikan dukungan kepada dunia usaha dan pemerintah Indonesia dalam meningkatkan kemajuan dunia usaha melalui kontribusi SDM yang kompeten.\r\n\r\n3. Menjadi penghubung antara ITI dengan dunia industri dalam informasi	ketenagakerjaan dan peluang-peluang usaha.\r\n\r\n4. Update terhadap perkembangan teknologi dan dunia industri.\r\n\r\n5. Membangun citra ITI secara positif karena mampu menempatkan tenaga kerja yang handal di dunia industri.', 'Sekretariat CDC - ITI\r\n\r\nGedung CDC - ITI\r\n\r\nJl. Raya Puspiptek Serpong\r\n\r\nInstitut Teknologi Indonesia\r\n\r\nTelp (021) 7560545\r\n\r\nFax (021) 7560542\r\n\r\nWebsite : www.iti.ac.id\r\n\r\nHARI KERJA - SENIN S/D JUMAT\r\n\r\nJAM KERJA - 08.00 S/D 16.00');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `image` text NOT NULL,
  `insert_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `image`, `insert_date`) VALUES
(1, 'Prestasi Mahasiswa Mesin ITI', 'Tim mahasiswa Teknik Mesin ITI angkatan 2013/2014 berhasil menempati urutan 6 pada lomba  " Aplikasi Disain Sistem Transmisi pada non Ferrous Frame Bike" yang diselenggarakan Universitas Brawijaya Malang tanggal 20 dan 21 November 2014', 'mesin-iti.jpg', '2015-01-31 12:52:27'),
(2, ' ITI dalam Majalah Internasional "Campus"', 'ITI masuk ke Majalah Internasional "Campus"', 'vol2-1422785595360.bmp', '2015-02-01 10:13:15');

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
  `insert_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `user_id`, `content`, `image`, `post_category_id`, `insert_date`) VALUES
(1, 1, 'a', '', 1, '2015-02-03 03:21:39'),
(2, 2, 'Aa', '', 1, '2015-02-03 03:21:39'),
(3, 5, 'Ada job fair nih', '', 2, '2015-02-03 03:21:39'),
(4, 3, 'aaa', '', 1, '2015-02-03 03:21:39'),
(5, 3, 'tes', '', 1, '2015-02-03 03:21:39'),
(6, 3, 'tes2', '', 2, '2015-02-03 03:21:39'),
(7, 1, 'Tes', '', 1, '2015-02-03 03:21:39'),
(8, 1, '!@#', '', 1, '2015-02-03 03:21:39'),
(9, 12, 'PT NUSA BANGSA \n\nRequiretment\nProgrammer java \nminimal S1 teknik informatika\nsallary < 3 juta\n\ncontact person : 12345678', '', 1, '2015-02-03 03:21:39'),
(10, 12, '- LOWONGAN KANTOR PROMOTOR MUSIC INTERNATIONAL -\n\nSedang membuka lowongan nih. Trilogylive merupakan promotor konser international yang sudah membawa Boyz II Men , Keane , David Cook dan masih banyak lagi , lowongannya :\n\n1. Staff IT Programmer\n2. Web design \n\ncontact person : 94857403', '', 2, '2015-02-03 03:21:39'),
(11, 1, 'Lowongan PT Unilever\nbla bla bla', '', 2, '2015-02-03 03:21:39'),
(15, 1, 'Lowongan Kerja\n\nMembuka Lowongan', '', 1, '2015-02-03 03:21:39');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

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
(12, 'alumni', 'if', 'alumni_if@gmail.com', '202cb962ac59075b964b07152d234b70', '2015-01-08', 'user', 1, 2010, '34343', 'pamulang'),
(13, 'Jokowi', 'Widodo', 'hokowidodo@gmail.com', '7d00ff54a263fe80825b9297804a982c', '2015-01-17', 'user', 1, 2005, '0987654321', 'Cikeas'),
(14, 'alumni_tk@gmail.com', 'alumni_tk', 'alumni_tk@gmail.com', '202cb962ac59075b964b07152d234b70', '1987-01-02', 'user', 3, 2005, '0217456895', 'pamulang 2'),
(15, 'alumni', 'pwk', 'alumni_pwk@gmail.com', '202cb962ac59075b964b07152d234b70', '1985-02-14', 'user', 5, 2009, '08567483764', 'pamulang 1'),
(16, 'alumni', 'arsitek', 'alumni_arsitek@gmail.com', '202cb962ac59075b964b07152d234b70', '1989-02-05', 'user', 4, 2008, '021374893', 'pamulang 2'),
(17, 'alumni', 'mesin', 'alumni_mesin@gmail.com', '202cb962ac59075b964b07152d234b70', '1985-12-11', 'user', 7, 2007, '02732312', 'pamulang 3'),
(18, 'alumni', 'mesin', 'alumni_mesin1@gmail.com', '202cb962ac59075b964b07152d234b70', '1989-12-08', 'user', 7, 2006, '02139485940', 'nusa indah'),
(19, 'alumni', 'mekatronika', 'alumni_mekatronika1@gmail.com', '202cb962ac59075b964b07152d234b70', '1990-02-08', 'user', 10, 2010, '0213948402', 'permata pamulang'),
(20, 'norris', 'damianus', 'damianus_noris@yahoo.com', '1f78a83bfebd05c7533f4cd1491273e2', '2015-01-07', 'user', 1, 2010, '0818182953', 'ruko newton barat\r\nruko newron barat');

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

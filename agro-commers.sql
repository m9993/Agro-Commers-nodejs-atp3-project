-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2020 at 08:56 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agro-commers`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `catid` int(50) NOT NULL,
  `catname` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`catid`, `catname`) VALUES
(1, '1');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `cid` int(50) NOT NULL,
  `uid` int(50) NOT NULL,
  `iid` int(50) NOT NULL,
  `comment` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`cid`, `uid`, `iid`, `comment`) VALUES
(1, 1, 1, '1');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `conid` int(50) NOT NULL,
  `sendermail` varchar(200) NOT NULL,
  `receivermail` varchar(200) NOT NULL,
  `conmessage` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`conid`, `sendermail`, `receivermail`, `conmessage`) VALUES
(4, 'abc@gmail.com', 'a@gmail.com', 'hi there!'),
(5, 'abc@gmail.com', 'a@gmail.com', '123'),
(6, 'abc@gmail.com', 'a@gmail.com', 'aaaaa'),
(7, 'abc@gmail.com', 'a@gmail.com', 'vvvv'),
(10, 'abc@gmail.com', 'smith@gmail.com', 'hi smith!'),
(11, 'abc@gmail.com', 'john@gmail.com', 'q'),
(12, 'john@gmail.com', 'abc@gmail.com', 'q'),
(13, 'smith@gmail.com', 'abc@gmail.com', 'hi smith!'),
(14, 'smith@gmail.com', 'abc@gmail.com', 'hi smith!'),
(15, 'mina@gmail.com', 'abc@gmail.com', 'q'),
(16, 'mina@gmail.com', 'abc@gmail.com', 'hiiiiiiiiiiiiii'),
(17, 'mina@gmail.com', 'abc@gmail.com', 'I have a question'),
(18, 'smith@gmail.com', 'abc@gmail.com', 'meet me ASAP!'),
(19, 'smith@gmail.com', 'john@gmail.com', '123'),
(20, 'abc@gmail.com', 'smith@gmail.com', 'hi smith!'),
(21, 'alex@gmail.com', 'smith@gmail.com', 'hello!');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `eid` int(50) NOT NULL,
  `uid` int(50) NOT NULL,
  `etype` varchar(200) NOT NULL,
  `esalary` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`eid`, `uid`, `etype`, `esalary`) VALUES
(1, 1, '1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `hid` int(50) NOT NULL,
  `uid` int(50) NOT NULL,
  `iid` int(50) NOT NULL,
  `saddress` varchar(200) NOT NULL,
  `sphone` int(200) NOT NULL,
  `hdate` varchar(200) NOT NULL,
  `hstatus` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`hid`, `uid`, `iid`, `saddress`, `sphone`, `hdate`, `hstatus`) VALUES
(1, 1, 1, '1', 1, '2020-11-23 12:56:48', '1');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inid` int(50) NOT NULL,
  `inname` varchar(200) NOT NULL,
  `inamount` int(200) NOT NULL,
  `instatus` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inid`, `inname`, `inamount`, `instatus`) VALUES
(1, 'product', 1, '1');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invnumber` int(50) NOT NULL,
  `uid` int(50) NOT NULL,
  `orderdate` varchar(200) NOT NULL,
  `subtotal` int(200) NOT NULL,
  `shipmethod` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invnumber`, `uid`, `orderdate`, `subtotal`, `shipmethod`) VALUES
(1, 1, '2020-11-21 07:21:34', 1200, 'bkash'),
(2, 2, '12', 456, 'bkask'),
(3, 2, '2020-11-22 08:49:06', 1200, 'a'),
(4, 1, '2020-11-22 09:30:02', 50, 'Parcel shipping'),
(5, 1, '2020-11-22 09:30:58', 40, 'Parcel shipping'),
(6, 1, '2020-11-22 09:34:53', 10, 'Parcel shipping'),
(7, 1, '2020-11-22 09:46:59', 340, 'Will take from office'),
(8, 1, '2020-11-22 09:48:54', 90, 'Parcel shipping'),
(9, 1, '2020-11-22 09:49:29', 90, 'Will take from office'),
(10, 1, '2020-11-22 09:49:39', 100, 'Parcel shipping'),
(11, 1, '2020-11-22 09:49:50', 50, 'Will take from office'),
(12, 1, '2020-11-22 09:50:37', 20, 'Parcel shipping'),
(13, 1, '2020-11-22 09:50:52', 50, 'Parcel shipping'),
(14, 1, '2020-11-22 09:51:24', 50, 'Parcel shipping'),
(15, 1, '2020-11-22 09:52:09', 150, 'Parcel shipping'),
(16, 1, '2020-11-22 09:55:07', 160, 'Parcel shipping'),
(17, 1, '2020-11-22 09:56:18', 330, 'Parcel shipping'),
(18, 1, '2020-11-22 10:48:39', 290, 'Will take from office'),
(19, 1, '2020-11-22 10:59:22', 120, 'Parcel shipping'),
(20, 1, '2020-11-22 11:31:49', 20, 'Parcel shipping'),
(21, 1, '2020-11-22 11:43:41', 50, 'Parcel shipping'),
(22, 2, '2020-11-22 12:34:05', 100, 'Parcel shipping'),
(23, 1, '2020-11-23 13:45:10', 50, 'Parcel shipping'),
(24, 1, '2020-11-23 13:48:07', 60, 'Parcel shipping'),
(25, 1, '2020-11-23 13:50:26', 270, 'Parcel shipping'),
(26, 1, '2020-11-23 13:51:51', 10, 'Will take from office');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `iid` int(50) NOT NULL,
  `iname` varchar(200) NOT NULL,
  `iprice` int(200) NOT NULL,
  `idetails` varchar(200) NOT NULL,
  `istatus` varchar(200) NOT NULL,
  `iimage` varchar(500) NOT NULL,
  `catid` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`iid`, `iname`, `iprice`, `idetails`, `istatus`, `iimage`, `catid`) VALUES
(1, 'Cocunut', 50, 'very famous', 'not available', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS10GBWw_c6LyxFXe4P41UTR2-FrJrjR7u5WQ&usqp=CAU', 1),
(2, 'Seeds', 10, 'seeds', 'available', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnyPlpyLPNVJ5e6G1nEcpOnwL6wn_WNwsgMw&usqp=CAU', 1),
(3, 'Fertilizer', 50, 'Very fertile', 'available', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrZQQOL356za2ULz_8eghmZI3BcRJ1ZGPgNg&usqp=CAU', 1),
(5, 'Soyabeans', 100, 'Healthy', 'not available', 'https://miro.medium.com/max/1000/0*ahe8XINOHYbtG_lb.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE `notice` (
  `nid` int(50) NOT NULL,
  `notice` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notice`
--

INSERT INTO `notice` (`nid`, `notice`) VALUES
(1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type a'),
(2, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distrib'),
(3, '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut '),
(4, '\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the gr');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `oid` int(50) NOT NULL,
  `ostatus` varchar(200) NOT NULL,
  `hid` int(50) NOT NULL,
  `uid` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`oid`, `ostatus`, `hid`, `uid`) VALUES
(1, 'delivered', 1, 1),
(3, 'pending', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `shid` int(50) NOT NULL,
  `shname` varchar(200) NOT NULL,
  `cid` int(50) NOT NULL,
  `iid` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`shid`, `shname`, `cid`, `iid`) VALUES
(1, 'abcShop', 1, 1),
(2, 'abcShop', 1, 2),
(3, 'abcShop', 1, 3),
(4, 'Shop Soyabeans', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(50) NOT NULL,
  `uname` varchar(200) NOT NULL,
  `uphone` int(200) NOT NULL,
  `umail` varchar(200) NOT NULL,
  `uaddress` varchar(200) NOT NULL,
  `upass` varchar(200) NOT NULL,
  `user_role` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `uname`, `uphone`, `umail`, `uaddress`, `upass`, `user_role`) VALUES
(1, 'John', 123456789, 'john@gmail.com', 'dhaka, Bangladesh', '123', 'admin'),
(2, 'Smith', 12345, 'smith@gmail.com', 'dhaka', '123', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`catid`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`cid`),
  ADD UNIQUE KEY `uid_2` (`uid`),
  ADD KEY `uid` (`uid`),
  ADD KEY `iid` (`iid`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`conid`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`eid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`hid`),
  ADD KEY `iid` (`iid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inid`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invnumber`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`iid`),
  ADD KEY `catid` (`catid`);

--
-- Indexes for table `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`nid`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`oid`),
  ADD KEY `hid` (`hid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`shid`),
  ADD UNIQUE KEY `iid_2` (`iid`),
  ADD UNIQUE KEY `iid_3` (`iid`),
  ADD UNIQUE KEY `iid_4` (`iid`),
  ADD KEY `cid` (`cid`),
  ADD KEY `iid` (`iid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `catid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `cid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `conid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `eid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `hid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invnumber` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `iid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notice`
--
ALTER TABLE `notice`
  MODIFY `nid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `oid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `shid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`iid`) REFERENCES `items` (`iid`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`iid`) REFERENCES `items` (`iid`),
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`catid`) REFERENCES `category` (`catid`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`hid`) REFERENCES `history` (`hid`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);

--
-- Constraints for table `shop`
--
ALTER TABLE `shop`
  ADD CONSTRAINT `shop_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `category` (`catid`),
  ADD CONSTRAINT `shop_ibfk_2` FOREIGN KEY (`iid`) REFERENCES `items` (`iid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

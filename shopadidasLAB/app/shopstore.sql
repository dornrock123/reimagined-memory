-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2023 at 06:17 PM
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
-- Database: `shopstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `accountID` int(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(8) NOT NULL,
  `types` varchar(20) NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`accountID`, `username`, `password`, `types`, `customer_id`) VALUES
(33, 'krit', '1234', 'admin', 14),
(34, 'user', '1234', 'customer', 15),
(35, 'dorn', '1234', 'customer', 16);

-- --------------------------------------------------------

--
-- Table structure for table `customer_member`
--

CREATE TABLE `customer_member` (
  `customer_id` int(11) NOT NULL,
  `firstname` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `address` varchar(10) NOT NULL,
  `phonenumber` varchar(10) NOT NULL,
  `email` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_member`
--

INSERT INTO `customer_member` (`customer_id`, `firstname`, `lastname`, `address`, `phonenumber`, `email`) VALUES
(14, 'กฤตภาส', 'เซ่งย่อง', '3 ห้วยยอด ', '0623859611', 'krittapat@gmail.com'),
(15, 'user', '1', '11 - 4\r\n', '0623154698', 'user@gmail.com'),
(16, 'Do', 'rn', '111/879', '0864231564', 'dorn@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `logID` int(11) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`logID`, `username`, `password`, `timestamp`) VALUES
(8630278, 'krit', '1234', '2023-10-01 16:00:50'),
(8630279, 'krit', '1234', '2023-10-01 16:07:08'),
(8630280, 'krit', '1234', '2023-10-01 16:08:18'),
(8630281, 'krit', '1234', '2023-10-01 16:09:21'),
(8630282, 'user', '1234', '2023-10-01 16:15:32');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `products_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `sub_total_price` double NOT NULL,
  `total_all` int(11) NOT NULL,
  `order_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`products_id`, `customer_id`, `quantity`, `sub_total_price`, `total_all`, `order_date`) VALUES
(12, 15, 1, 3800, 7200, '2023-10-01 23:16:12'),
(13, 15, 2, 3400, 7200, '2023-10-01 23:16:12');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `totalall` int(11) NOT NULL,
  `payname` varchar(50) NOT NULL,
  `slippayment` varchar(50) NOT NULL,
  `payaddress` text NOT NULL,
  `customer_id` int(11) NOT NULL,
  `paytel` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `totalall`, `payname`, `slippayment`, `payaddress`, `customer_id`, `paytel`) VALUES
(13, 7200, 'กฤตภาส เซ่งย่อง', '114119474_1006879429728111_8034274557160317161_n.j', '3 ห้วยยอด ตรัง', 15, '0623859611');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productsID` int(11) NOT NULL,
  `productName` varchar(20) NOT NULL,
  `detail` varchar(20) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productsID`, `productName`, `detail`, `price`, `image`, `stock`) VALUES
(12, 'SAMBA OG', 'Originals', 3800, 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/3bbecbdf584e40398446a8bf0117cf62_9366/Samba_OG_B75806_01_standard.jpg', 19),
(13, 'DURAMO SL', 'Sportswear', 1700, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/71925a2f2d3b4ba897059bee0e65a7ca_9366/Duramo_SL_IG2462_01_standard.jpg', 18),
(14, 'OSADE', 'Sportswear', 3000, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0220a8f9d7fe4179b1af7896031cba0f_9366/Osade_IG7316_01_standard.jpg', 20),
(15, 'RESPONSE CL', 'Originals', 4700, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/46cef9827aea4caf8d8dadaa00b99693_9366/Response_CL_GZ1562_01_standard.jpg', 20),
(16, 'EQ21', 'วิ่ง', 2400, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a7420d67e53e45dfa917aed200c7c06d_9366/EQ21_GY2192_01_standard.jpg', 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`accountID`),
  ADD KEY `ForeignKey` (`customer_id`);

--
-- Indexes for table `customer_member`
--
ALTER TABLE `customer_member`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`logID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `products_id` (`products_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productsID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `accountID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `customer_member`
--
ALTER TABLE `customer_member`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `logID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8630283;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `ForeignKey` FOREIGN KEY (`customer_id`) REFERENCES `customer_member` (`customer_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_member` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`productsID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

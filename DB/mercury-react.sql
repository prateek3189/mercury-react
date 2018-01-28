-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 28, 2018 at 05:57 AM
-- Server version: 5.1.36
-- PHP Version: 5.3.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mercury-react`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `security_question` text NOT NULL,
  `answer` varchar(255) NOT NULL,
  `owner_id` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `modified_date` datetime NOT NULL,
  `is_active` enum('1','0') NOT NULL DEFAULT '1',
  `is_delete` enum('1','0') NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `phone`, `username`, `password`, `security_question`, `answer`, `owner_id`, `created_date`, `modified_date`, `is_active`, `is_delete`) VALUES
(1, 'Prateek', 'Magarde', '8605374447', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'What is your pet name', 'gunmaster', 0, '2018-01-26 03:11:38', '2018-01-26 03:11:38', '1', '0');

-- MariaDB dump 10.19  Distrib 10.6.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: workhour_tracker
-- ------------------------------------------------------
-- Server version	10.6.11-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `main_table`
--

DROP TABLE IF EXISTS `main_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `main_table` (
  `task_index` int(11) NOT NULL AUTO_INCREMENT,
  `task_user` text DEFAULT NULL,
  `task_date` date NOT NULL,
  `task_start` text NOT NULL,
  `task_end` text NOT NULL,
  `task_project` text NOT NULL,
  `task_hours` text NOT NULL,
  `task_entry` text DEFAULT NULL,
  PRIMARY KEY (`task_index`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_table`
--

LOCK TABLES `main_table` WRITE;
/*!40000 ALTER TABLE `main_table` DISABLE KEYS */;
INSERT INTO `main_table` VALUES (7,'admin','2022-11-15','12:30:00','','Projekt1','','0'),(8,'admin','2022-11-15','12:30:00','12:30:00','Projekt1','0.00','1'),(9,'admin','2022-10-15','15:30:00','15:30:00','Projekt1','0.00','null'),(10,'admin','2022-10-15','15:30:00','15:30:00','Projekt1','0.00','null'),(11,'admin','2022-10-15','15:30:00','15:30:00','Projekt1','0.00','null'),(12,'admin','2022-10-15','15:30:00','15:30:00','Projekt1','0.00','null'),(13,'admin','2022-12-10','15:30:00','15:30:00','Projekt1','0.00','null'),(14,'admin','2022-12-11','15:30:00','15:30:00','Projekt1','0.00','null'),(15,'admin','2022-12-12','15:30:00','15:30:00','Projekt1','0.00','null'),(16,'admin','2022-12-13','15:30:00','15:30:00','Projekt1','0.00','null'),(17,'admin','2022-12-14','15:30:00','15:30:00','Projekt1','0.00','null'),(18,'admin','2023-01-15','15:30:00','15:30:00','Projekt1','0.00','null'),(19,'admin','2023-01-15','15:30:00','15:30:00','Projekt1','0.00','null'),(20,'admin','2023-01-15','15:30:00','15:30:00','Projekt1','0.00','null'),(21,'admin','2023-01-15','15:30:00','15:30:00','Projekt1','0.00','null'),(22,'admin','2023-01-15','15:30:00','14:00:00','Projekt1','-1.50','null'),(23,'admin','2022-11-17','11:30:00','11:30:00','Projekt2','0.00','2'),(24,'admin','2022-11-17','11:30:00','11:30:00','Projekt3','0.00','3'),(25,'admin','2022-11-17','11:30:00','11:30:00','Projekt2','0.00','4'),(26,'admin','2022-11-17','11:30:00','11:30:00','Projekt3','0.00','5'),(27,'admin','2022-11-18','12:45:00','12:45:00','Projekt1','0.00','6'),(28,'admin','2022-11-18','12:45:00','12:45:00','Projekt4','0.00','7'),(29,'admin','2022-11-18','13:00:00','13:00:00','Projekt1','0.00','8'),(30,'admin','2022-11-18','13:00:00','13:00:00','Projekt1','0.00','9'),(31,'admin','2022-11-18','13:15:00','13:30','Projekt1','0.25','10'),(32,'admin','2022-11-18','13:30','13:45','Projekt2','0.25','11'),(33,'admin','2022-11-18','13:30:00','13:30:00','Projekt1','0.00','Tabellen Einträge'),(34,'admin','2022-11-18','13:30:00','13:50','Projekt1','0.33','Anzeige Test'),(39,'admin','2022-11-21','12:30:00','12:30:00','Projekt2','0.00','Datum Tests'),(40,'admin','2022-12-02','12:45:00','13:45','Projekt1','1.00','Beginn Dateneingabe'),(41,'admin','2022-12-02','13:45','14:45','Projekt1','1.00','Daten'),(42,'admin','2022-12-02','14:45','15:45','Projekt2','1.00','Daten'),(43,'admin','2022-12-02','15:45','16:45','Projekt3','1.00','Daten'),(44,'admin','2022-12-02','16:45','17:45','Projekt4','1.00','Daten'),(45,'admin','2022-12-03','12:45:00','12:45:00','Projekt1','0.00','Daten'),(46,'admin','2022-12-04','12:45:00','12:45:00','Projekt1','0.00','Daten'),(47,'admin','2022-12-05','12:45:00','12:45:00','Projekt1','0.00','Daten'),(48,'admin','2022-12-06','12:45:00','12:45:00','Projekt1','0.00','Daten'),(49,'admin','2022-12-07','12:45:00','12:45:00','Projekt1','0.00','Daten'),(50,'admin','2022-12-08','12:45:00','12:45:00','Projekt1','0.00','Daten'),(51,'admin','2022-12-03','13:45:00','14:45:00','Projekt2','0.00','Daten'),(52,'admin','2022-12-03','14:45:00','15:45:00','Projekt3','0.00','Daten'),(53,'admin','2022-12-03','15:45:00','16:45:00','Projekt4','0.00','Daten'),(54,'admin','2022-12-04','13:45:00','14:45:00','Projekt2','0.00','Daten'),(55,'admin','2022-12-04','14:45:00','15:45:00','Projekt3','0.00','Daten'),(56,'admin','2022-12-04','15:45:00','16:45','Projekt4','1.00','Daten'),(65,'admin','2022-12-05','12:45:00','12:45:00','Projekt1','0.00','Daten'),(75,'admin','2022-12-05','13:45','14:45:00','Projekt2','-4.00','Daten'),(76,'admin','2022-12-05','14:45:00','15:45:00','Projekt3','0.00','Daten'),(77,'admin','2022-12-05','15:45:00','16:45:00','Projekt4','0.00','Daten'),(78,'admin','2022-12-06','13:45:00','14:45','Projekt2','1.00','Daten'),(79,'admin','2022-12-06','14:45','15:45','Projekt3','1.00','Daten'),(80,'admin','2022-12-06','15:45','16:45','Projekt4','1.00','Daten'),(81,'admin','2022-12-07','13:45','14:45','Projekt2','1.00','Daten'),(109,'admin','2022-12-07','14:45','15:45','Projekt3','1.00','Daten'),(110,'admin','2022-12-07','15:45','16:45','Projekt4','1.00','Daten'),(111,'admin','2022-12-08','13:45','14:45','Projekt2','1.00','Daten'),(112,'admin','2022-12-08','14:45','15:45','Projekt3','1.00','Daten'),(113,'admin','2022-12-08','15:45','16:45','Projekt4','1.00','Daten'),(114,'admin','2022-12-09','10:45','11:30','Projekt1','0.75','Daten'),(115,'admin','2022-12-09','11:30:00','12:30','Projekt2','1.00','Daten'),(116,'admin','2022-12-09','12:30','13:30','Projekt3','1.00','Daten'),(117,'admin','2022-12-09','13:30','14:30','Projekt4','1.00','Daten'),(118,'admin','2022-12-09','10:30','11:30:00','Projekt2','1.00','Daten'),(120,'admin','2023-01-02','14:00:00','14:00:00','Projekt1','0.00','Daten'),(121,'admin','2023-01-02','14:00:00','14:00:00','Projekt1','0.00','Daten'),(123,'admin','2023-01-02','14:00:00','14:00:00','Projekt1','0.00','Daten'),(124,'admin','2023-01-03','14:00:00','14:00:00','Projekt1','0.00','Daten'),(125,'admin','2023-01-04','14:00:00','14:00:00','Projekt1','0.00','Daten'),(126,'admin','2023-01-03','14:00:00','14:00:00','Projekt1','0.00','Daten'),(128,'admin','2023-01-06','14:00:00','14:00:00','Projekt1','0.00','Daten'),(129,'admin','2023-01-05','14:00:00','14:00:00','Projekt1','0.00','Daten'),(130,'admin','2023-01-07','14:00:00','14:00:00','Projekt1','0.00','Daten'),(131,'admin','2023-01-08','14:00:00','14:00:00','Projekt1','0.00','Daten'),(132,'admin','2023-01-09','14:00:00','14:00:00','Projekt1','0.00','Daten'),(134,'admin','2022-12-06','14:00:00','15:00','Projekt1','1.00','An dokumentation gearbeitet'),(136,'admin','2022-12-14','10:45:00','11:45','Pause','1.00','Entspannung'),(137,'admin','2022-12-14','12:25:00','13:55','Projekt1','1.50','Telefonat'),(138,'admin','2022-12-14','11:50','13:40:00','Projekt1','1.83','Fenstertest'),(139,'admin','2022-12-14','13:40:00','14:40','Pause','1.00','Pause');
/*!40000 ALTER TABLE `main_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userbase`
--

DROP TABLE IF EXISTS `userbase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userbase` (
  `user_index` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` text NOT NULL,
  `user_password` text NOT NULL,
  PRIMARY KEY (`user_index`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userbase`
--

LOCK TABLES `userbase` WRITE;
/*!40000 ALTER TABLE `userbase` DISABLE KEYS */;
INSERT INTO `userbase` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `userbase` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-22 13:53:22

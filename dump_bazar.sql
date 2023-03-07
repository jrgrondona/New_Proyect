-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: bazar_capicua
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `direc` varchar(45) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `tms` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Lucas Marcial','Ferro Costa','correa 123','37524546895','1','2023-03-02 22:38:42'),(2,'Matias A','Lopez','roca 1180','423423','1','2023-03-02 12:34:36'),(3,'Daniel','Gener','lavalle 12','3764258259','1','2023-03-02 01:39:04'),(4,'Juan Jose ','Campanella',NULL,NULL,'1','2023-02-26 21:09:47'),(5,'Juan','Perez',NULL,NULL,'1','2023-01-30 19:39:53'),(6,'Sofia Aranza','Grondona',NULL,NULL,'1','2023-01-30 19:42:23'),(7,'Julio ','Sosa',NULL,NULL,'1','2023-01-30 20:36:18'),(8,'Lucio Miguel','Lampard',NULL,NULL,'1','2023-01-31 20:02:46'),(9,'Juan Jose','Campanella',NULL,NULL,'1','2023-02-28 23:14:01'),(10,'Andres',' Timel','la carra 252','123489652','1','2023-03-05 21:56:21');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta`
--

DROP TABLE IF EXISTS `cuenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta` (
  `idcuenta` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcuenta`),
  UNIQUE KEY `idcuenta_UNIQUE` (`idcuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta`
--

LOCK TABLES `cuenta` WRITE;
/*!40000 ALTER TABLE `cuenta` DISABLE KEYS */;
INSERT INTO `cuenta` VALUES (1,'Activo'),(2,'Inactivo');
/*!40000 ALTER TABLE `cuenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `estado` varchar(45) DEFAULT '1',
  `tms` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'plastico c','1','2023-03-03 01:37:09'),(2,'Todo Metal','1','2023-01-17 20:16:00'),(3,'ECCENN','1','2023-01-17 20:20:05'),(4,'Todo Teflon','1','2023-02-11 20:29:45'),(5,'LUMIN TERMOS','1','2023-02-11 20:36:36'),(6,'encomat','1','2023-03-04 01:17:11');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `id_marca` int unsigned NOT NULL,
  `precio_costo` double(10,2) DEFAULT NULL,
  `precio_venta` double(10,2) DEFAULT NULL,
  `estado` varchar(45) DEFAULT '1',
  `stock` double DEFAULT NULL,
  `tms` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_marca` (`id_marca`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (2,'Jarra','Juguera frut',1,'200','350','1','10','2023-01-18 12:49:09'),(3,'vasos','tereré',1,'80','120','1','20','2023-01-17 20:11:37'),(4,'cuchara','bebé',1,'50','85','1','15','2023-01-17 20:13:36'),(5,'Olla','Paellera',3,'6500','11200','1','8','2023-01-17 20:18:21'),(6,'Asador','Para parrilla',1,'3500','7200','1','10','2023-01-31 22:12:45'),(10,'Palita','Para Sopa',1,'65','150','1','15','2023-02-13 21:54:03');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `cuil` decimal(50,0) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `tms` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_productos` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Mercotrade S.R.L.',21305622566,'1','2023-03-05 14:40:09',2);
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_cuenta`
--

DROP TABLE IF EXISTS `usuario_cuenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_cuenta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idusuario` varchar(45) DEFAULT NULL,
  `idcuenta` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idusuario_cuenta_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_cuenta`
--

LOCK TABLES `usuario_cuenta` WRITE;
/*!40000 ALTER TABLE `usuario_cuenta` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_cuenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `apellido_nombre` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT '1',
  `fecha_creacion` timestamp NULL DEFAULT NULL,
  `fecha_modificacion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `idUsuario_UNIQUE` (`id_usuario`),
  UNIQUE KEY `dni_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'jrgrondona','$2b$10$1eAhM76VtiAc1boBEK.8r.hD6Mwofg4hOL/5ADIOAWPCB1l097IOO','juangrondona.01@gmail.com','Juan Grondona','1','2023-01-31 14:35:19',NULL),(2,'gvargas','$2b$10$EdWHaN6LT/8CPMbEgHnPxOK5.4MSMYffCC6XkvBoSNR2IuAGDPOuG','gustavo@gmail.com','Vargas Gustavo','1','2023-02-09 20:38:16',NULL),(21,'jos','$2b$10$y.5V4CyeKqLAEQGEt6TWcOxH87HGdv78ulE3PywW.JQ03H5fEzwWC','jose@jose.com','jose perez','1','2023-02-27 00:48:15',NULL),(22,'ser','$2b$10$RCTq.oaC6tRQcFzrSr655e3t04Ok8hIqC16xWW0CtcbAkGXOl/UDC','jose@jose.com','juan jose','0','2023-02-27 02:48:14',NULL),(23,'m','$2b$10$/nbYqca.i/lx8wJSDXGleeqjjtZHXYjj8Df/xfPm7wo3dQmJtuHr6','dol@goy.com','m lopez','0','2023-02-27 11:48:42',NULL),(24,'jose','$2b$10$ZbBhqfi/SADspMrLg7M1Fu/WI2tScSzJeJPUJyARA2XmyhSP0q5Kq','dol@goy.com','lucas joere','1','2023-03-02 01:41:23',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-05 19:14:25

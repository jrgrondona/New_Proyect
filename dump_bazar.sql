-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
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
  `estado` varchar(45) DEFAULT '1',
  `tms` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'MARIA ','Welter','GARUHAPE','3743433200','1','2023-03-07 19:49:47'),(2,'FERNANDO','BAEZ','ELDORADO','3755456522','1','2023-03-06 19:31:33'),(3,'ROSA','ROMERO','BUENOS AIRES','1169583155','1','2023-03-06 19:31:55'),(4,'Miguel Angel','Torres Fuentes','SAN PEDRO','3758465896','1','2023-03-06 19:32:14'),(5,'Juan','Perez','WANDA','3743566588','1','2023-03-06 19:33:20'),(6,'Sofia Aranza','Grondona','GARUHAPE','3743000000','1','2023-03-06 19:33:41');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Plasticos Central','1','2023-03-04 14:10:11'),(2,'Todo Metal','1','2023-01-17 20:16:00'),(3,'ECCENN','1','2023-01-17 20:20:05');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (2,'JARRA PORRON','JUGUERA ',1,200.00,350.00,'1',30,'2023-03-07 19:50:32'),(3,'vasos','tereré',1,80.00,223.00,'1',8452,'2023-03-04 13:18:10'),(4,'CUCHARA ','BEBE',1,50.00,85.00,'1',1650,'2023-03-07 20:45:50'),(5,'Olla','Paellera',3,6500.00,11200.00,'1',9860,'2023-03-07 20:45:59'),(6,'Asador','Para parrilla',1,3500.00,7200.00,'1',150,'2023-03-06 20:01:48'),(16,'palita','reviro',1,50.00,1205.00,'1',250,'2023-03-07 12:22:54');
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
  `estado` varchar(45) DEFAULT '1',
  `tms` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_productos` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Siner S.R.L',20259887890,'1','2023-02-23 19:43:09',2),(2,'El Condor',20502221110,'1','2023-02-25 15:14:11',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'jrgrondona','$2b$10$1eAhM76VtiAc1boBEK.8r.hD6Mwofg4hOL/5ADIOAWPCB1l097IOO','juangrondona.01@gmail.com','Juan Grondona','1','2023-01-31 14:35:19',NULL),(2,'gvargas','$2b$10$EdWHaN6LT/8CPMbEgHnPxOK5.4MSMYffCC6XkvBoSNR2IuAGDPOuG','gustavo@gmail.com','Vargas Gustavo','1','2023-02-09 20:38:16',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id_ventas` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_producto` int NOT NULL,
  `Cantidad` double(10,2) DEFAULT NULL,
  `Estado` varchar(45) DEFAULT '1',
  `tms` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_ventas`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,1,2,1500.00,'1','2023-03-05 19:00:00'),(39,2,3,188.00,'1','2023-03-07 21:51:38');
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-07 19:23:27

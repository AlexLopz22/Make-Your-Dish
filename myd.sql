-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: myd_app
-- ------------------------------------------------------
-- Server version	8.4.3

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
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'naranjas'),(2,'aceite de oliva'),(3,'cebolla'),(4,'ajo'),(5,'contramuslos de pollo'),(6,'sal'),(7,'pimienta negra molida'),(8,'orégano seco'),(9,'vino blanco'),(10,'mantequilla');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_ingredients`
--

DROP TABLE IF EXISTS `recipe_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_ingredients` (
  `recipe_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  `quantity` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`recipe_id`,`ingredient_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  CONSTRAINT `recipe_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_ingredients`
--

LOCK TABLES `recipe_ingredients` WRITE;
/*!40000 ALTER TABLE `recipe_ingredients` DISABLE KEYS */;
INSERT INTO `recipe_ingredients` VALUES (1,1,'400 g'),(1,2,'2 cucharadas'),(1,3,'100 g'),(1,4,'2 dientes'),(1,5,'4 unidades (700 g)'),(1,6,'al gusto'),(1,7,'al gusto'),(1,8,'1 cucharada'),(1,9,'60 ml'),(1,10,'1 cucharada');
/*!40000 ALTER TABLE `recipe_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_steps`
--

DROP TABLE IF EXISTS `recipe_steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_steps` (
  `recipe_id` int NOT NULL,
  `step_number` int NOT NULL,
  `description` text,
  PRIMARY KEY (`recipe_id`,`step_number`),
  CONSTRAINT `recipe_steps_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_steps`
--

LOCK TABLES `recipe_steps` WRITE;
/*!40000 ALTER TABLE `recipe_steps` DISABLE KEYS */;
INSERT INTO `recipe_steps` VALUES (1,1,'Lavamos 400 g de naranjas y exprimimos su zumo: necesitaremos 350 ml así que si no obtenemos suficiente, exprimiremos más naranjas. Reservamos.'),(1,2,'Calentamos 2 cucharadas de aceite de oliva en una sartén y sofreímos 100 g de cebolla pelada y picada durante 5 minutos a fuego bajo. Agregamos 2 dientes de ajo prensados y cocinamos 1 minuto más.'),(1,3,'Retiramos la cebolla a un lado de la sartén y doramos 4 contramuslos de pollo salpimentado durante 10 minutos a fuego medio-alto.'),(1,4,'Condimentamos el pollo con 1 cucharada de orégano seco, vertemos 60 ml de vino blanco o jerez y lo dejamos reducir durante 3 minutos a fuego alto.'),(1,5,'Vertemos el zumo de naranja y 1 cucharada de mantequilla y cocinamos el conjunto destapado durante 40 minutos, girándolo a mitad de cocción, hasta que el pollo esté completamente cocinado.'),(1,6,'Servimos el pollo a la naranja recién hecho tal cual, o acompañado de una guarnición al gusto, por ejemplo, arroz blanco.');
/*!40000 ALTER TABLE `recipe_steps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `category` varchar(100) DEFAULT NULL,
  `cuisine` varchar(100) DEFAULT NULL,
  `servings` int DEFAULT NULL,
  `prep_time_minutes` int DEFAULT NULL,
  `cook_time_minutes` int DEFAULT NULL,
  `total_time_minutes` int DEFAULT NULL,
  `calories_per_serving` int DEFAULT NULL,
  `image_url` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (1,'Pollo a la naranja de la abuela','Receta tradicional de pollo con un contraste delicioso de dulce y salado, cocinado lentamente con zumo de naranja.','Plato principal','Española',2,10,60,70,733,'https://imag.bonviveur.com/pollo-a-la-naranja-de-la-abuela.webp'),(2,'Melocotón Melba','Aprende a preparar el melocotón Melba. Un postre clásico de la cocina francesa. Te contamos todo sobre su origen, su receta y consejos sobre ingredientes y presentación.','Postre','Francesa',2,15,10,25,424,'https://imag.bonviveur.com/melocoton-melba.webp'),(3,'Albóndigas en salsa de la abuela','Las albóndigas en salsa de la abuela es una de esas recetas que pasa de generación en generación y, aunque en cada familia se adaptan según gustos.','Plato principal','Española',4,15,40,55,537,'https://imag.bonviveur.com/albondigas-en-salsa-de-la-abuela.webp'),(4,'Trifle','El trifle es un postre tradicional británico que se ha convertido en un clásico en muchas mesas alrededor del mundo.','Postre','Inglesa',6,30,5,35,153,'https://imag.bonviveur.com/trifle-listo-para-servir.webp'),(5,'Rigatoni al forno','La pasta al horno es un irresistible placer y para muestra, esta deliciosa receta de rigatoni al forno. Una especialidad italiana muy fácil de hacer, con un resultado especialmente cremoso y lleno de sabor.','Plato principal','Italiana',2,5,20,25,1063,'https://imag.bonviveur.com/rigatoni-al-forno.webp'),(6,'Berenjenas rellenas al microondas','Las berenjenas rellenas al microondas son la opción perfecta para una cena rápida, deliciosa y sin apenas manchar la cocina. Con esta receta, tendrás un plato riquísimo en la mesa, en poco más de 10 minutos.','Plato principal','Internacional',2,5,10,15,374,'https://imag.bonviveur.com/berenjenas-rellenas-al-microondas.webp'),(7,'Bacalao Espiritual','El bacalao espiritual es una receta portuguesa que combina bacalao con una mezcla cremosa dando lugar a un bocado tan sublime como refleja el nombre de esta elaboración.','Plato principal','Portuguesa',2,10,30,40,805,'https://imag.bonviveur.com/bacalao-espiritual.webp'),(8,'Wok de arroz con verduras y pollo','El wok de arroz y verduras es una receta muy versátil ya que podemos hacerla con verduras de temporada o las que tengamos en la despensa.','Plato principal','Internacional',2,10,25,35,506,'https://imag.bonviveur.com/wok-de-arroz-con-verduras-y-pollo.webp'),(9,'Salmón en papillote en microondas','El salmón en papillote cocinado en el microondas es una receta ideal para cuando tenemos muy poco tiempo o queremos preparar solo una o dos raciones a lo sumo.','Plato principal','Internacional',1,5,5,10,445,'https://imag.bonviveur.com/salmon-en-papillote-en-microondas.webp'),(10,'Solomillo de cerdo en salsa','Esta es una receta de carne sencilla y rápida de elaborar, muy rica, y que podemos servir con patatas fritas, arroz o una ensalada según la ocasión.','Plato principal','Española',2,5,40,45,718,'https://imag.bonviveur.com/solomillo-de-cerdo-en-salsa-listo-para-comer.webp'),(11,'Fricasé de pollo','Aprende a preparar la receta del fricasé de pollo, un guiso clásico de la cocina francesa que ha conquistado mesas de todo el mundo.','Plato principal','Francesa',4,10,65,75,668,'https://imag.bonviveur.com/fricase-de-pollo.webp'),(12,'Tiramisú en vasitos','El tiramisú en vasitos es la opción más fácil y rápida para disfrutar de este popular postre italiano con poco esfuerzo, aunque con un resultado buenísimo.','Postre','Italiana',4,10,0,10,338,'https://imag.bonviveur.com/tiramisu-en-vasitos.webp');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-21 14:15:54

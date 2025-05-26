-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: myd_app
-- ------------------------------------------------------
-- Server version	8.4.5

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
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `usuario_id` int NOT NULL,
  `receta_id` int NOT NULL,
  PRIMARY KEY (`usuario_id`,`receta_id`),
  KEY `receta_id` (`receta_id`),
  CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`receta_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `principal` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'Naranjas','Si'),(2,'Aceite de oliva','No'),(3,'Cebolla','No'),(4,'Ajo','No'),(5,'Contramuslos de pollo','Si'),(6,'Sal','No'),(7,'Pimienta negra molida','No'),(8,'Orégano seco','No'),(9,'Vino blanco','Si'),(10,'Mantequilla','No'),(11,'Melocotones','Si'),(12,'Azúcar','No'),(13,'Frambuesas','Si'),(14,'Zumo de limón','No'),(15,'Almendras','No'),(16,'Nata para montar','No'),(17,'Azúcar glas','No'),(18,'Esencia de vainilla','No'),(19,'Helado de vainilla','Si'),(20,'Carne picada de ternera y de cerdo','Si'),(21,'Huevo','No'),(22,'Perejil','No'),(23,'Pan rallado','No'),(24,'Zanahoria','No'),(25,'Harina de trigo','No'),(26,'Caldo de pollo','No'),(27,'Maicena','No'),(28,'Vainilla en pasta','No'),(29,'Leche entera','No'),(30,'Bizcocho de soletilla','Si'),(31,'Fresas','Si'),(32,'Vino dulce','No'),(33,'Chorizo','No'),(34,'Rigatoni','Si'),(35,'Champiñones','No'),(36,'Salsa de toamte','No'),(37,'Nata para cocinar','No'),(38,'Queso parmesano rallado','No'),(39,'Bechamel','No'),(40,'Berenjenas','Si'),(41,'Tomates en conserva','No'),(42,'Cayena en polvo','No'),(43,'Comino en polvo','No'),(44,'Queso mozzarella','No'),(45,'Orégano','No'),(46,'Patata','No'),(47,'Laurel','No'),(48,'Bacalao desalado','Si'),(49,'Nuez moscada','No'),(50,'Arroz de grano largo','Si'),(51,'Pimiento','No'),(52,'Salsa de soja','No'),(53,'Cebollino picado','No');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planes_semanales`
--

DROP TABLE IF EXISTS `planes_semanales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planes_semanales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `dia` enum('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
  `receta_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_plan` (`usuario_id`,`dia`),
  KEY `fk_planes_receta` (`receta_id`),
  CONSTRAINT `fk_planes_receta` FOREIGN KEY (`receta_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_planes_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planes_semanales`
--

LOCK TABLES `planes_semanales` WRITE;
/*!40000 ALTER TABLE `planes_semanales` DISABLE KEYS */;
INSERT INTO `planes_semanales` VALUES (1,4,'Lunes',4),(2,4,'Jueves',1),(4,4,'Martes',3);
/*!40000 ALTER TABLE `planes_semanales` ENABLE KEYS */;
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
  `cantidad_num` decimal(10,2) DEFAULT NULL,
  `unidad` varchar(50) DEFAULT NULL,
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
INSERT INTO `recipe_ingredients` VALUES (1,1,'400 g',400.00,'g'),(1,2,'2 cucharadas',2.00,'cucharadas'),(1,3,'100 g',100.00,'g'),(1,4,'2 dientes',2.00,'dientes'),(1,5,'4 unidades (700 g)',700.00,'g'),(1,6,'al gusto',NULL,NULL),(1,7,'al gusto',NULL,NULL),(1,8,'1 cucharada',1.00,'cucharada'),(1,9,'60 ml',60.00,'ml'),(1,10,'1 cucharada',1.00,'cucharada'),(2,11,'2',2.00,NULL),(2,12,'4 cucharadas y media',4.50,'cucharadas'),(2,13,'200 g',200.00,'g'),(2,14,'1 chorrito',1.00,'chorrito'),(2,15,'1 puñadito',1.00,'puñadito'),(2,16,'100 ml',100.00,'ml'),(2,17,'1/2 cucharada',0.50,'cucharada'),(2,18,'Unas gotas',NULL,'Unas gotas'),(2,19,'2 bolas',2.00,'bolas'),(3,2,'2 cucharadas',2.00,'cucharadas'),(3,3,'150 g y media',150.50,'g'),(3,4,'3 dientes',3.00,'dientes'),(3,6,'al gusto',NULL,'al gusto'),(3,7,'al gusto',NULL,'al gusto'),(3,20,'500 g',500.00,'g'),(3,21,'1 unidad',1.00,'unidades'),(3,23,'50 g',50.00,'g'),(3,24,'100 g',100.00,'g'),(3,25,'20 g',20.00,'g'),(3,26,'200 ml',200.00,'ml'),(4,12,'40 g',40.00,'g'),(4,13,'150 g',150.00,'g'),(4,16,'200 ml',200.00,'ml'),(4,17,'30 g',30.00,'g'),(4,21,'2 unidades',2.00,'unidades'),(4,27,'20 g',20.00,'g'),(4,28,'1 cucharadita',1.00,'cucharadita'),(4,29,'400 ml',400.00,'ml'),(4,30,'12 unidades',12.00,'unidades'),(4,31,'200 g',200.00,'g'),(4,32,'100 ml',100.00,'ml'),(5,2,'1 cucharada',1.00,'cucharada'),(5,6,'al gusto',NULL,'al gusto'),(5,7,'al gusto',NULL,'al gusto'),(5,33,'75 g',75.00,'g'),(5,34,'150 g',150.00,'g'),(5,35,'75 g',75.00,'g'),(5,36,'150 g',150.00,'g'),(5,37,'150 ml',150.00,'ml'),(5,38,'85 g',85.00,'g'),(5,39,'150 g',150.00,'g'),(6,2,'2 cucharadas',2.00,'cucharadas'),(6,3,'50 g',50.00,'g'),(6,4,'2 dientes',2.00,'dientes'),(6,6,'al gusto',NULL,'al gusto'),(6,7,'al gusto',NULL,'al gusto'),(6,40,'400 g',400.00,'g'),(6,41,'200 g',200.00,'g'),(6,42,'Una pizca',NULL,'Una pizca'),(6,43,'1 cucharadita',1.00,'cucharadita'),(6,44,'125 g',125.00,'g'),(6,45,'1 cucharada',1.00,'cucharada'),(7,2,'al gusto',NULL,'al gusto'),(7,3,'80 g',80.00,'g'),(7,4,'1 diente',1.00,'dientes'),(7,6,'al gusto',NULL,'al gusto'),(7,7,'al gusto',NULL,'al gusto'),(7,10,'25 g',25.00,'g'),(7,22,'1 cucharada',1.00,'cucharada'),(7,24,'80 g',80.00,'g'),(7,25,'25 g',25.00,'g'),(7,29,'300 ml',300.00,'ml'),(7,38,'60 g',60.00,'g'),(7,46,'100 g',100.00,'g'),(7,47,'1 hoja',1.00,'hoja'),(7,48,'200 g',200.00,'g'),(7,49,'al gusto',NULL,'al gusto'),(8,2,'al gusto',NULL,'al gusto'),(8,3,'50 g',50.00,'g'),(8,5,'150 g',150.00,'g'),(8,6,'al gusto',NULL,'al gusto'),(8,7,'al gusto',NULL,'al gusto'),(8,24,'80 g',80.00,'g'),(8,35,'100 g',100.00,'g'),(8,50,'130 g',130.00,'g'),(8,51,'1 unidad',1.00,'unidad'),(8,52,'40 ml',40.00,'ml'),(8,53,'1 cucharada',1.00,'cucharada');
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
  `image_url` varchar(2083) DEFAULT NULL,
  PRIMARY KEY (`recipe_id`,`step_number`),
  CONSTRAINT `recipe_steps_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_steps`
--

LOCK TABLES `recipe_steps` WRITE;
/*!40000 ALTER TABLE `recipe_steps` DISABLE KEYS */;
INSERT INTO `recipe_steps` VALUES (1,1,'Lavamos 400 g de naranjas y exprimimos su zumo: necesitaremos 350 ml así que si no obtenemos suficiente, exprimiremos más naranjas. Reservamos.','https://imag.bonviveur.com/exprimimos-las-naranjas-para-preparar-la-salsa.webp'),(1,2,'Calentamos 2 cucharadas de aceite de oliva en una sartén y sofreímos 100 g de cebolla pelada y picada durante 5 minutos a fuego bajo. Agregamos 2 dientes de ajo prensados y cocinamos 1 minuto más.','https://imag.bonviveur.com/sofreimos-la-cebolla-y-los-ajos-para-la-base-de-la-salsa-de-naranja.webp'),(1,3,'Retiramos la cebolla a un lado de la sartén y doramos 4 contramuslos de pollo salpimentado durante 10 minutos a fuego medio-alto.','https://imag.bonviveur.com/doramos-los-contramuslos-de-pollo-en-la-sarten.webp'),(1,4,'Condimentamos el pollo con 1 cucharada de orégano seco, vertemos 60 ml de vino blanco o jerez y lo dejamos reducir durante 3 minutos a fuego alto.','https://imag.bonviveur.com/dejamos-reducir-el-jerez-con-el-pollo-y-el-oregano.webp'),(1,5,'Vertemos el zumo de naranja y 1 cucharada de mantequilla y cocinamos el conjunto destapado durante 40 minutos, girándolo a mitad de cocción, hasta que el pollo esté completamente cocinado.','https://imag.bonviveur.com/cocinamos-el-pollo-con-el-zumo-de-naranja.webp'),(1,6,'Servimos el pollo a la naranja recién hecho tal cual, o acompañado de una guarnición al gusto, por ejemplo, arroz blanco.','https://imag.bonviveur.com/pollo-a-la-naranja-de-la-abuela-listo-para-comer.webp'),(2,1,'Vamos a empezar las explicaciones por la preparación de los melocotones frescos. Si los usas en almíbar, puedes saltarte los siguientes pasos. En un cazo, ponemos una buena cantidad de agua y llevamos a ebullición. Preparamos al lado un bol de agua con mucho hielo. Cuando el agua hierva, cogemos 2 melocotones que no estén demasiado maduros y los escaldamos, esto es, los sumergimos en el agua hirviendo por tan solo 20 segundos, no más. Acto seguido, los sacamos rápidamente y los pasamos un bol lleno de agua con hielo para cortar la cocción.','https://imag.bonviveur.com/escaldar-los-melocotones-para-hacer-el-melocoton-melba.webp'),(2,2,'Luego, procedemos a partirlos en dos alrededor del hueso, retiramos este último y pelamos los melocotones. En realidad, el paso anterior únicamente sirve para poder quitarles la piel y que se queden lisos y bonitos. Si prefieres, los puedes pelar a mano, aunque el resultado será un poco más «rústico», aunque igual de válido.','https://imag.bonviveur.com/pelar-los-melocotones-para-hacer-el-melocoton-melba.webp'),(2,3,'A continuación, ponemos de nuevo agua a hervir y la endulzamos con 4 cucharadas de azúcar. Cuando hierva, metemos los melocotones y los dejamos cocer durante unos 5 minutos, lo que les aportará una textura tierna y un toque extra de dulzor. Si usas melocotones en almíbar, empezarías la receta a partir del siguiente paso.','https://imag.bonviveur.com/cocer-los-melocotones-para-hacer-el-melocoton-melba.webp'),(2,4,'En otro cazo, combinamos 200 g de frambuesas (reservando 4 para la decoración final) con 1 chorrito de zumo de limón y media cucharada de azúcar. Cocemos la mezcla hasta que espese y las frambuesas se deshagan, para crear un sirope.','https://imag.bonviveur.com/sirope-de-frambuesa-para-hacer-el-melocoton-melba.webp'),(2,5,'Una vez que hemos obtenido la consistencia deseada para nuestro sirope de frambuesa, lo pasamos por un colador. Este paso garantiza que nuestro sirope tenga una textura suave, libre de semillas, lo que resulta mucho más agradable.','https://imag.bonviveur.com/colar-el-sirope-de-frambuesa-del-melocoton-melba.webp'),(2,6,'Ahora, es el turno de las almendras laminadas. Tenemos que tostar 1 puñadito, aunque si vas a hacer este postre más veces puedes preparar una buena cantidad de antemano y conservarlas. Para ello, las podemos dorar en una sartén sin aceite a fuego medio y removiendo para que no se quemen. También vale en el horno o en la freidora de aire a 160 ºC hasta que adquieran un tono dorado y desprendan su aroma. Si usamos crocanti, este paso no es necesario.','https://imag.bonviveur.com/tostar-las-almendras-para-el-melocoton-melba.webp'),(2,7,'La última preparación que nos queda es la nata montada. Ponemos 100 ml de nata para montar en un bol y la batimos con unas varillas manuales o eléctricas. Para ayudar a que se monte más rápido, la nata tiene que estar lo más fría posible. Cuando esté casi montada, añadimos ½ cucharada de azúcar glas y unas gotas de esencia de vainilla y terminamos de montar.','https://imag.bonviveur.com/montar-la-nata-para-el-melocoton-melba.webp'),(2,8,'Con todo listo, pasamos al montaje del postre. Lo cierto es que puedes presentarlo como más te guste y en el orden que prefieras. Las dos maneras de hacerlo más comunes son en una copa de helado o en un plato, que es la que más nos gusta porque queda más vistoso. En el plato o copa elegidos para servir, ponemos en el fondo una cucharada de nuestro sirope de frambuesa. Sobre este, colocamos el melocotón previamente cortado en cuartos, presentando las piezas de forma que queden vistosas.','https://imag.bonviveur.com/montaje-del-melocoton-melba.webp'),(2,9,'Sobre el melocotón, añadimos con cuidado una bola de helado de vainilla, seguida de nuestra nata montada que podemos meter en la manga pastelera y hacer montoncitos con ella entre los melocotones.','https://imag.bonviveur.com/anadir-el-helado-y-la-nata-al-melocoton-melba.webp'),(2,10,'Concluimos nuestro postre con un poco más de sirope por encima, espolvoreando unas poquitas almendras tostadas y decorándolo con las frambuesas que habíamos reservado previamente. Si se desea, un toque de verde con una hoja de menta ayuda a que quede aún más llamativo y apetecible. ¡Y listo! Servimos enseguida.','https://imag.bonviveur.com/decorar-el-melocoton-melba.webp'),(3,1,'Pelamos y picamos media cebolla. Calentamos 1 cucharada de aceite de oliva en una sartén y la rehogamos, a fuego bajo, durante 5 minutos, hasta que esté transparente.','https://imag.bonviveur.com/sofreimos-la-cebolla-para-preparar-las-albondigas.webp'),(3,2,'Disponemos en un cuenco amplio 500 g de carne picada de ternera y de cerdo, la cebolla rehogada, 1 huevo, 1 diente de ajo prensado, 1 cucharada de perejil picado, 50 g de pan rallado y salpimentamos.','https://imag.bonviveur.com/mezclamos-los-ingredientes-de-las-albondigas-de-la-abuela.webp'),(3,3,'Mezclamos bien y formamos 18 albóndigas del tamaño de una bola de ping-pong.','https://imag.bonviveur.com/formamos-las-albondigas-de-la-abuela.webp'),(3,4,'Calentamos 1 cucharada de aceite de oliva en la misma sartén y doramos las albóndigas durante 10 minutos. Reservamos en un plato.','https://imag.bonviveur.com/doramos-las-albondigas-de-la-abuela.webp'),(3,5,'Una vez hemos dorado las albóndigas, preparamos la salsa: para ello, pelamos 150 g de cebolla y la picamos. Pelamos 100 g de zanahoria y la cortamos a rodajas. Prensamos 2 dientes de ajo.','https://imag.bonviveur.com/cortamos-las-verduras-para-la-salsa-de-las-albondigas.webp'),(3,6,'En la misma sartén en la que hemos dorado las albóndigas, sofreímos la cebolla durante 5 minutos hasta que esté ligeramente dorada, agregamos el ajo y la zanahoria y cocinamos 10 minutos a fuego bajo.','https://imag.bonviveur.com/sofreimos-las-verduras-para-preparar-la-salsa-de-la-abuela.webp'),(3,7,'Agregamos 20 g de harina de trigo y la tostamos 2 minutos, removiendo. Vertemos 125 ml de vino blanco o jerez y dejamos reducir a fuego fuerte durante 5 minutos.','https://imag.bonviveur.com/reducimos-el-vino-con-las-verduras.webp'),(3,8,'Trituramos las verduras con 200 ml de caldo de pollo hasta obtener una salsa fina, incorporamos las albóndigas reservadas y cocinamos el conjunto durante 10 minutos, removiendo. Probamos y salpimentamos al gusto.','https://imag.bonviveur.com/cocinamos-la-salsa-con-las-albondigas-de-la-abuela.webp'),(3,9,'Servimos estas deliciosas albóndigas en salsa de la abuela recién hechas con una guarnición al gusto.','https://imag.bonviveur.com/albondigas-en-salsa-de-la-abuela-listas-para-comer.webp'),(4,1,'Comenzamos preparando las natillas. Para ello mezclamos en un cazo 2 huevos L con 40 gramos de azúcar blanco, 20 gramos de maicena, 1 cucharadita de vainilla en pasta y 400 ml de leche entera.','https://imag.bonviveur.com/mezclamos-los-ingredientes-de-las-natillas-del-trifle.webp'),(4,2,'Llevamos esta mezcla a fuego medio sin dejar de remover con unas varillas hasta que espese. La ponemos en un bol, la cubrimos con film transparente y la dejamos enfriar por completo a temperatura ambiente.','https://imag.bonviveur.com/espesamos-las-natillas-del-trifle.webp'),(4,3,'Cuando las natillas hayan enfriado, cortamos en trozos de aproximadamente 1 cm 12 bizcochos de soletilla y reservamos.','https://imag.bonviveur.com/cortamos-los-bizcochos-del-trifle.webp'),(4,4,'Por otra parte, lavamos y cortamos 200 g de fresas y reservamos. Lavamos también 150 gramos de frambuesas.','https://imag.bonviveur.com/cortamos-las-fresas-del-trifle.webp'),(4,5,'Preparamos 6 vasitos o cuencos y en la base, colocamos unos cuantos trocitos de los bizcochos de soletilla. Mojamos con la mitad de 100 ml de vino dulce.','https://imag.bonviveur.com/ponemos-los-bizcochos-del-trifle.webp'),(4,6,'Sobre los bizcochos ponemos unas fresas troceadas y frambuesas.','https://imag.bonviveur.com/ponemos-la-fruta-del-trifle.webp'),(4,7,'Ponemos sobre las fresas una porción de natillas.','https://imag.bonviveur.com/ponemos-las-natillas-del-trifle.webp'),(4,8,'Colocamos otra capa de bizcochos y remojamos con el resto del vino dulce.','https://imag.bonviveur.com/ponemos-la-segunda-capa-de-bizcocho-del-trifle.webp'),(4,9,'Vertemos otra capa de fresas y frambuesas y sobre ellas, otra porción de natillas. Llevamos a la nevera durante al menos 2 horas para que se integren bien todos los sabores.','https://imag.bonviveur.com/ponemos-la-segunda-capa-de-fresas-del-trifle.webp'),(4,10,'Antes de servir montamos 200 ml de nata para montar fría con 30 gramos de azúcar glas hasta que esté bien firme.','https://imag.bonviveur.com/montamos-la-nata-del-trifle.webp'),(4,11,'Decoramos el trifle con la nata y opcionalmente con unas fresas y frambuesas.','https://imag.bonviveur.com/decoramos-el-trifle.webp'),(4,12,'Servimos este exquisito postre bien frío.','https://imag.bonviveur.com/textura-del-trifle.webp'),(5,1,'Calentamos 1 cucharada de oliva en una sartén y sofreímos 75 g de chorizo cortado fino durante 2 minutos a fuego bajo. Lo reservamos en un plato. Mientras tanto, ponemos a hervir 150 g de rigatoni en agua con sal durante el tiempo que indique el fabricante.','https://imag.bonviveur.com/sofreimos-el-chorizo.webp'),(5,2,'Precalentamos el gratinador del horno. Agregamos 75 g de champiñones cortados a láminas en la sartén donde hemos cocinado el chorizo y sofreímos durante 3 minutos más.','https://imag.bonviveur.com/cocinamos-los-champinones-fileteados.webp'),(5,3,'Vertemos 150 g de salsa de tomate y 150 ml de nata para cocinar, removemos el conjunto y agregamos 40 g del queso parmesano rallado. Cocinamos durante 3 minutos.','https://imag.bonviveur.com/cocinamos-los-champinones-con-la-salsa-la-nata-y-parte-del-queso.webp'),(5,4,'Escurrimos la pasta y la añadimos a la sartén con la salsa, junto al chorizo reservado. Salpimentamos al gusto y removemos bien.','https://imag.bonviveur.com/mezclamos-la-salsa-con-el-chorizo-y-la-pasta-hervida.webp'),(5,5,'Disponemos la pasta en dos cazuelitas individuales aptas para horno y repartimos 150 g de salsa bechamel entre las dos cazuelitas, en el centro, y cubrimos con los 45 g restantes de queso parmesano rallado.','https://imag.bonviveur.com/repartimos-en-cazuelitas.webp'),(5,6,'Gratinamos los rigatoni durante 5 minutos hasta que el queso se funda.','https://imag.bonviveur.com/horneamos-el-rigatoni-al-forno.webp'),(5,7,'Servimos inmediatamente.','https://imag.bonviveur.com/rigatoni-al-forno-listo-para-comer.webp'),(6,1,'Lavamos 2 berenjenas, las cortamos por la mitad a lo largo y las disponemos en una bandeja apta para el microondas. Tapamos con film transparente apto para microondas pinchándolo para que salga el calor (o bien, usamos un recipiente con tapa apto para microondas). Cocinamos las berenjenas en el microondas durante 7 minutos a 850 W. Las retiramos del microondas con cuidado y, con ayuda de una cuchara, les sacamos la pulpa y reservamos la piel.','https://imag.bonviveur.com/cocinamos-las-berenjenas-en-el-microondas.webp'),(6,2,'Mezclamos en un cuenco la pulpa de las berenjenas con 2 cucharadas de aceite de oliva, 50 g de chalota picada, 2 dientes de ajo prensados, 200 g de tomates en conserva escurridos, 1 pizca de cayena en polvo, si os gusta el picante, y 1 cucharadita de comino en polvo. Salpimentamos al gusto y cocinamos esta mezcla en el microondas durante 2 minutos a a 850 W, cubriendo el bol con una tapa antisalpicaduras o con film apto para microondas sin cubrirlo totalmente.','https://imag.bonviveur.com/cocinamos-el-relleno-de-las-berenjenas.webp'),(6,3,'Rellenamos las berenjenas que habíamos reservado con la mezcla recién cocinada en el microondas.','https://imag.bonviveur.com/rellenamos-las-berenjenas-con-la-mezcla-cocinada.webp'),(6,4,'A continuación, las cubrimos con 125 g de queso mozzarella rallado.','https://imag.bonviveur.com/cubrimos-las-berenjenas-con-la-mozzarella.webp'),(6,5,'Las cocinamos de nuevo en el microondas durante 3 minutos más a 850 W, hasta que el queso esté fundido. Las espolvoreamos con 1 cucharada de orégano y servimos inmediatamente.','https://imag.bonviveur.com/cocinamos-las-berenjenas-rellenas-en-el-microondas.webp'),(7,1,'Pelamos y cortamos 80 g de cebolla, prensamos 1 diente de ajo, pelamos y cortamos a bastoncitos 100 g de patata y picamos muy pequeña 80 g de zanahoria. También podemos rallarla.','https://imag.bonviveur.com/cortamos-las-verduras-para-el-bacalao-espiritual.webp'),(7,2,'Calentamos aceite de oliva en una sartén, en cantidad suficiente para freír las patatas, y freímos las patatas durante 2 minutos o hasta que se doren. Salamos ligeramente, las retiramos y las dejamos escurrir en un plato sobre papel de cocina. Reservamos.','https://imag.bonviveur.com/freimos-las-patatas-en-bastoncitos.webp'),(7,3,'Precalentamos el horno a 180 ºC. Calentamos 1 cucharada de aceite de oliva en una sartén y sofreímos la cebolla con el ajo y 1 hoja de laurel durante 5 minutos a fuego bajo.','https://imag.bonviveur.com/sofreimos-la-cebolla-con-el-ajo-y-el-laurel.webp'),(7,4,'Agregamos a la sartén 200 g de bacalao desalado desmenuzado y las zanahorias. Cocinamos durante 10 minutos a fuego bajo, removiendo, hasta que las zanahorias estén tiernas.','https://imag.bonviveur.com/cocinamos-el-bacalao-y-las-zanahorias.webp'),(7,5,'Mientras tanto, preparamos la salsa bechamel. Para ello calentamos en un cazo 25 g de mantequilla y tostamos 25 g de harina de trigo en ella, removiendo. Vertemos poco a poco 300 ml de leche mientras removemos y cocinamos, removiendo de vez en cuanto, a fuego bajo unos 10 minutos, no debe quedar muy espesa. Salpimentamos y condimentamos con nuez moscada rallada al gusto. Reservamos.','https://imag.bonviveur.com/preparamos-la-salsa-bechamel.webp'),(7,6,'Añadimos a la sartén del bacalao las patatas y 1 cucharada de perejil picado, retiramos el laurel, salpimentamos, removemos y disponemos la mezcla en una bandeja apta para horno.','https://imag.bonviveur.com/disponemos-la-mezcla-de-bacalao-en-una-bandeja-de-horno.webp'),(7,7,'Cubrimos con la bechamel reservada y repartimos 60 g de queso parmesano rallado por encima.','https://imag.bonviveur.com/cubrimos-con-la-bechamel-y-el-queso.webp'),(7,8,'Horneamos el bacalao espiritual durante 10 minutos a 180 ºC, hasta que esté dorado. Podemos utilizar el gratinador los últimos minutos.','https://imag.bonviveur.com/horneamos-el-bacalao-espiritual.webp'),(7,9,'Pasado este tiempo, retiramos la bandeja del horno y servimos este delicioso plato portugués.','https://imag.bonviveur.com/bacalao-espiritual-listo-para-comer.webp'),(8,1,'En primer lugar, hervimos 130 g de arroz de grano largo siguiendo las instrucciones del fabricante. Escurrimos y reservamos hasta enfriar.','https://imag.bonviveur.com/dejamos-enfriar-el-arroz-hervido.webp'),(8,2,'Pelamos y cortamos 50 g de cebolla en rodajas finas, pelamos y cortamos 80 g de zanahorias en bastoncitos, eliminamos las semillas de 1 pimiento y los cortamos en dados. Cortamos 100 g de champiñones a láminas.','https://imag.bonviveur.com/cortamos-las-verduras-para-el-wok-de-arroz.webp'),(8,3,'Calentamos 2 cucharadas de aceite de oliva en una sartén y doramos 150 g de contramuslos de pollo cortados a dados y salpimentados durante 3 minutos a fuego alto. Reservamos.','https://imag.bonviveur.com/doramos-el-pollo-cortado-a-dados.webp'),(8,4,'Agregamos la cebolla y la salteamos durante 2 minutos, moviendo la sartén wok hasta que esté dorada.','https://imag.bonviveur.com/sofreimos-la-cebolla-para-el-wok-de-arroz-y-verduras.webp'),(8,5,'Añadimos las zanahorias, el pimiento y los champiñones. Salteamos estos ingredientes durante 4 minutos.','https://imag.bonviveur.com/salteamos-las-verduras-en-el-wok.webp'),(8,6,'Devolvemos el pollo a la sartén junto al arroz reservado, vertemos 40 ml de salsa de soja, removemos para que se mezcle bien y cocinamos 3-4 minutos.','https://imag.bonviveur.com/cocinamos-las-verduras-con-el-pollo-y-el-arroz.webp'),(8,7,'Servimos este delicioso wok de arroz con verduras y pollo recién hecho, decorado opcionalmente con 1 cucharada de cebollino picado.','https://imag.bonviveur.com/wok-de-arroz-y-verduras-listo-para-comer.webp');
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

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Alex','alex05brx@gmail.com','paco12','2025-05-12 11:50:35'),(2,'Usuario Ejemplo','usuario@ejemplo.com','$2a$10$eTt.eMrtDfttbxPY2vffPu8aS3loATaU.E6U/D6C/JpoZvAJkqJWa',NULL),(4,'Alex López','alopezo1810@gmail.com','$2a$10$7mL5jRdUH7h3gGPlnBJ/iOKcT2GugHl0SycwH90FdBinfDd5/SYBS','2025-05-13 13:29:58'),(9,'Alex','aloe@gmail.com','$2a$10$C28q3gRDdssXTBbYV.RdKuvEMz1Myl9KlnAbyZRYXFWBGrcwkHAAm','2025-05-20 10:39:32');
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

-- Dump completed on 2025-05-21  7:40:03

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
INSERT INTO `ingredients` VALUES (1,'Naranjas','Si'),(2,'Aceite de oliva','No'),(3,'Cebolla','No'),(4,'Ajo','No'),(5,'Contramuslos de pollo','Si'),(6,'Sal','No'),(7,'Pimienta negra molida','No'),(8,'Orégano seco','No'),(9,'Vino blanco','Si'),(10,'Mantequilla','No'),(11,'Melocotones','Si'),(12,'Azúcar','No'),(13,'Frambuesas','Si'),(14,'Zumo de limón','No'),(15,'Almendras','No'),(16,'Nata para montar','No'),(17,'Azúcar glas','No'),(18,'Esencia de vainilla','No'),(19,'Helado de vainilla','Si'),(20,'Carne picada de ternera y de cerdo','Si'),(21,'Huevo','No'),(22,'Perejil','No'),(23,'Pan rallado','No'),(24,'Zanahoria','No'),(25,'Harina de trigo','No'),(26,'Caldo de pollo','No'),(27,'Maicena','No'),(28,'Vainilla en pasta','No'),(29,'Leche entera','No'),(30,'Bizcocho de soletilla','Si'),(31,'Fresas','Si'),(32,'Vino dulce','No');
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
INSERT INTO `recipe_ingredients` VALUES (1,1,'400 g'),(1,2,'2 cucharadas'),(1,3,'100 g'),(1,4,'2 dientes'),(1,5,'4 unidades (700 g)'),(1,6,'al gusto'),(1,7,'al gusto'),(1,8,'1 cucharada'),(1,9,'60 ml'),(1,10,'1 cucharada'),(2,11,'2'),(2,12,'4 cucharadas y media'),(2,13,'200 g'),(2,14,'1 chorrito'),(2,15,'1 puñadito'),(2,16,'100 ml'),(2,17,'1/2 cucharada'),(2,18,'Unas gotas'),(2,19,'2 bolas'),(3,2,'2 cucharadas'),(3,3,'150 g y media'),(3,4,'3 dientes'),(3,6,'al gusto'),(3,7,'al gusto'),(3,20,'500 g'),(3,21,'1 unidad'),(3,23,'50 g'),(3,24,'100 g'),(3,25,'20 g'),(3,26,'200 ml'),(4,12,'40 g'),(4,13,'150 g'),(4,16,'200 ml'),(4,17,'30 g'),(4,21,'2 unidades'),(4,27,'20 g'),(4,28,'1 cucharadita'),(4,29,'400 ml'),(4,30,'12 unidades'),(4,31,'200 g'),(4,32,'100 ml');
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
INSERT INTO `recipe_steps` VALUES (1,1,'Lavamos 400 g de naranjas y exprimimos su zumo: necesitaremos 350 ml así que si no obtenemos suficiente, exprimiremos más naranjas. Reservamos.','https://imag.bonviveur.com/exprimimos-las-naranjas-para-preparar-la-salsa.webp'),(1,2,'Calentamos 2 cucharadas de aceite de oliva en una sartén y sofreímos 100 g de cebolla pelada y picada durante 5 minutos a fuego bajo. Agregamos 2 dientes de ajo prensados y cocinamos 1 minuto más.','https://imag.bonviveur.com/sofreimos-la-cebolla-y-los-ajos-para-la-base-de-la-salsa-de-naranja.webp'),(1,3,'Retiramos la cebolla a un lado de la sartén y doramos 4 contramuslos de pollo salpimentado durante 10 minutos a fuego medio-alto.','https://imag.bonviveur.com/doramos-los-contramuslos-de-pollo-en-la-sarten.webp'),(1,4,'Condimentamos el pollo con 1 cucharada de orégano seco, vertemos 60 ml de vino blanco o jerez y lo dejamos reducir durante 3 minutos a fuego alto.','https://imag.bonviveur.com/dejamos-reducir-el-jerez-con-el-pollo-y-el-oregano.webp'),(1,5,'Vertemos el zumo de naranja y 1 cucharada de mantequilla y cocinamos el conjunto destapado durante 40 minutos, girándolo a mitad de cocción, hasta que el pollo esté completamente cocinado.','https://imag.bonviveur.com/cocinamos-el-pollo-con-el-zumo-de-naranja.webp'),(1,6,'Servimos el pollo a la naranja recién hecho tal cual, o acompañado de una guarnición al gusto, por ejemplo, arroz blanco.','https://imag.bonviveur.com/pollo-a-la-naranja-de-la-abuela-listo-para-comer.webp'),(2,1,'Vamos a empezar las explicaciones por la preparación de los melocotones frescos. Si los usas en almíbar, puedes saltarte los siguientes pasos. En un cazo, ponemos una buena cantidad de agua y llevamos a ebullición. Preparamos al lado un bol de agua con mucho hielo. Cuando el agua hierva, cogemos 2 melocotones que no estén demasiado maduros y los escaldamos, esto es, los sumergimos en el agua hirviendo por tan solo 20 segundos, no más. Acto seguido, los sacamos rápidamente y los pasamos un bol lleno de agua con hielo para cortar la cocción.','https://imag.bonviveur.com/escaldar-los-melocotones-para-hacer-el-melocoton-melba.webp'),(2,2,'Luego, procedemos a partirlos en dos alrededor del hueso, retiramos este último y pelamos los melocotones. En realidad, el paso anterior únicamente sirve para poder quitarles la piel y que se queden lisos y bonitos. Si prefieres, los puedes pelar a mano, aunque el resultado será un poco más «rústico», aunque igual de válido.','https://imag.bonviveur.com/pelar-los-melocotones-para-hacer-el-melocoton-melba.webp'),(2,3,'A continuación, ponemos de nuevo agua a hervir y la endulzamos con 4 cucharadas de azúcar. Cuando hierva, metemos los melocotones y los dejamos cocer durante unos 5 minutos, lo que les aportará una textura tierna y un toque extra de dulzor. Si usas melocotones en almíbar, empezarías la receta a partir del siguiente paso.','https://imag.bonviveur.com/cocer-los-melocotones-para-hacer-el-melocoton-melba.webp'),(2,4,'En otro cazo, combinamos 200 g de frambuesas (reservando 4 para la decoración final) con 1 chorrito de zumo de limón y media cucharada de azúcar. Cocemos la mezcla hasta que espese y las frambuesas se deshagan, para crear un sirope.','https://imag.bonviveur.com/sirope-de-frambuesa-para-hacer-el-melocoton-melba.webp'),(2,5,'Una vez que hemos obtenido la consistencia deseada para nuestro sirope de frambuesa, lo pasamos por un colador. Este paso garantiza que nuestro sirope tenga una textura suave, libre de semillas, lo que resulta mucho más agradable.','https://imag.bonviveur.com/colar-el-sirope-de-frambuesa-del-melocoton-melba.webp'),(2,6,'Ahora, es el turno de las almendras laminadas. Tenemos que tostar 1 puñadito, aunque si vas a hacer este postre más veces puedes preparar una buena cantidad de antemano y conservarlas. Para ello, las podemos dorar en una sartén sin aceite a fuego medio y removiendo para que no se quemen. También vale en el horno o en la freidora de aire a 160 ºC hasta que adquieran un tono dorado y desprendan su aroma. Si usamos crocanti, este paso no es necesario.','https://imag.bonviveur.com/tostar-las-almendras-para-el-melocoton-melba.webp'),(2,7,'La última preparación que nos queda es la nata montada. Ponemos 100 ml de nata para montar en un bol y la batimos con unas varillas manuales o eléctricas. Para ayudar a que se monte más rápido, la nata tiene que estar lo más fría posible. Cuando esté casi montada, añadimos ½ cucharada de azúcar glas y unas gotas de esencia de vainilla y terminamos de montar.','https://imag.bonviveur.com/montar-la-nata-para-el-melocoton-melba.webp'),(2,8,'Con todo listo, pasamos al montaje del postre. Lo cierto es que puedes presentarlo como más te guste y en el orden que prefieras. Las dos maneras de hacerlo más comunes son en una copa de helado o en un plato, que es la que más nos gusta porque queda más vistoso. En el plato o copa elegidos para servir, ponemos en el fondo una cucharada de nuestro sirope de frambuesa. Sobre este, colocamos el melocotón previamente cortado en cuartos, presentando las piezas de forma que queden vistosas.','https://imag.bonviveur.com/montaje-del-melocoton-melba.webp'),(2,9,'Sobre el melocotón, añadimos con cuidado una bola de helado de vainilla, seguida de nuestra nata montada que podemos meter en la manga pastelera y hacer montoncitos con ella entre los melocotones.','https://imag.bonviveur.com/anadir-el-helado-y-la-nata-al-melocoton-melba.webp'),(2,10,'Concluimos nuestro postre con un poco más de sirope por encima, espolvoreando unas poquitas almendras tostadas y decorándolo con las frambuesas que habíamos reservado previamente. Si se desea, un toque de verde con una hoja de menta ayuda a que quede aún más llamativo y apetecible. ¡Y listo! Servimos enseguida.','https://imag.bonviveur.com/decorar-el-melocoton-melba.webp'),(3,1,'Pelamos y picamos media cebolla. Calentamos 1 cucharada de aceite de oliva en una sartén y la rehogamos, a fuego bajo, durante 5 minutos, hasta que esté transparente.','https://imag.bonviveur.com/sofreimos-la-cebolla-para-preparar-las-albondigas.webp'),(3,2,'Disponemos en un cuenco amplio 500 g de carne picada de ternera y de cerdo, la cebolla rehogada, 1 huevo, 1 diente de ajo prensado, 1 cucharada de perejil picado, 50 g de pan rallado y salpimentamos.','https://imag.bonviveur.com/mezclamos-los-ingredientes-de-las-albondigas-de-la-abuela.webp'),(3,3,'Mezclamos bien y formamos 18 albóndigas del tamaño de una bola de ping-pong.','https://imag.bonviveur.com/formamos-las-albondigas-de-la-abuela.webp'),(3,4,'Calentamos 1 cucharada de aceite de oliva en la misma sartén y doramos las albóndigas durante 10 minutos. Reservamos en un plato.','https://imag.bonviveur.com/doramos-las-albondigas-de-la-abuela.webp'),(3,5,'Una vez hemos dorado las albóndigas, preparamos la salsa: para ello, pelamos 150 g de cebolla y la picamos. Pelamos 100 g de zanahoria y la cortamos a rodajas. Prensamos 2 dientes de ajo.','https://imag.bonviveur.com/cortamos-las-verduras-para-la-salsa-de-las-albondigas.webp'),(3,6,'En la misma sartén en la que hemos dorado las albóndigas, sofreímos la cebolla durante 5 minutos hasta que esté ligeramente dorada, agregamos el ajo y la zanahoria y cocinamos 10 minutos a fuego bajo.','https://imag.bonviveur.com/sofreimos-las-verduras-para-preparar-la-salsa-de-la-abuela.webp'),(3,7,'Agregamos 20 g de harina de trigo y la tostamos 2 minutos, removiendo. Vertemos 125 ml de vino blanco o jerez y dejamos reducir a fuego fuerte durante 5 minutos.','https://imag.bonviveur.com/reducimos-el-vino-con-las-verduras.webp'),(3,8,'Trituramos las verduras con 200 ml de caldo de pollo hasta obtener una salsa fina, incorporamos las albóndigas reservadas y cocinamos el conjunto durante 10 minutos, removiendo. Probamos y salpimentamos al gusto.','https://imag.bonviveur.com/cocinamos-la-salsa-con-las-albondigas-de-la-abuela.webp'),(3,9,'Servimos estas deliciosas albóndigas en salsa de la abuela recién hechas con una guarnición al gusto.','https://imag.bonviveur.com/albondigas-en-salsa-de-la-abuela-listas-para-comer.webp'),(4,1,'Comenzamos preparando las natillas. Para ello mezclamos en un cazo 2 huevos L con 40 gramos de azúcar blanco, 20 gramos de maicena, 1 cucharadita de vainilla en pasta y 400 ml de leche entera.','https://imag.bonviveur.com/mezclamos-los-ingredientes-de-las-natillas-del-trifle.webp'),(4,2,'Llevamos esta mezcla a fuego medio sin dejar de remover con unas varillas hasta que espese. La ponemos en un bol, la cubrimos con film transparente y la dejamos enfriar por completo a temperatura ambiente.','https://imag.bonviveur.com/espesamos-las-natillas-del-trifle.webp'),(4,3,'Cuando las natillas hayan enfriado, cortamos en trozos de aproximadamente 1 cm 12 bizcochos de soletilla y reservamos.','https://imag.bonviveur.com/cortamos-los-bizcochos-del-trifle.webp'),(4,4,'Por otra parte, lavamos y cortamos 200 g de fresas y reservamos. Lavamos también 150 gramos de frambuesas.','https://imag.bonviveur.com/cortamos-las-fresas-del-trifle.webp'),(4,5,'Preparamos 6 vasitos o cuencos y en la base, colocamos unos cuantos trocitos de los bizcochos de soletilla. Mojamos con la mitad de 100 ml de vino dulce.','https://imag.bonviveur.com/ponemos-los-bizcochos-del-trifle.webp'),(4,6,'Sobre los bizcochos ponemos unas fresas troceadas y frambuesas.','https://imag.bonviveur.com/ponemos-la-fruta-del-trifle.webp'),(4,7,'Ponemos sobre las fresas una porción de natillas.','https://imag.bonviveur.com/ponemos-las-natillas-del-trifle.webp'),(4,8,'Colocamos otra capa de bizcochos y remojamos con el resto del vino dulce.','https://imag.bonviveur.com/ponemos-la-segunda-capa-de-bizcocho-del-trifle.webp'),(4,9,'Vertemos otra capa de fresas y frambuesas y sobre ellas, otra porción de natillas. Llevamos a la nevera durante al menos 2 horas para que se integren bien todos los sabores.','https://imag.bonviveur.com/ponemos-la-segunda-capa-de-fresas-del-trifle.webp'),(4,10,'Antes de servir montamos 200 ml de nata para montar fría con 30 gramos de azúcar glas hasta que esté bien firme.','https://imag.bonviveur.com/montamos-la-nata-del-trifle.webp'),(4,11,'Decoramos el trifle con la nata y opcionalmente con unas fresas y frambuesas.','https://imag.bonviveur.com/decoramos-el-trifle.webp'),(4,12,'Servimos este exquisito postre bien frío.','https://imag.bonviveur.com/textura-del-trifle.webp');
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

-- Dump completed on 2025-05-08 15:55:29

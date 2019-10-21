/*
SQLyog Professional v12.09 (64 bit)
MySQL - 5.5.20-log : Database - eastshop
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`eastshop` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `eastshop`;

/*Table structure for table `commods` */

DROP TABLE IF EXISTS `commods`;

CREATE TABLE `commods` (
  `c_id` varchar(50) NOT NULL,
  `c_name` varchar(50) NOT NULL,
  `c_money` varchar(50) NOT NULL,
  `c_gift` varchar(50) DEFAULT NULL,
  `c_imgs` varchar(200) NOT NULL,
  `c_status` int(1) DEFAULT '1',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `commods` */

insert  into `commods`(`c_id`,`c_name`,`c_money`,`c_gift`,`c_imgs`,`c_status`) values ('1529-9920','美国进口 E-JOY超浓缩洗衣片','￥298','E-JOY超浓缩洗衣片（4倍纳米浓缩 ...','[\"./images/xyp1.jpg\",\"./images/xyp2.jpg\"]',1),('1531-8813','爱华尚(HWSA) “富贵吉祥”琥珀（蜜蜡）套组','￥3,980','爱华尚(HWSA)“绿野仙踪”琥珀（ ...','[\"./images/h1.jpg\", \"./images/h2.jpg\", \"./images/h3.jpg\", \"./images/h4.jpg\", \"./images/h5.jpg\"]',1),('1532-2807','[2019金秋收获季]好当家 有机即食海参臻享升级组','￥2,698','好当家有机即食海参 1.65kg（30只 ...','[\"./images/hs1.jpg\"]',1),('1532-3207','[2019金秋收获季]仙芝楼 破壁灵芝孢子粉（7盒礼盒装）','￥999','仙芝楼 破壁灵芝孢子粉1g/袋 x15 ...','[\"./images/lz1.jpg\",\"./images/lz2.jpg\"]',1),('1532-4988','[重阳大直播]德国品牌贝朗(BRAVAT) 不锈钢淋浴房(2.5㎡订金货号)','￥2,248','安住(ENZO RODI) 喷枪套装（ERD9 ...','[\"./images/c1.jpg\", \"./images/c2.jpg\", \"./images/c3.jpg\", \"./images/c4.jpg\", \"./images/c5.jpg\", \"./images/c6.jpg\", \"./images/c7.jpg\", \"./images/c8.jpg\"]',1),('1532-6148','[10/16祺玉良源积分加赠][今日特卖]祺玉良源 “富贵满园”和田玉手镯','￥9,800','祺玉良源和田玉手链*1 规格：珠 ...','[\"./images/sz1.jpg\",\"./images/sz2.jpg\"]',1);

/*Table structure for table `shopcarts` */

DROP TABLE IF EXISTS `shopcarts`;

CREATE TABLE `shopcarts` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `c_id` varchar(11) NOT NULL,
  `s_name` varchar(50) NOT NULL,
  `s_img` varchar(100) NOT NULL,
  `s_num` int(10) NOT NULL,
  `s_money` varchar(10) NOT NULL,
  `s_status` int(1) DEFAULT '1',
  PRIMARY KEY (`s_id`),
  KEY `u_id` (`u_id`),
  KEY `c_id` (`c_id`),
  CONSTRAINT `shopcarts_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`),
  CONSTRAINT `shopcarts_ibfk_2` FOREIGN KEY (`c_id`) REFERENCES `commods` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `shopcarts` */

insert  into `shopcarts`(`s_id`,`u_id`,`c_id`,`s_name`,`s_img`,`s_num`,`s_money`,`s_status`) values (3,7,'1529-9920','美国进口 E-JOY超浓缩洗衣片','./images/xyp1.jpg',2,'298',0),(4,7,'1531-8813','爱华尚(HWSA) “富贵吉祥”琥珀（蜜蜡）套组','./images/h1.jpg',3,'3,980',0),(5,7,'1532-2807','[2019金秋收获季]好当家 有机即食海参臻享升级组','./images/hs1.jpg',1,'2,698',0),(6,7,'1532-3207','[2019金秋收获季]仙芝楼 破壁灵芝孢子粉（7盒礼盒装）','./images/lz1.jpg',4,'999',0),(7,7,'1531-8813','爱华尚(HWSA) “富贵吉祥”琥珀（蜜蜡）套组','./images/h1.jpg',1,'3,980',0),(8,7,'1529-9920','美国进口 E-JOY超浓缩洗衣片','./images/xyp1.jpg',3,'298',0),(9,7,'1529-9920','美国进口 E-JOY超浓缩洗衣片','./images/xyp1.jpg',4,'298',1),(10,1,'1531-8813','爱华尚(HWSA) “富贵吉祥”琥珀（蜜蜡）套组','./images/h1.jpg',1,'3,980',1),(11,7,'1532-4988','[重阳大直播]德国品牌贝朗(BRAVAT) 不锈钢淋浴房(2.5㎡订金货号)','./images/c1.jpg',1,'2,248',1),(12,8,'1529-9920','美国进口 E-JOY超浓缩洗衣片','./images/xyp1.jpg',2,'298',0),(13,8,'1531-8813','爱华尚(HWSA) “富贵吉祥”琥珀（蜜蜡）套组','./images/h1.jpg',2,'3,980',1),(14,8,'1532-6148','[10/16祺玉良源积分加赠][今日特卖]祺玉良源 “富贵满园”和田玉手镯','./images/sz1.jpg',1,'9,800',1),(15,10,'1532-2807','[2019金秋收获季]好当家 有机即食海参臻享升级组','./images/hs1.jpg',5,'2,698',0),(16,10,'1532-2807','[2019金秋收获季]好当家 有机即食海参臻享升级组','./images/hs1.jpg',1,'2,698',0),(17,10,'1532-2807','[2019金秋收获季]好当家 有机即食海参臻享升级组','./images/hs1.jpg',5,'2,698',0),(18,10,'1532-2807','[2019金秋收获季]好当家 有机即食海参臻享升级组','./images/hs1.jpg',4,'2,698',0),(19,10,'1531-8813','爱华尚(HWSA) “富贵吉祥”琥珀（蜜蜡）套组','./images/h1.jpg',5,'3,980',1),(20,10,'1529-9920','美国进口 E-JOY超浓缩洗衣片','./images/xyp1.jpg',1,'298',0);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(50) DEFAULT NULL,
  `u_tel` varchar(50) NOT NULL,
  `u_pwd` varchar(50) NOT NULL,
  `u_status` int(1) DEFAULT '1',
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_tel` (`u_tel`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`u_id`,`u_name`,`u_tel`,`u_pwd`,`u_status`) values (1,NULL,'15512345678','533a081679297b4b9dd5d3f6421ec2ae',1),(6,NULL,'15412345678','533a081679297b4b9dd5d3f6421ec2ae',1),(7,'沈二狗','13812345678','533a081679297b4b9dd5d3f6421ec2ae',1),(8,NULL,'13612345678','533a081679297b4b9dd5d3f6421ec2ae',1),(9,'沈二狗','15574220822','533a081679297b4b9dd5d3f6421ec2ae',1),(10,'俊俊','13312345678','533a081679297b4b9dd5d3f6421ec2ae',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

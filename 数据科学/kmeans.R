
x1 <- matrix(rnorm(500, 1, 0.5), 100, 5)
x2 <- matrix(rnorm(500, 2, 0.5), 100, 5)
x <- rbind(x1, x2)
clusters <- kmeans(x, 2)
clusters
plot(x, col=clusters$cluster, pch=as.character(clusters$cluster), cex=0.5)
points(clusters$centers, col='green', pch='o', cex = 2)

=============================================

setwd('C:/Users/xwj/Desktop')

#从交易表中取出 价格>0 and status>2; (3,试驾完成后并支付定金 4,试驾完成后并全额支付 5,交易完成)
data <- read.csv('ttt.csv', head=F, fileEncoding='UTF-8')
data <- data[!duplicated(data$V1), ] 
#去掉成交价大于一百万的数据
data <- data[data$V2<1000000, ] 
data <- data[data$V2>1000, ] 
#成交车源总数
nrow(data)
#按品牌成交排序
brand <- as.data.frame(table(data$V4))
head(brand[order(-brand$Freq), ], 10)
#按车系成交排序
series <- as.data.frame(table(data$V6))
head(series[order(-series$Freq), ], 10)
#按车龄成交排序
year <- as.data.frame(table(data$V7))
head(year[order(-year$Freq), ], 10)
#按价格成交排序
price <- as.data.frame(table(data$V2))
price <- price[order(-price$Freq), ]
head(price, 10)

summary(data$V2)
clusters <- kmeans(data$V2, 8, nstart=20)

label <- data.frame()
ddd <- cbind(data, cluster=clusters$cluster)
for(i in 1:8) {
	min <- min(ddd[ddd$cluster==i,]['V2'])
	max <- max(ddd[ddd$cluster==i,]['V2'])
	cluster <- paste(min,'-',max,sep='')
	label <- rbind(label, data.frame(cluster, min, max))
}

dd <- data.frame(label, mean=clusters$centers, size=clusters$size)
dd <- dd[order(dd$mean), ]
dd <- cbind(label=1:8, dd)

write.table(dd, file='D:/dd.txt', quote=F, sep=",", row.names=F, col.names=T)
read.table('D:/dd.txt', sep=',', head=T)

library(ggplot2)
dd <- read.table('D:/dd.txt', sep=',', head=T)
dd$cluster <- paste(dd$label, ':', dd$cluster, sep="")
ggplot(data=dd, aes(x=label, y=size, fill=cluster)) + 
geom_bar(stat="identity") + 
geom_text(aes(label=size,vjust=-0.2), color="#666666") 
ggsave(file='D:/dd.jpg')

dd <- read.table('D:/dd.txt', sep=',', head=T)
dd$cluster <- paste(dd$label, ':', dd$cluster, sep="")
ggplot(data=dd, aes(x=factor(1), y=size, fill=cluster)) + 
geom_bar(stat="identity") + 
#geom_text(aes(label=size), color="#666666") + 
coord_polar(theta="y")
ggsave(file='D:/dd1.jpg')
===================================================================

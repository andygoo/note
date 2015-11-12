library(arules)
#从rattle包中读入数据
#数据结构如下，ID表示购物篮编号，Item表示物品。
dvdtrans <- read.csv(textConnection("
ID,Item
1,a
1,b
2,a
2,c
3,b
3,c
"), head=T);
dvdtrans

#将数据转化为合适的格式
data <- as(split(dvdtrans$Item, dvdtrans$ID),"transactions")

#用 apriori命令生成频繁项集，设其支持度为0.5，置信度为0.8
rules <- apriori(data, parameter=list(support=0.5,confidence=0.8))

#用inspect命令提取规则
inspect(rules)



  lhs              rhs         support confidence     lift
1 {Patriot}     => {Gladiator}     0.6  1.0000000 1.428571
2 {Gladiator}   => {Patriot}       0.6  0.8571429 1.428571
3 {Sixth Sense} => {Gladiator}     0.5  0.8333333 1.190476

#这说明购买爱国者电影的顾客同时也会购买角斗士 :-)
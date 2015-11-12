library(arules)
# 构造数据集
dataSet <- matrix(0, 5, 3)
rownames(dataSet) <- paste("item", 1:5, sep='')
colnames(dataSet) <- c("A", "B", "C")
dataSet[1,] <- c(1, 1, 0)
dataSet[2,] <- c(1, 0, 1)
dataSet[3,] <- c(1, 0, 1)
dataSet[4,] <- c(1, 1, 1)
dataSet[5,] <- c(0, 1, 1)
dataSet
# 转换数据格式(可以?apriori查看数据格式)
#dataSet_class <- as(dataSet,"transactions")
# 构造频繁项集
rules<-apriori(dataSet_class,parameter=list(supp=0.5,conf=0.6,target="rules"))
# 查看结果
summary(rules)
# 构造关联规则
inspect(rules)

============================================================
#辗转相除法
greComDiv1 <- function(x, y) {
	if (!is.numeric(x)| !is.numeric(y)| x < 0 | y < 0 | round(x) != x | round(y) != y) {
			stop("the number you enter should be a positive integer!")
		}
	
	return(ifelse(!y, x, Recall(y, x %% y)))
}
greComDiv1(4, 10)

========================================================
getwd()
setwd('C:/Users/xwj/Desktop')
rm(list=ls())
ptm <- proc.time()
proc.time() - ptm

sessionInfo()

Sys.getlocale()
#Sys.setlocale("LC_ALL", 'en_US.UTF-8')
#Sys.setlocale("LC_ALL", 'C')
Sys.setlocale(category="LC_ALL", locale="chinese")
 
# 当前的目录
getwd()
# 查看当前目录的子目录
list.dirs()
#查看当前目录的子目录和文件
dir()

#创建目录
file.exists('a/b/c')
dir.create('a/b/c', recursive=T)
file.create('a/b/c/f.txt', recursive=T)

#===========================================================

#读取文件夹所有文件
all.files <- list.files(path="rdata",full.names=T,pattern=".txt")
lapply(all.files,function(i) read.csv(i, head=F))
#读文件
data <- read.table('data.csv', sep=",", quote="", comment="") #fileEncoding='UTF-8' #row.names=1
#写文件
write.table(data, file='dd.txt', quote=F, sep="\t", row.names=F, col.names=F)

#入库
library(RMySQL)
conn <- dbConnect(dbDriver("MySQL"), dbname="test", username="root", password="root")
dbSendQuery(conn, "SET NAMES utf8")
dbReadTable(conn, 'city')
dbGetQuery(conn, "select title from article limit 10")

table <- 'vehicle_source'
#colnames(data) <- c('id', 'city_id', 'seller_price', 'market_price_lower', 'market_price_higher');
dbWriteTable(conn, table, data, overwrite=T, row.names=F)
dbWriteTable(conn, table, data, append=T, row.names=F)

fields <- list(
	id='int(11)', 
	city_id='int(11) DEFAULT NULL', 
	seller_price='double DEFAULT NULL', 
	market_price_lower='double DEFAULT NULL', 
	market_price_higher='double DEFAULT NULL'
)
dbWriteTable(conn, table, data, overwrite=T, row.names=F, field.types=fields)

#列求和
apply(data, 2, sum, na.rm=T)
#分组求和
s1 <- tapply(data$V3, data$V2, sum)
s2 <- aggregate(x=data$V3, by=list(data$V2), sum)
#频次
table(data$V2)

#排序
sort(data$V2, dec=T)
data[order(-data$V2), ]
data[with(data, order(-V2)), ]

#去重
unique(data$V2) 
data[!duplicated(data$V2), ] 

#交集
intersect(x,y)
#并集
union(x,y)
#差集
setdiff(x,y)

#=========================================================

#select id, city_id, seller_price, che300_high_price from vehicle_source where status=3 and show_status=0 and offline=0 into outfile '/tmp/vehicle_source.csv' fields terminated by ','  lines terminated by '\n';

rate <- function(x) {


}


library(RMySQL)
conn <- dbConnect(dbDriver("MySQL"), dbname="test", username="root", password="root", host="localhost")
dbListTables(conn)
table <- 'city'
dbListFields(conn, table)
dbExistsTable(conn, table)
dbReadTable(conn, table)
dbWriteTable(conn, table, df)
dbRemoveTable(conn, table)
dbWriteTable(conn, table, df, overwrite=F, append=T, row.names=F, field.types=list(field1='varchar(500)', field2='int(11)'))
dbDisconnect(conn)
dbSendQuery(conn, "DELETE FROM 表名")
dbGetQuery(conn, "ALTER TABLE `table` ADD INDEX url_key(`url`)")
dbGetQuery(conn, "ALTER TABLE 原表名 RENAME TO 新表名")


dd <- c.numeric_version
paste0

===================================================================================================

基本函数：

seq() 等间隔函数
rep() 重复函数
attribute(), attr(), mode(), length(), class() 属性函数
factor() 因子（或水平）函数
array() 构造多维数组
matrix() 构造矩阵
t() 求矩阵转置
det() 求方阵行列式的值
eigen() 求对称矩阵的特征值和特征向量
lsfit() 求最小二乘拟合结果
cbind(), rbind() 按照列或行合并矩阵
apply() 对数组（矩阵）某一维（或若干维）进行某种计算
scan() 读取纯文本文件数据（*.data格式数据）
median() 求中位数
quantile() 求百分位数
var(), sd() 求方差和标准差
cov(), cor() 求协方差矩阵和相关矩阵
fivenum() 五数（最小值，下四分位数，中位数，上四分位数，最大值）
uniroot() 求方程的根

作图函数：

stem() 作茎叶图
boxplot() 作箱线图
pairs(), coplot() 多变量数据可视化
dotchart() 点图
image(), contour(), persp() 画出三维图的映像、等值线和表面曲线

参数估计和假设检验：

shapiro.test() 正态性W检验
ks.test() 经验分布Kolmogorov-Smirnov检验
cor.test() 相关性检验，包括Pearson、Spearman、Kendall三种检验方法
var.test() 作方差比的检验和相应的区间估计
binom.test() 二项分布检验和估计函数
chisq.test() 卡方列联表检验和拟合优度的检验
fisher.test() Fisher精确检验
mcnemar.test() McNemar检验
wilcox.test() Wilcoxon符号秩检验和Wilcoxon秩和检验

回归分析：

lm() 做线性模型
summary() 结果概括
anova() 方差分析
predict() 从各种模型拟合函数预测结果
coefficients()或coef() 提取模型系数
deviance() 计算残差平方和
formula() 提取模型公式
residuals() 计算残差
step() 做逐步回归分析
rstandard() 计算回归模型的标准化（内学生化）残差
rstudent() 计算回归模型的（外）学生化残差
glm() 拟合计算广义线性模型
poly() 计算正交多项函数
nls()和nlm() 求解非线性最小二乘问题
p.adjust() P值调整函数
pairwise.t.test() 多重比较

方差分析：

bartlett.test() Bartlett检验（方差齐性检验）
kruskal.test() Kruskal-Wallis秩和检验
friedman.test() Friedman秩和检验

多元分析：

scale() 做数据的中心化或标准化
sweep() 极差标准化变换
hclust() 系统聚类计算
princomp() 主成分分析函数
 

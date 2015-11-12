

options(scipen=200)

all.files <- list.files(path="D:/BaiduYunDownload/2000W",full.names=T,pattern=".csv")
file <- all.files[11]

rows <- read.table(file, sep=",", quote="\"", comment="", head=T, fileEncoding='UTF-8')
classes <- sapply(rows, class)
classes[c(-1,-3)] <- rep("NULL", length(classes)-2)
data <- read.table(file, sep=",", quote="\"", comment="", head=T, fileEncoding='UTF-8', colClasses=classes)

data <- read.table(file, sep=",", quote="\"", comment="", head=T, fileEncoding='UTF-8', nrows=25)
head(data)


ptm <- proc.time()
proc.time() - ptm


library(stringr)

fff <- function(line) {
	fileds = str_split(line, ",")
	if (length(fileds[[1]]) == 33) {
		return(line)
	}
}

rrr <- function(ff, fff) {
	infile <- file(ff,"r")
	outfile <- file('rrr2.txt', "w")
	line = readLines(infile, 1, encoding='UTF-8')
	while(length(line)!=0){
		ret <- fff(line)
		cat(ret, "\n", file=outfile, append=T)
		line = readLines(infile, n=1, encoding='UTF-8')
	}
	close(infile)
	close(outfile)
}


all.files <- list.files(path="D:/BaiduYunDownload/2000W",full.names=T,pattern="000.csv")
all.files
lapply(all.files,function(i) rrr(i))




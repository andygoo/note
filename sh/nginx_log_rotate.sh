#!/bin/bash
## 零点执行该脚本
## Nginx 日志文件所在的目录
LOGS_PATH=/usr/local/nginx/logs
BAK_PATH=/alidata1/online/www_data/nginx_log_bak
## 获取昨天的 yyyy-MM-dd
YESTERDAY=$(date -d "yesterday" +%Y-%m-%d)
## 移动文件
mv ${LOGS_PATH}/access.log ${BAK_PATH}/access_${YESTERDAY}.log
mv ${LOGS_PATH}/ms_access.log ${BAK_PATH}/ms_access_${YESTERDAY}.log
mv ${LOGS_PATH}/wap_access.log ${BAK_PATH}/wap_access_${YESTERDAY}.log
## 向 Nginx 主进程发送 USR1 信号。USR1 信号是重新打开日志文件
kill -USR1 $(cat /usr/local/nginx/logs/nginx.pid)

#!/usr/bin/env bash

# path='/home/admin/pre-server'
path="/Users/grove/Grove/personal/test"
set -x
cd ${path}
[ "$#" -lt 2 ] && echo "The number of parameter is less than 2" && exit 0
name=$1;
repo=$2;
ref=$3;
echo "start "
rm -rf ${name}
git clone ${repo}
if [[ $? -ne 0 ]];then
    exit 1
fi
cd ${name} && git checkout $ref &&  npm install
if [[ $? -ne 0 ]];then
    exit 1
fi
pm2 start pm2-pre.json 
if [[ $? -ne 0 ]];then
    exit 1
fi
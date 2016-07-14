#!/bin/bash
allname=`ls *$1`
for name in $allname
do 
  mv $name ${name%$1}$2
done

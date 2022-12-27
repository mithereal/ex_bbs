#!/bin/bash

#Copyright [2015] [Jason Clark]

#Licensed under the Apache License, Version 2.0 (the "License");
#you may not use this file except in compliance with the License.
#You may obtain a copy of the License at

    #http://www.apache.org/licenses/LICENSE-2.0

#Unless required by applicable law or agreed to in writing, software
#distributed under the License is distributed on an "AS IS" BASIS,
#WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#See the License for the specific language governing permissions and
#limitations under the License.

VERSION=0.8.15
MODELDIR="src/model/"
PROPLIST=""

function help()
{
    echo "Chicago Boss Schema Generator by Jason Clark <mithereal@gmail.com>"
    echo "Currently this only supports mysql"
    echo " -u Username"
    echo " -p Password"
    echo " -d Main database"
    echo " -t Table to pull schema from (optional defaults to entire database)"
}

function start()
{
	echo "start"
    if [ -z "$BASEDIR" ]
then
  BASEDIR="./"

fi

if [ ! -d "$BASEDIR$MODELDIR" ]
	then
	echo "$BASEDIR is not a Chicagoboss Project"
	exit
    fi

#if [ -z "$USERNAME" ]
	#then
	#USERNAME=($(grep -oP "^\s.*{db_host,.\".*\"}" boss.config))
    #fi

if [ -z $USERNAME ]
	then
	echo "enter your username"
	read USERNAME
    fi

#if [ -z "$PASSWORD" ]
	#then
	 #PASSWORD=($(grep -oP "^\s.*{db_password,.\".*\"}" boss.config))
    #fi

if [ -z "$PASSWORD" ]
	then
	echo "enter your password"
	read -s PASSWORD
    fi

#if [ -z "$DATABASE" ]
	#then
	 #DATABASE=($(grep -oP "^\s.*{db_database,.\".*\"}" boss.config))
    #fi

if [ -z "$DATABASE" ]
	then
	echo "enter your database"
	read DATABASE
fi

}

while getopts ":?:p:n:d:t" opt; do
    case $opt in

		-d)
		DATABASE=$OPTARG
            ;;
		-n)
		USERNAME=$OPTARG
            ;;
       -p)
        PASSWORD=$OPTARG
            ;;
       -t)
        TABLE=$OPTARG
            ;;
        ?)
            help
exit 0
            ;;
    esac
done

start


if [ ! -z "$TABLE" ]
	then
	results=( $(mysql --user="$USERNAME" --password="$PASSWORD" --database="$DATABASE" --execute="select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_SCHEMA = '$DATABASE'") )
	echo results
	#command="./model.sh -n $TABLE -p $PROPLIST"
	#bash $command

	else
	results=( $(mysql --user="$USERNAME" --password="$PASSWORD" --database="$DATABASE" --execute="select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='$TABLE' && TABLE_SCHEMA = '$DATABASE'") )

	cnt=${#results[@]}
	args=$(( cnt - 1 ))

for (( i=0 ; i<${cnt} ; i++ ))
do

    if [ "$i" != 0 ]
		then
		 PROPLIST+=${results[$i]}

		 if [ "$i" -lt $args ]
			then
			PROPLIST+=','
			fi
	fi

done

command="./model.sh -n $TABLE -p $PROPLIST"
bash $command

fi


#créer dans un dossier data les dossiers ts1 ts2 ts3 s0 s01 s02 s1 s11 s12
#ouvrir un terminal
mongod --configsvr --replSet rstest --port 2001 --dbpath /data/ts1
#ouvrir un terminal
mongod --configsvr --replSet rstest --port 2002 --dbpath /data/ts2
#ouvrir un terminal
mongod --configsvr --replSet rstest --port 2003 --dbpath /data/ts3

#ouvrir un terminal
mongo -port 2001
config={_id:"rstest", members:[{_id:0,host:"localhost:2001"},{_id:1,host:"localhost:2002"},{_id:2,host:"localhost:2003"}]};
rs.initiate(config);
rs.status();

mongo -port 2002
rs.status()

#ouvrir un terminal
mongod --configsvr --replSet rstest --port 2005 --dbpath /data/s0
#ouvrir un terminal
mongod --configsvr --replSet rstest --port 20051 --dbpath /data/s01
#ouvrir un terminal
mongod --configsvr --replSet rstest --port 20052 --dbpath /data/s02

#ouvrir un terminal
mongo -port 2005
config={_id:"sh1", members:[{_id:0,host:"localhost:2005"},{_id:1,host:"localhost:20051"},{_id:2,host:"localhost:20052"}]};
rs.initiate(config)

#ouvrir un terminal
mongo -port 2006
config={_id:"sh2", members:[{_id:0,host:"localhost:2006"},{_id:1,host:"localhost:20061"},{_id:2,host:"localhost:20062"}]};
rs.initiate(config)

#création du routeur mongos
#ouvrir un terminal 
mongos --port 2007 -configdb rstest/localhost:2001

sh.addShard("sh1/localhost:2005")
sh.addShard("sh2/localhost:2006")

sh.enableSharding("vitdb")

sh.shardCollection("vitdb.employee",{emp_id:"hashed"})

show dbs
use vitdb

for(i=1; i < 10000; i++){
db.employee.insert({emp_id: i, type:"fulltime"});
}
db.employee.getShardDistribution()

sh.status()
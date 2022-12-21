import * as SQLite from 'expo-sqlite';
import { Service } from '../models/service';

const database = SQLite.openDatabase('service.db')

export function init() {
    const promise = new Promise((resolve,reject) =>{
        database.transaction((tx)=>{
            tx.executeSql(`CREATE TABLE IF NOT EXISTS service (
            id INTEGER PRIMARY KEY NOT NULL,
            category TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            price TEXT NOT NULL,
            date TEXT NOT NULL,
            dateEnd TEXT NOT NULL,
            description TEXT NOT NULL,
            owner TEXT NOT NULL
            )`,
            [],
            ()=>{resolve()},
            (_,error)=>{reject(error)}
            
            );
        })
    })
    return promise;
}

export function insertService(service) {
    const promise =new Promise((resolve,reject) => {
        database.transaction((tx) => {
            tx.executeSql(`INSERT INTO service (category,imageUri,price,date,description,owner,dateEnd) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                service.category,service.imageUri,service.price,service.date,service.description,service.owner,service.dateEnd
            ],
            (_, result ) => {
                
                console.log(result)
                resolve(result)
            },
            (_, error) => {
                reject(error)
            }
            );
        });
    });
    return promise;
}

export function fetchServices(owner) {
    const promise = new Promise((resolve,reject) => {
        database.transaction((tx) => {
            tx.executeSql(`Select * FROM service WHERE owner = ?`,
            [owner],
            (_, result ) => {
                const services = [];
                for (const dp of result.rows._array){
                    services.push(new Service(dp.category,dp.imageUri,dp.price,dp.date,dp.description,dp.owner,dp.dateEnd))
                }
                console.log(result)
                resolve(services)
            },
            (_, error) => {
                reject(error)
            }
            );
        });
    });
    return promise;
}

export function fetchPlaceDetails(id) {
    const promise = new Promise((resolve,reject) => {
        database.transaction((tx) => {
            tx.executeSql(`Select * FROM service WHERE id = ?`,
            [id],
            (_, result ) => {
                
                console.log(result)
                resolve(result.rows._array[0])
            },
            (_, error) => {
                reject(error)
            }
            );
        });
    });
    return promise;
}
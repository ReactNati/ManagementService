import * as SQLite from 'expo-sqlite';
import { Customer } from '../models/customer';
import { Service } from '../models/service';

const database = SQLite.openDatabase('service.db')
const databaseCustomer = SQLite.openDatabase('customer.db')
const archiveOrders = SQLite.openDatabase('archiveOrders.db')


export function init() {
    const promise = new Promise((resolve,reject) =>{
        database.transaction((tx)=>{
            tx.executeSql(`CREATE TABLE IF NOT EXISTS service (
            id INTEGER PRIMARY KEY NOT NULL,
            idCustomer INTEGER NOT NULL,
            category TEXT NOT NULL,
            imageUri TEXT,
            price TEXT NOT NULL,
            date TEXT NOT NULL,
            dateEnd TEXT NOT NULL,
            description TEXT,
            owner TEXT NOT NULL,
            colorCalendar TEXT NOT NULL,
            FOREIGN KEY(idCustomer) REFERENCES customer(idCustomer)
            )`,
            [],
            ()=>{resolve()},
            (_,error)=>{reject(error)}
            
            );
        })
    })
    return promise;
}
export function initArchiveOrder() {
    const promise = new Promise((resolve,reject) =>{
        archiveOrders.transaction((tx)=>{
            tx.executeSql(`CREATE TABLE IF NOT EXISTS archiveOrders (
            id INTEGER PRIMARY KEY NOT NULL,
            idCustomer INTEGER NOT NULL,
            category TEXT NOT NULL,
            imageUri TEXT,
            price TEXT NOT NULL,
            date TEXT NOT NULL,
            dateEnd TEXT NOT NULL,
            description TEXT,
            owner TEXT NOT NULL,
            colorCalendar TEXT NOT NULL,
            FOREIGN KEY(idCustomer) REFERENCES customer(idCustomer)
            )`,
            [],
            ()=>{resolve()},
            (_,error)=>{reject(error)}
            
            );
        })
    })
    return promise;
}
export function initCustomer() {
    const promise = new Promise((resolve,reject) =>{
        databaseCustomer.transaction((tx)=>{
            tx.executeSql(`CREATE TABLE IF NOT EXISTS customer (
            idCustomer INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            lastName TEXT NOT NULL,
            adress TEXT NOT NULL,
            contact TEXT NOT NULL
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
            tx.executeSql(`INSERT INTO service (idCustomer,category,imageUri,price,date,dateEnd,description,owner,colorCalendar) VALUES (  ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              service.idCustomer,service.category,service.imageUri,service.price,service.date,service.dateEnd,service.description,service.owner,service.colorCalendar
            ],
            (_, result ) => {
                
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
export function insertArchiveOrders(service) {
    const promise =new Promise((resolve,reject) => {
        archiveOrders.transaction((tx) => {
            tx.executeSql(`INSERT INTO archiveOrders (idCustomer,category,imageUri,price,date,dateEnd,description,owner,colorCalendar) VALUES (  ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              service.idCustomer,service.category,service.imageUri,service.price,service.date,service.dateEnd,service.description,service.owner,service.colorCalendar
            ],
            (_, result ) => {
                
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
export function insertCustomer(customer) {
    const promise =new Promise((resolve,reject) => {
        databaseCustomer.transaction((tx) => {
            tx.executeSql(`INSERT INTO customer (name,lastName,adress,contact) VALUES ( ?, ?, ?, ?)`,
            [
                customer.name,customer.lastName,customer.adress,customer.contact
            ],
            (_, result ) => {
                
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
export function fetchCustomer() {
    const promise = new Promise((resolve,reject) => {
        databaseCustomer.transaction((tx) => {
            tx.executeSql(`Select * FROM customer`,
            [],
            (_, result ) => {
                const customer = [];
                
                for (const dp of result.rows._array){
                    customer.push(new Customer(dp.idCustomer,dp.name,dp.lastName,dp.adress,dp.contact))
                }
                
                resolve(customer)
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
                    
                    services.push(new Service(dp.idCustomer,dp.category,dp.imageUri,dp.price,dp.date,dp.dateEnd,dp.description,dp.owner,dp.colorCalendar,dp.id))
                }
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
export function fetchArchiveOrders(owner) {
    const promise = new Promise((resolve,reject) => {
        archiveOrders.transaction((tx) => {
            tx.executeSql(`Select * FROM archiveOrders WHERE owner = ?`,
            [owner],
            (_, result ) => {
                const services = [];
                for (const dp of result.rows._array){
                    
                    services.push(new Service(dp.idCustomer,dp.category,dp.imageUri,dp.price,dp.date,dp.dateEnd,dp.description,dp.owner,dp.colorCalendar,dp.id))
                }
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
export function fetchServiceDetails(id) {
    const promise = new Promise((resolve,reject) => {
        database.transaction((tx) => {
            tx.executeSql(`Select * FROM service WHERE id = ?`,
            [id],
            (_, result ) => {
                
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
export function fetchCustomerDetails(id) {
    const promise = new Promise((resolve,reject) => {
        databaseCustomer.transaction((tx) => {
            tx.executeSql(`Select * FROM customer WHERE id = ?`,
            [id],
            (_, result ) => {
                
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
export function updateServiceDetails(service,id) {
    const promise = new Promise((resolve,reject) => {
        database.transaction((tx) => {
            tx.executeSql(`UPDATE service SET idCustomer = ?, category = ?, imageUri = ?, price = ?, date = ?, dateEnd = ?,description = ?, owner = ? WHERE id = ?`,
            [
                service.idCustomer,service.category,service.imageUri,service.price,service.date,service.dateEnd,service.description,service.owner,id
            ],
            (_, result ) => {

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
export function deleteChoseOrder(id){
    const promise = new Promise((resolve,reject) => {
        database.transaction((tx) => {
            tx.executeSql(`DELETE FROM service WHERE id = ?`,
            [
                id
            ],
            (_, result ) => {

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
export function deleteArchiveChoseOrder(id){
    const promise = new Promise((resolve,reject) => {
        archiveOrders.transaction((tx) => {
            tx.executeSql(`DELETE FROM archiveOrders WHERE id = ?`,
            [
                id
            ],
            (_, result ) => {

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
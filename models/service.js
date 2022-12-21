export class Service{
    constructor(category,imageUri,price,date,description){
        this.id = new Date().toString() + Math.random().toString();
        this.category = category;
        this.imageUri = imageUri;
        this.price = price;
        this.date = date; 
        this.description = description; 

    }
}
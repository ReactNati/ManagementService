export class Service{
    constructor(category,imageUri,price,date,description,owner,dateEnd){
        this.id = new Date().toString() + Math.random().toString();
        this.category = category;
        this.imageUri = imageUri;
        this.price = price;
        this.date = date; 
        this.description = description; 
        this.owner = owner;
        this.dateEnd = dateEnd;

    }
}